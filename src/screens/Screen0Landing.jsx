import React from 'react';

export default function Screen0Landing({
  isActive,
  config,
  onEnterMagic,
  onSignpostClick
}) {
  const landing = config.landing || {};
  const signpostItems = landing.signpost || [
    "HAPPINESS",
    "FRIENDSHIP",
    "MEMORIES",
    "A BRIGHTER YOU"
  ];

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-0"
      style={{ backgroundImage: "url('/assets/bg_landing.jpg')" }}
    >
      <div className="scene-overlay dark-gradient-overlay"></div>

      {/* Top Left Dumbledore Quote */}
      <div className="landing-quote-box">
        <p className="landing-quote-text">
          "{landing.quote || "Happiness can be found even in the darkest times, if one only remembers to turn on the light."}"
        </p>
        <p className="landing-quote-author">— {landing.author || "D. D."}</p>
      </div>

      {/* Water Floating Candles */}
      <div className="landing-water-candles">
        <div className="water-candle c1"><div className="w-flame"></div></div>
        <div className="water-candle c2"><div className="w-flame"></div></div>
        <div className="water-candle c3"><div className="w-flame"></div></div>
        <div className="water-candle c4"><div className="w-flame"></div></div>
        <div className="water-candle c5"><div className="w-flame"></div></div>
        <div className="water-candle c6"><div className="w-flame"></div></div>
        <div className="water-candle c7"><div className="w-flame"></div></div>
        <div className="water-candle c8"><div className="w-flame"></div></div>
      </div>

      {/* Center Envelope & Hero Action */}
      <div className="landing-hero-center">
        <h1 className="landing-hero-title">
          {landing.title || "Something Magical is Waiting for You..."}
        </h1>
        <p className="landing-hero-sub">
          {landing.subtitle || "A special birthday experience made with love."}
        </p>

        <div className="magical-envelope-wrapper" id="landing-envelope-wrap">
          <div
            className="magical-envelope"
            id="landing-envelope"
            title="Click to enter the magic!"
            onClick={onEnterMagic}
            role="button"
            tabIndex={0}
          >
            <div className="envelope-top-flap"></div>
            <div className="envelope-red-seal" id="landing-seal">
              <span className="seal-crest">⚡</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="magic-pill-btn"
          id="btn-enter-magic"
          onClick={onEnterMagic}
        >
          {landing.buttonText || "Enter the Magic ✨"}
        </button>
      </div>

      {/* Right Side Wooden Directional Signpost */}
      <div className="wooden-signpost" aria-label="Magical Directional Signpost">
        <div className="signpost-pole"></div>
        {signpostItems.map((item, idx) => (
          <div
            key={idx}
            className={`signpost-arrow arrow-${idx + 1}`}
            onClick={(e) => onSignpostClick && onSignpostClick(e)}
            role="button"
            tabIndex={0}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
