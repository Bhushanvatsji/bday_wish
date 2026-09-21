import React from 'react';

export default function TopNav({
  currentLayer,
  onNavigate,
  isMuted,
  onToggleAudio,
  onOpenConfig
}) {
  const getActiveNav = () => {
    if (currentLayer <= 2) return 0;
    if (currentLayer === 3 || currentLayer === 4) return 3;
    if (currentLayer === 5) return 5;
    if (currentLayer === 6) return 6;
    return 7;
  };

  const activeTarget = getActiveNav();

  return (
    <header className="top-nav-bar" id="top-nav-bar">
      <nav className="nav-links" id="main-nav-links">
        <button
          type="button"
          className={`nav-link ${activeTarget === 0 ? 'active' : ''}`}
          onClick={(e) => onNavigate(0, e)}
        >
          Home
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 3 ? 'active' : ''}`}
          onClick={(e) => onNavigate(3, e)}
        >
          Memories
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 5 ? 'active' : ''}`}
          onClick={(e) => onNavigate(5, e)}
        >
          Letter
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 6 ? 'active' : ''}`}
          onClick={(e) => onNavigate(6, e)}
        >
          Wishes
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 7 ? 'active' : ''}`}
          onClick={(e) => onNavigate(7, e)}
        >
          Surprise
        </button>
      </nav>

      <div className="nav-actions">
        <button
          className="nav-circle-btn"
          id="btn-audio-toggle"
          title="Toggle Magical Melody"
          aria-label="Toggle Music"
          onClick={onToggleAudio}
        >
          <span id="audio-icon">{isMuted ? '🔇' : '♫'}</span>
        </button>
        <button
          className="nav-circle-btn"
          id="btn-open-config"
          title="Personalize Name & Messages"
          aria-label="Settings"
          onClick={onOpenConfig}
        >
          <span>⚙</span>
        </button>
      </div>
    </header>
  );
}
