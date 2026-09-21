import React, { useState } from 'react';

export default function TopNav({
  currentLayer,
  onNavigate,
  isMuted,
  onToggleAudio,
  onOpenConfig
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getActiveNav = () => {
    if (currentLayer <= 2) return 0;
    if (currentLayer === 3 || currentLayer === 4) return 3;
    if (currentLayer === 5) return 5;
    if (currentLayer === 6) return 6;
    return 7;
  };

  const activeTarget = getActiveNav();
  const handleNavigate = (target, e) => {
    setIsMenuOpen(false);
    onNavigate(target, e);
  };

  return (
    <header className={`top-nav-bar ${isMenuOpen ? 'menu-open' : ''}`} id="top-nav-bar">
      <div className="mobile-nav-brand" aria-hidden="true">
        <span>✨</span>
        <span>Birthday</span>
      </div>

      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="main-nav-links"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span>{isMenuOpen ? '×' : '☰'}</span>
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="main-nav-links">
        <button
          type="button"
          className={`nav-link ${activeTarget === 0 ? 'active' : ''}`}
          onClick={(e) => handleNavigate(0, e)}
        >
          Home
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 3 ? 'active' : ''}`}
          onClick={(e) => handleNavigate(3, e)}
        >
          Memories
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 5 ? 'active' : ''}`}
          onClick={(e) => handleNavigate(5, e)}
        >
          Letter
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 6 ? 'active' : ''}`}
          onClick={(e) => handleNavigate(6, e)}
        >
          Wishes
        </button>
        <button
          type="button"
          className={`nav-link ${activeTarget === 7 ? 'active' : ''}`}
          onClick={(e) => handleNavigate(7, e)}
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
