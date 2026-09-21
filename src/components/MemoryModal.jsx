import React from 'react';

export default function MemoryModal({ memory, onClose }) {
  if (!memory) return null;

  return (
    <div
      className="modal-backdrop active"
      id="memory-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.id === 'memory-modal') onClose();
      }}
    >
      <div className="modal-card-parchment">
        <button
          type="button"
          className="modal-close-x"
          id="btn-close-memory-modal"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="modal-photo-box" id="modal-photo-img-wrap">
          <img src={memory.image} alt={memory.caption} />
        </div>
        <h3 className="modal-photo-title" id="modal-memory-title">{memory.caption}</h3>
        <p className="modal-photo-date" id="modal-memory-date">{memory.date}</p>
        <p className="modal-photo-story" id="modal-memory-story">{memory.detail}</p>
      </div>
    </div>
  );
}
