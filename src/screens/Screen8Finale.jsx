import React from 'react';

export default function Screen8Finale({
  isActive,
  config,
  onReplay,
  onReopenLetter
}) {
  const friendName = config.friendName || 'Hermione';
  const yourName = config.yourName || 'Your Best Friend';
  const finale = config.finale || {};
  const poemLines = finale.poem || [
    "Every story has chapters.",
    "Today, you begin another one.",
    "Make this chapter beautiful."
  ];

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-8"
      style={{ backgroundImage: "url('/assets/bg_landing.jpg')" }}
    >
      <div className="scene-overlay night-castle-overlay"></div>

      {/* Flying Owl Silhouette across Moon */}
      <div className="flying-owl-moon"></div>

      {/* Right Wall Banner */}
      <div className="hall-hanging-banner banner-finale-right">
        <div className="banner-crest">⚡</div>
        <p className="banner-text">
          SAME<br />MAGIC,<br />BRIGHTER<br />YOU
        </p>
      </div>

      {/* Warm Balcony Lantern */}
      <div className="warm-balcony-lantern"></div>

      <div className="finale-screen-wrap">
        <div className="finale-chapter-poem">
          {poemLines.map((line, idx) => (
            <p
              key={idx}
              className={idx === poemLines.length - 1 ? 'poem-highlight' : ''}
            >
              {line}
            </p>
          ))}
        </div>

        <h1 className="finale-birthday-h1">
          Happy Birthday, <span className="placeholder-friend">{friendName}</span>! ❤️
        </h1>

        <div className="gold-flourish-divider">❖──✦──❖</div>

        <p className="finale-author-credit">
          Made with ❤️ and a little bit of magic by <span className="placeholder-author">{yourName}</span>
        </p>

        <div className="finale-actions-row">
          <button
            type="button"
            className="magic-pill-btn"
            id="btn-replay-magic-final"
            onClick={onReplay}
          >
            {finale.replayText || "Replay The Magic 🔄"}
          </button>
          <button
            type="button"
            className="magic-pill-btn magic-btn-secondary"
            id="btn-reopen-letter-final"
            onClick={onReopenLetter}
          >
            {finale.letterText || "Open The Letter Again ✉️"}
          </button>
        </div>
      </div>
    </section>
  );
}
