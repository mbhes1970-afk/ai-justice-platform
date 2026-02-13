import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { MODULES } from './data/modules';
import './styles/theme.css';

export default function App() {
  const [mode, setMode] = useState('intern');    // 'intern' | 'publiek'
  const [activeModule, setActiveModule] = useState(null);
  const [lang, setLang] = useState('nl');         // 'nl' | 'en'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mod = activeModule ? MODULES[activeModule] : null;
  const t = (nl, en) => lang === 'nl' ? nl : en;

  return (
    <div className="app">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          mode={mode}
          setMode={setMode}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          lang={lang}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="header-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <div className="header-module">
              {mod ? (
                <>
                  <span className="header-module-icon">{mod.icon}</span>
                  {mod[lang].name}
                </>
              ) : (
                <>⚖️ AI Justice Platform</>
              )}
            </div>
          </div>
          <div className="header-right">
            <span className={`header-badge ${mode === 'intern' ? 'badge-intern' : 'badge-publiek'}`}>
              {mode === 'intern' ? t('🔒 INTERN', '🔒 INTERNAL') : t('🌐 PUBLIEK', '🌐 PUBLIC')}
            </span>
            <div className="lang-switch">
              <button
                className={`lang-btn ${lang === 'nl' ? 'active' : ''}`}
                onClick={() => setLang('nl')}
              >
                NL
              </button>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        {/* Chat */}
        <Chat moduleId={activeModule} lang={lang} mode={mode} />
      </main>
    </div>
  );
}
