import React, { useRef } from 'react';

export default function Screen3Memories({
  isActive,
  config,
  onSelectMemory,
  onNextScreen,
  onScrollPageTurn
}) {
  const memoryBook = config.memoryBook || {};
  const polaroids = memoryBook.polaroids || [];
  const containerRef = useRef(null);

  const handleScroll = (delta) => {
    if (onScrollPageTurn) onScrollPageTurn();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-3"
      style={{ backgroundImage: "url('/assets/bg_memories_desk.jpg')" }}
    >
      <div className="scene-overlay book-desk-overlay"></div>

      <div className="memory-book-container">
        <div className="memory-book-header">
          <h2 className="book-title-gold">
            {memoryBook.title || "Your Magical Memory Book"}
          </h2>
          <p className="book-subtitle">
            {memoryBook.subtitle || "Little moments, big memories."}
          </p>
        </div>

        {/* Open Spellbook Tome with Polaroids */}
        <div className="open-spellbook-tome">
          <button
            type="button"
            className="book-arrow-circle arrow-left"
            id="btn-polaroids-prev"
            aria-label="Previous Memories"
            onClick={() => handleScroll(-240)}
          >
            ‹
          </button>

          <div
            className="polaroids-grid-row"
            id="polaroids-container"
            ref={containerRef}
          >
            {polaroids.map((item, idx) => (
              <div
                key={item.id || idx}
                className="polaroid-frame"
                data-index={idx}
                onClick={(e) => onSelectMemory(item, e)}
                role="button"
                tabIndex={0}
              >
                <div className="polaroid-photo-wrap">
                  <img src={item.image} alt={item.caption} className="polaroid-img" />
                </div>
                <p className="polaroid-caption">{item.caption}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="book-arrow-circle arrow-right"
            id="btn-polaroids-next"
            aria-label="Next Memories"
            onClick={() => handleScroll(240)}
          >
            ›
          </button>
        </div>

        <button
          type="button"
          className="magic-pill-btn"
          id="btn-to-appreciation"
          style={{ marginTop: '2rem' }}
          onClick={onNextScreen}
        >
          Things I Appreciate →
        </button>
      </div>
    </section>
  );
}
