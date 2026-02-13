// AI Justice Platform — Speech Utility
// Web Speech API: STT (SpeechRecognition) + TTS (SpeechSynthesis)

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Single utterance mode (question mode)
export function createRecognition(lang = 'nl-NL') {
  if (!SpeechRecognition) return null;
  const r = new SpeechRecognition();
  r.lang = lang;
  r.continuous = false;
  r.interimResults = false;
  return r;
}

// Continuous mode (recording mode)
export function createContinuousRecognition(lang = 'nl-NL') {
  if (!SpeechRecognition) return null;
  const r = new SpeechRecognition();
  r.lang = lang;
  r.continuous = true;
  r.interimResults = true;
  return r;
}

// Text-to-Speech
export function speak(text, lang = 'nl-NL') {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.95;
  u.pitch = 1;
  // Try to find a Dutch voice
  const voices = window.speechSynthesis.getVoices();
  const nlVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
  if (nlVoice) u.voice = nlVoice;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

// Check if speech recognition is supported
export function isSpeechSupported() {
  return !!SpeechRecognition;
}

// Generate downloadable transcript
export function downloadTranscript(text, filename = 'transcript.txt') {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
