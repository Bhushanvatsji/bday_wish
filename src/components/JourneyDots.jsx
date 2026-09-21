import React from 'react';

const LAYER_TITLES = [
  "1. Landing Page",
  "2. Magical Letter",
  "3. Birthday Reveal",
  "4. Memories Book",
  "5. Appreciation Cards",
  "6. Birthday Wish Letter",
  "7. Wishes Section",
  "8. Secret Chamber",
  "9. Final Page"
];

export default function JourneyDots({ currentLayer, onNavigate }) {
  return (
    <nav className="journey-dots" id="journey-dots" aria-label="Journey Progress">
      {LAYER_TITLES.map((title, idx) => (
        <span
          key={idx}
          className={`journey-dot ${currentLayer === idx ? 'active' : ''}`}
          data-layer={idx}
          title={title}
          onClick={(e) => onNavigate(idx, e)}
        />
      ))}
    </nav>
  );
}
