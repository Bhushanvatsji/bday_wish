import React from 'react';

export default function AppreciationModal({ card, onClose }) {
  if (!card) return null;

  return (
    <div
      className="modal-backdrop active"
      id="appreciation-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.id === 'appreciation-modal') onClose();
      }}
    >
      <div className="modal-card-parchment appreciation-modal-card">
        <button
          type="button"
          className="modal-close-x"
          id="btn-close-appreciation-modal"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="appreciation-modal-icon" id="apprec-modal-icon">
          {card.icon}
        </div>
        <h3 className="modal-photo-title" id="apprec-modal-title">{card.title}</h3>
        <p className="modal-photo-story" id="apprec-modal-text">{card.message}</p>
      </div>
    </div>
  );
}
