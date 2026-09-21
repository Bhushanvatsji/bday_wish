import React, { useState } from 'react';

export default function Screen2Reveal({
  isActive,
  config,
  onBeginJourney,
  onBlowCandle,
  onBlowAllCandles
}) {
  const friendName = config.friendName || 'Shweta';
  const reveal = config.reveal || {};

  const [extinguishedFlames, setExtinguishedFlames] = useState({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const allBlown = Object.values(extinguishedFlames).every(Boolean);

  const handleCandleClick = (id, e) => {
    e.stopPropagation();
    if (extinguishedFlames[id]) return;

    const nextState = { ...extinguishedFlames, [id]: true };
    setExtinguishedFlames(nextState);

    const nowAllBlown = Object.values(nextState).every(Boolean);
    if (nowAllBlown) {
      if (onBlowAllCandles) onBlowAllCandles(e);
    } else {
      if (onBlowCandle) onBlowCandle(e);
    }
  };

  const handleBlowAll = (e) => {
    setExtinguishedFlames({ 1: true, 2: true, 3: true, 4: true });
    if (onBlowAllCandles) onBlowAllCandles(e);
  };

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-2"
      style={{ backgroundImage: "url('/assets/bg_great_hall.jpg')" }}
    >
      <div className="scene-overlay great-hall-overlay"></div>

      {/* Right Crimson Pillar Banner */}
      <div className="hall-hanging-banner banner-right">
        <div className="banner-crest">⚡</div>
        <p className="banner-text">
          SAME<br/>BRIGHT<br/>SOUL,<br/>A BRIGHTER<br/>YEAR
        </p>
      </div>

      <div className="screen-content-center">
        <h1 className="reveal-birthday-title">
          HAPPY BIRTHDAY<br />
          <span className="placeholder-friend">{friendName.toUpperCase()}</span>!
        </h1>
        <p className="reveal-birthday-sub">
          {reveal.subtitle || "Today, your story gets another beautiful chapter."}
        </p>

        {/* Interactive Birthday Cake & Wish Area */}
        <div className="reveal-interactive-zone">
          <div
            className="wooden-make-wish-sign"
            id="make-a-wish-sign"
            title="Click to blow out candles!"
            onClick={handleBlowAll}
            role="button"
            tabIndex={0}
          >
            <span>{reveal.makeAWishText || "Make a Wish"}</span>
          </div>

          <div
            className="cake-interact-box"
            id="interactive-cake"
            title="Tap the candles to blow them out!"
            onClick={handleBlowAll}
            role="button"
            tabIndex={0}
          >
            {!allBlown && (
              <div className="cake-candle-row">
                {[1, 2, 3, 4].map((id) => (
                  <div
                    key={id}
                    className={`cake-candle-flame ${extinguishedFlames[id] ? 'extinguished' : 'active'}`}
                    id={`flame-${id}`}
                    onClick={(e) => handleCandleClick(id, e)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Candle ${id}`}
                  />
                ))}
              </div>
            )}
            <div
              className="cake-flame-hint"
              id="cake-hint-text"
              style={allBlown ? { color: '#ffeaa7' } : {}}
            >
              {allBlown
                ? "✨ All candles blown! Your wish is on its way to the stars! ✨"
                : "✨ Tap the candles or sign to blow out the magical flames! ✨"}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="magic-pill-btn"
          id="btn-reveal-journey"
          style={{ marginTop: '2rem' }}
          onClick={onBeginJourney}
        >
          {reveal.buttonText || "Begin Your Journey →"}
        </button>
      </div>
    </section>
  );
}
