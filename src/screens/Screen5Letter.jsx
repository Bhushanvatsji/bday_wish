import React, { useState, useEffect, useRef } from 'react';

export default function Screen5Letter({
  isActive,
  config,
  onSealLetter,
  onNextScreen,
  onWandSpark
}) {
  const friendName = config.friendName || 'Hermione';
  const yourName = config.yourName || 'Your Best Friend';
  const letterConfig = config.letter || {};
  const paragraphs = letterConfig.paragraphs || [];

  const [typedParagraphs, setTypedParagraphs] = useState([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isStamped, setIsStamped] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    // Reset and start typewriter animation
    setTypedParagraphs(['']);
    setIsTypingComplete(false);

    let pIdx = 0;
    let charIdx = 0;

    function typeNext() {
      if (pIdx >= paragraphs.length) {
        setIsTypingComplete(true);
        if (onWandSpark) onWandSpark();
        return;
      }

      const rawText = paragraphs[pIdx].replace(/{friendName}/g, friendName);

      if (charIdx < rawText.length) {
        const nextChar = rawText[charIdx];
        charIdx++;
        setTypedParagraphs((prev) => {
          const next = [...prev];
          next[pIdx] = (next[pIdx] || '') + nextChar;
          return next;
        });
        timerRef.current = setTimeout(typeNext, 16);
      } else {
        pIdx++;
        charIdx = 0;
        if (pIdx < paragraphs.length) {
          setTypedParagraphs((prev) => [...prev, '']);
          timerRef.current = setTimeout(typeNext, 220);
        } else {
          setIsTypingComplete(true);
          if (onWandSpark) onWandSpark();
        }
      }
    }

    timerRef.current = setTimeout(typeNext, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, paragraphs, friendName]);

  const handleSeal = (e) => {
    setIsStamped(true);
    if (onSealLetter) onSealLetter(e);
  };

  return (
    <section
      className={`layer-screen ${isActive ? 'active' : ''}`}
      id="layer-5"
      style={{ backgroundImage: "url('/assets/bg_letter_desk.jpg')" }}
    >
      <div className="scene-overlay desk-lighting-overlay"></div>

      <div className="typewriter-screen-wrap">
        {/* Left Side Quote */}
        <div className="typewriter-side-quote">
          <p>Words</p>
          <p>have a way of</p>
          <p>staying forever,</p>
          <p>just like the</p>
          <p>people who</p>
          <p>matter.</p>
        </div>

        {/* Central Parchment Letter */}
        <div className="typewriter-parchment-scroll" id="birthday-typewriter-parchment">
          <h2 className="letter-tome-title">
            {letterConfig.heading || "A Letter From Me To You"}
          </h2>

          <div className="typewriter-letter-body" id="typewriter-letter-text">
            {typedParagraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div
            className={`letter-author-signoff ${isTypingComplete ? 'visible' : ''}`}
            id="letter-author-signoff"
          >
            <p className="author-sig-text">
              — <span className="placeholder-author">{yourName}</span> ❤️
            </p>
          </div>

          {/* Wax Seal Container */}
          <div className="letter-seal-container">
            {!isStamped && (
              <button
                type="button"
                className="magic-pill-btn seal-letter-action-btn"
                id="btn-seal-parchment"
                onClick={handleSeal}
              >
                {letterConfig.sealButtonText || "Seal The Letter"}
              </button>
            )}
            <div
              className={`sealed-wax-stamp ${isStamped ? 'stamped' : ''}`}
              id="sealed-wax-stamp"
            >
              <span>✦</span>
            </div>
          </div>

          {/* Quill Graphic */}
          <div className="resting-quill-decor" id="resting-quill">
            🪶
          </div>
        </div>

        {/* Next Step Button (revealed after sealing) */}
        {isStamped && (
          <button
            type="button"
            className="magic-pill-btn"
            id="btn-to-wishes"
            style={{ marginTop: '1.8rem' }}
            onClick={onNextScreen}
          >
            Look Up at the Stars ✨
          </button>
        )}
      </div>
    </section>
  );
}
