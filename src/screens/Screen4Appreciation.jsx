import React from 'react';

export default function Screen4Appreciation({
  isActive,
  config,
  onSelectCard,
  onNextScreen
}) {
  const appreciation = config.appreciation || {};
  const cards = appreciation.cards || [];

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-4"
      style={{ backgroundImage: "url('/assets/bg_appreciation.jpg')" }}
    >
      <div className="scene-overlay library-overlay"></div>

      <div className="appreciation-screen-wrap">
        <h2 className="scene-header-gold">
          {appreciation.title || "Things I Appreciate About You"}
        </h2>
        <p className="scene-subtitle-cream">
          {appreciation.subtitle || "A few of the many reasons you're amazing ✨"}
        </p>

        {/* 6 Parchment Cards (3x2 grid) */}
        <div className="appreciation-grid-3x2" id="appreciation-cards-grid">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="appreciation-card clickable"
              onClick={(e) => onSelectCard(card, e)}
              role="button"
              tabIndex={0}
            >
              <div className="appreciation-card-icon">{card.icon}</div>
              <h3 className="appreciation-card-title">{card.title}</h3>
            </div>
          ))}
        </div>

        <p className="appreciation-footer-hint">
          {appreciation.hint || "Click on each card to see a special message 💕"}
        </p>

        <button
          type="button"
          className="magic-pill-btn"
          id="btn-to-typewriter-letter"
          style={{ marginTop: '1.5rem' }}
          onClick={onNextScreen}
        >
          {appreciation.buttonText || "Read The Letter 💌"}
        </button>
      </div>
    </section>
  );
}
