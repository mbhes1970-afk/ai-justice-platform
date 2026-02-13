import React from 'react';
import { MODULES, CATEGORIES, getModulesByCategory } from '../data/modules';

export default function Sidebar({ mode, setMode, activeModule, setActiveModule, lang, onClose }) {
  const t = (nl, en) => lang === 'nl' ? nl : en;
  const internCategories = Object.entries(CATEGORIES.intern);
  const publicModules = Object.values(MODULES).filter(m => m.mode === 'publiek');

  return (
    <>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">⚖️</div>
          <div>
            <div className="sidebar-title">AI Justice Platform</div>
            <div className="sidebar-subtitle">NXT ERA SOLUTIONS</div>
          </div>
        </div>
      </div>

      {/* Mode Switch */}
      <div className="mode-switch">
        <button
          className={`mode-btn ${mode === 'intern' ? 'active' : ''}`}
          onClick={() => { setMode('intern'); setActiveModule(null); }}
        >
          🔒 {t('Intern', 'Internal')}
        </button>
        <button
          className={`mode-btn ${mode === 'publiek' ? 'active' : ''}`}
          onClick={() => { setMode('publiek'); setActiveModule(null); }}
        >
          🌐 {t('Publiek', 'Public')}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {mode === 'intern' ? (
          internCategories.map(([catKey, cat]) => {
            const mods = getModulesByCategory('intern', catKey);
            return (
              <div key={catKey}>
                <div className="nav-category">
                  {cat.icon} {cat[lang]}
                </div>
                {mods.map(mod => (
                  <button
                    key={mod.id}
                    className={`nav-item ${activeModule === mod.id ? 'active' : ''}`}
                    onClick={() => { setActiveModule(mod.id); if (onClose) onClose(); }}
                  >
                    <span className="nav-icon">{mod.icon}</span>
                    <span className="nav-label">{mod[lang].name}</span>
                  </button>
                ))}
              </div>
            );
          })
        ) : (
          <>
            <div className="nav-category">
              🌐 {t('Publieke modules', 'Public modules')}
            </div>
            {publicModules.map(mod => (
              <button
                key={mod.id}
                className={`nav-item ${activeModule === mod.id ? 'active' : ''}`}
                onClick={() => { setActiveModule(mod.id); if (onClose) onClose(); }}
              >
                <span className="nav-icon">{mod.icon}</span>
                <span className="nav-label">{mod[lang].name}</span>
              </button>
            ))}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">
          {t('Onderdeel van', 'Part of')}{' '}
          <a href="https://nxterasolutions.eu" target="_blank" rel="noreferrer">
            Nxt Era Solutions
          </a>
          <br />
          {t('Powered by Mistral AI', 'Powered by Mistral AI')}
        </div>
      </div>
    </>
  );
}
