import React, { useState } from 'react';

export default function Screen7Chamber({
  isActive,
  config,
  onUnlockChamber,
  onNextScreen
}) {
  const friendName = config.friendName || 'Hermione';
  const chamberConfig = config.chamber || {};

  const [isKeyholeActive, setIsKeyholeActive] = useState(false);
  const [isModalRevealed, setIsModalRevealed] = useState(false);

  const handleUnlock = (e) => {
    setIsKeyholeActive(true);
    if (onUnlockChamber) onUnlockChamber(e);
    setTimeout(() => {
      setIsModalRevealed(true);
    }, 700);
  };

  const handleProceed = (e) => {
    setIsModalRevealed(false);
    if (onNextScreen) onNextScreen(e);
  };

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-7"
      style={{ backgroundImage: "url('/assets/bg_secret_door.png')" }}
    >
      <div className="scene-overlay chamber-stone-overlay"></div>

      <div className="secret-chamber-wrap">
        <h2 className="scene-header-gold">
          {chamberConfig.title || "There's One Final Secret..."}
        </h2>

        {/* Right Wall Inscription Plaque */}
        <div className="chamber-wall-plaque">
          <p>
            SOMETIMES<br />
            THE BEST<br />
            SURPRISES<br />
            ARE THE ONES<br />
            YOU NEVER<br />
            SEE COMING.
          </p>
        </div>

        {/* Open Chamber Button */}
        {!isModalRevealed && (
          <button
            type="button"
            className="magic-pill-btn chamber-open-btn"
            id="btn-unlock-chamber"
            onClick={handleUnlock}
          >
            {chamberConfig.buttonText || "Open The Chamber 🔮"}
          </button>
        )}

        {/* Chamber Surprise Revealed Overlay */}
        <div
          className={`chamber-surprise-reveal ${isModalRevealed ? 'active' : ''}`}
          id="chamber-surprise-modal"
        >
          <div className="chamber-modal-inner">
            <h1 className="chamber-big-text">
              {chamberConfig.surpriseTitle || "YOU DESERVE A LITTLE MAGIC TOO. ✨"}
            </h1>
            <h2 className="chamber-sub-text">
              Happy Birthday, <span className="placeholder-friend">{friendName}</span>! ❤️
            </h2>
            <button
              type="button"
              className="magic-pill-btn"
              id="btn-to-finale"
              style={{ marginTop: '1.5rem' }}
              onClick={handleProceed}
            >
              {chamberConfig.proceedText || "The Final Chapter 🏰"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
