import React, { useState } from 'react';

export default function Screen6Wishes({
  isActive,
  config,
  onWishClick,
  onNextScreen
}) {
  const wishesConfig = config.wishes || {};
  const wishes = wishesConfig.cards || [];
  const [activeWishId, setActiveWishId] = useState(null);

  const handleClick = (item, e) => {
    setActiveWishId(item.id);
    setTimeout(() => setActiveWishId(null), 350);
    if (onWishClick) onWishClick(item, e);
  };

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-6"
      style={{ backgroundImage: "url('/assets/bg_landing.jpg')" }}
    >
      <div className="scene-overlay night-sky-overlay"></div>

      <div className="wishes-screen-wrap">
        <h2 className="scene-header-gold">
          {wishesConfig.title || "My Wishes For You"}
        </h2>
        <p className="scene-subtitle-cream">
          {wishesConfig.subtitle || "May this year bring you everything you deserve ✨"}
        </p>

        {/* 6 Floating Star Parchment Wish Cards */}
        <div className="wishes-floating-grid" id="wishes-cards-container">
          {wishes.map((item) => {
            const isSelected = activeWishId === item.id;
            return (
              <div
                key={item.id}
                className="wish-parchment-card clickable"
                style={
                  isSelected
                    ? { transform: 'translateY(-8px) scale(1.08)', transition: 'transform 0.25s ease' }
                    : {}
                }
                onClick={(e) => handleClick(item, e)}
                role="button"
                tabIndex={0}
              >
                <div className="wish-star-crest">⭐</div>
                <p className="wish-card-text">{item.text}</p>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="magic-pill-btn"
          id="btn-to-chamber"
          style={{ marginTop: '2rem' }}
          onClick={onNextScreen}
        >
          {wishesConfig.buttonText || "To The Secret Chamber 🔮"}
        </button>
      </div>
    </section>
  );
}
