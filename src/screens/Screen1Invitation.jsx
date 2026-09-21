import React from 'react';

export default function Screen1Invitation({
  isActive,
  config,
  onOpenLetter
}) {
  const friendName = config.friendName || 'Shweta';
  const letter = config.invitationLetter || {};

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-1"
      style={{ backgroundImage: "url('/assets/bg_letter_desk.jpg')" }}
    >
      <div className="scene-overlay warm-desk-overlay"></div>

      <div className="screen-content-center">
        <h2 className="scene-header-gold">
          {letter.title || "A Special Letter Has Arrived..."}
        </h2>

        {/* Vintage Hogwarts Letter */}
        <div className="vintage-parchment-letter" id="screen2-parchment">
          <div className="parchment-crest">
            <svg className="crest-icon-svg" viewBox="0 0 100 100" width="64" height="64">
              <path d="M50 8 L78 24 L78 62 L50 92 L22 62 L22 24 Z" fill="none" stroke="#684a22" stroke-width="3"/>
              <path d="M50 15 L72 28 L72 58 L50 84 L28 58 L28 28 Z" fill="#efe2c4" stroke="#8d6632" stroke-width="1.5"/>
              <path d="M50 20 L50 80 M28 48 L72 48" stroke="#8d6632" stroke-width="1.5"/>
              <text x="50" y="56" fontFamily="'Cinzel Decorative', serif" fontSize="24" fontWeight="bold" fill="#543719" textAnchor="middle">H</text>
            </svg>
          </div>

          <div className="parchment-text-content">
            <p className="letter-salutation">Dear <span className="placeholder-friend">{friendName}</span>,</p>
            <p className="letter-body-line important-msg">
              {letter.intro || "An important message has arrived for you..."}
            </p>
            <p className="letter-body-line">Today is not an ordinary day.</p>
            <p className="letter-body-line">Because today, the world became a little more special when you were born.</p>
            <p className="letter-body-line">So consider this your personal invitation to a small magical birthday celebration...</p>
          </div>

          <button
            type="button"
            className="magic-pill-btn letter-open-btn"
            id="btn-open-letter-main"
            onClick={onOpenLetter}
          >
            {letter.buttonText || "Open the Letter 🪄"}
          </button>
        </div>
      </div>
    </section>
  );
}
