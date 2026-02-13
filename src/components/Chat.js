import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MODULES, RECORDING_PROMPTS } from '../data/modules';
import { sendToMistral } from '../utils/mistral';
import { createRecognition, createContinuousRecognition, speak, stopSpeaking, isSpeechSupported } from '../utils/speech';

export default function Chat({ moduleId, lang, mode }) {
  const mod = moduleId ? MODULES[moduleId] : null;
  const t = (nl, en) => lang === 'nl' ? nl : en;

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(0);
  const messagesEndRef = useRef(null);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTextRef = useRef('');
  const recognitionRef = useRef(null);
  const shouldRestartRef = useRef(false);
  const timerRef = useRef(null);

  // Voice question state
  const [isListening, setIsListening] = useState(false);
  const listenRecRef = useRef(null);

  // Reset on module change
  useEffect(() => {
    setMessages([]);
    setInput('');
    setWorkflowStep(0);
    setIsRecording(false);
    setRecordingText('');
    setRecordingTime(0);
    recordingTextRef.current = '';
    stopRecordingCleanup();
    stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecordingCleanup();
      stopSpeaking();
    };
  }, []);

  function stopRecordingCleanup() {
    shouldRestartRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
      recognitionRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  // ---- SEND MESSAGE ----
  const handleSend = useCallback(async (text) => {
    if (!text?.trim() || !mod || isLoading) return;

    const userMsg = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-8).map(m => ({
        role: m.role === 'system' ? 'user' : m.role,
        content: m.content,
      }));
      history.push({ role: 'user', content: text.trim() });

      const reply = await sendToMistral(history, mod.systemPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t(
          '⚠️ Er is een fout opgetreden. Controleer de API-verbinding.',
          '⚠️ An error occurred. Check the API connection.'
        ),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [mod, messages, isLoading, lang]);

  // ---- QUICK ACTIONS ----
  function handleQuickAction(action) {
    if (action === 'record') {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    } else {
      handleSend(action);
    }
  }

  // ---- RECORDING MODE ----
  function startRecording() {
    const speechLang = lang === 'nl' ? 'nl-NL' : 'en-US';
    const rec = createContinuousRecognition(speechLang);
    if (!rec) {
      alert(t('Spraakherkenning niet beschikbaar', 'Speech recognition not available'));
      return;
    }

    recordingTextRef.current = '';
    setRecordingText('');
    setRecordingTime(0);
    setIsRecording(true);

    // System message
    setMessages(prev => [...prev, {
      role: 'system',
      content: t('🎙️ Opname gestart — spreek duidelijk', '🎙️ Recording started — speak clearly'),
    }]);

    // Timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    rec.onresult = (e) => {
      let final = recordingTextRef.current;
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          final += transcript + ' ';
          recordingTextRef.current = final;
        } else {
          interim += transcript;
        }
      }
      setRecordingText(final + interim);
    };

    rec.onerror = (e) => {
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        console.error('Recognition error:', e.error);
      }
    };

    rec.onend = () => {
      if (shouldRestartRef.current) {
        try { rec.start(); } catch (e) { /* ignore */ }
      }
    };

    shouldRestartRef.current = true;
    recognitionRef.current = rec;
    try { rec.start(); } catch (e) { console.error('Start error:', e); }
  }

  async function stopRecording() {
    shouldRestartRef.current = false;
    stopRecordingCleanup();
    setIsRecording(false);

    const transcript = recordingTextRef.current.trim();
    if (!transcript) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: t('⚠️ Geen spraak gedetecteerd', '⚠️ No speech detected'),
      }]);
      return;
    }

    // Get module-specific recording prompt
    const prompts = RECORDING_PROMPTS[moduleId] || RECORDING_PROMPTS._default;
    const prompt = prompts[lang] || prompts.nl;

    const fullPrompt = `${prompt}\n\n--- TRANSCRIPT ---\n${transcript}\n--- EINDE TRANSCRIPT ---`;

    setMessages(prev => [...prev, { role: 'user', content: `🎙️ [${t('Opname', 'Recording')} — ${formatTime(recordingTime)}]\n${transcript}` }]);
    setIsLoading(true);

    try {
      const reply = await sendToMistral(
        [{ role: 'user', content: fullPrompt }],
        mod?.systemPrompt || ''
      );
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t('⚠️ Fout bij verwerking van transcript.', '⚠️ Error processing transcript.'),
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  // ---- VOICE QUESTION MODE ----
  function toggleListening() {
    if (isListening) {
      if (listenRecRef.current) listenRecRef.current.abort();
      setIsListening(false);
      return;
    }

    const speechLang = lang === 'nl' ? 'nl-NL' : 'en-US';
    const rec = createRecognition(speechLang);
    if (!rec) return;

    setIsListening(true);
    listenRecRef.current = rec;

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setIsListening(false);
      // Auto-send
      setTimeout(() => handleSend(text), 200);
    };

    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    try { rec.start(); } catch (e) { setIsListening(false); }
  }

  // ---- WORKFLOW BUTTONS ----
  async function handleWorkflowStep(stepLabel) {
    const prompt = t(
      `De gebruiker klikt op werkproces-stap "${stepLabel}". Geef een passend antwoord en begeleid de volgende stap.`,
      `The user clicks workflow step "${stepLabel}". Provide an appropriate response and guide the next step.`
    );
    handleSend(prompt);
    setWorkflowStep(prev => prev + 1);
  }

  // ---- KEY HANDLER ----
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  }

  // ---- FORMAT TIME ----
  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  // ---- WORD COUNT ----
  function wordCount(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  // ---- RENDER ----
  if (!mod) {
    return <Welcome lang={lang} mode={mode} />;
  }

  const quickActions = mod.quickActions?.[lang] || [];
  const workflow = mod.workflow?.[lang] || [];

  return (
    <div className="chat-area">
      {/* Messages */}
      <div className="messages">
        {/* Welcome message */}
        <div className="msg-system">{mod[lang].welcome}</div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.role === 'user' ? 'msg-user' :
              msg.role === 'system' ? 'msg-system' : 'msg-ai'
            }`}
          >
            {msg.content.split('\n').map((line, j) => (
              <React.Fragment key={j}>
                {line}
                {j < msg.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}

            {/* Workflow buttons on AI messages */}
            {msg.role === 'assistant' && workflow.length > 0 && i === messages.length - 1 && !isLoading && (
              <div className="workflow-btns">
                {workflow.map((step, si) => (
                  <button
                    key={si}
                    className="wf-btn"
                    style={si === workflowStep ? { borderColor: 'var(--gold)', color: 'var(--gold)', background: 'var(--gold-bg)' } : {}}
                    onClick={() => handleWorkflowStep(step)}
                  >
                    {si + 1}. {step}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="message msg-ai">
            <div className="typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">
        {/* Recording bar */}
        {isRecording && (
          <>
            <div className="recording-bar">
              <div className="rec-dot"></div>
              <div className="rec-info">
                <div className="rec-label">
                  {t('Opname actief', 'Recording active')} — {formatTime(recordingTime)} — {wordCount(recordingText)} {t('woorden', 'words')}
                </div>
                <div className="rec-timer">
                  {t('Spreek duidelijk in de microfoon', 'Speak clearly into the microphone')}
                </div>
              </div>
              <button className="rec-stop" onClick={stopRecording}>
                ⏹ {t('Stop & Verwerk', 'Stop & Process')}
              </button>
            </div>
            {recordingText && (
              <div className="recording-live">
                {recordingText}<span className="rec-cursor"></span>
              </div>
            )}
          </>
        )}

        {/* Quick Actions */}
        {quickActions.length > 0 && !isRecording && (
          <div className="quick-actions">
            {quickActions.map(qa => (
              <button
                key={qa.id}
                className={`qa-btn ${qa.action === 'record' && isRecording ? 'active' : ''}`}
                onClick={() => handleQuickAction(qa.action)}
              >
                {qa.label}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        {!isRecording && (
          <div className="input-row">
            {isSpeechSupported() && (
              <button
                className={`btn-mic ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title={t('Spreek een vraag in', 'Speak a question')}
              >
                🎤
              </button>
            )}
            <textarea
              className="input-field"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={mod[lang].placeholder}
              disabled={isLoading}
            />
            <button
              className="btn-send"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              title={t('Verstuur', 'Send')}
            >
              ➤
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Welcome Screen (no module selected) ----
function Welcome({ lang, mode }) {
  const t = (nl, en) => lang === 'nl' ? nl : en;

  const cards = mode === 'intern' ? [
    { icon: '📋', nl: { t: 'Zaakbeheer', d: 'Zaak-intake & dossiertoewijzing' }, en: { t: 'Case Management', d: 'Case intake & file assignment' } },
    { icon: '⚖️', nl: { t: 'Vonnis Ondersteuning', d: 'Concept-vonnis & strafmaat' }, en: { t: 'Verdict Support', d: 'Draft verdict & sentencing' } },
    { icon: '🔍', nl: { t: 'Juridisch Onderzoek', d: 'Wetgeving & jurisprudentie' }, en: { t: 'Legal Research', d: 'Legislation & case law' } },
    { icon: '🎤', nl: { t: 'Zittingstranscriptie', d: 'Real-time spraak-naar-tekst' }, en: { t: 'Hearing Transcription', d: 'Real-time speech-to-text' } },
  ] : [
    { icon: '📋', nl: { t: 'Zaakstatus', d: 'Status opvragen' }, en: { t: 'Case Status', d: 'Check your status' } },
    { icon: '⚖️', nl: { t: 'Rechten & Procedures', d: 'Uw rechten uitgelegd' }, en: { t: 'Rights', d: 'Your rights explained' } },
    { icon: '📅', nl: { t: 'Zittingsagenda', d: 'Openbare zittingen' }, en: { t: 'Hearings', d: 'Public hearings' } },
    { icon: '🤝', nl: { t: 'Slachtofferhulp', d: 'Spreekrecht & schade' }, en: { t: 'Victim Support', d: 'Rights & compensation' } },
  ];

  return (
    <div className="welcome">
      <div className="welcome-icon">⚖️</div>
      <h1 className="welcome-title">
        {mode === 'intern'
          ? t('AI Justice — Interne Werkplaats', 'AI Justice — Internal Workspace')
          : t('AI Justice — Publiek Portaal', 'AI Justice — Public Portal')
        }
      </h1>
      <p className="welcome-text">
        {mode === 'intern'
          ? t(
              'Selecteer een werkproces in de zijbalk om te beginnen. AI Justice ondersteunt rechters, griffiers en juridisch medewerkers bij hun dagelijkse werkzaamheden.',
              'Select a workflow in the sidebar to get started. AI Justice supports judges, clerks and legal staff in their daily work.'
            )
          : t(
              'Selecteer een onderwerp in de zijbalk. AI Justice informeert u over uw rechten, zaakstatus en procedures bij de rechtbank.',
              'Select a topic in the sidebar. AI Justice provides information about your rights, case status and court procedures.'
            )
        }
      </p>
      <div className="welcome-cards">
        {cards.map((c, i) => (
          <div key={i} className="welcome-card">
            <div className="welcome-card-icon">{c.icon}</div>
            <div className="welcome-card-title">{c[lang].t}</div>
            <div className="welcome-card-desc">{c[lang].d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
