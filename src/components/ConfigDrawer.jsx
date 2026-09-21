import React, { useState, useEffect } from 'react';

export default function ConfigDrawer({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) {
  const [friendName, setFriendName] = useState(config.friendName || '');
  const [yourName, setYourName] = useState(config.yourName || '');
  const [customMusic, setCustomMusic] = useState(config.audio?.customMusicUrl || '');

  useEffect(() => {
    setFriendName(config.friendName || '');
    setYourName(config.yourName || '');
    setCustomMusic(config.audio?.customMusicUrl || '');
  }, [config]);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveConfig({
      friendName: friendName.trim() || 'Hermione',
      yourName: yourName.trim() || 'Your Best Friend',
      customMusicUrl: customMusic.trim()
    });
  };

  return (
    <aside className={`config-sidebar ${isOpen ? 'open' : ''}`} id="config-drawer" aria-label="Personalization Settings">
      <div className="config-sidebar-header">
        <span>Personalize Experience</span>
        <button
          type="button"
          className="config-close-btn"
          id="btn-close-config"
          aria-label="Close Drawer"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div className="config-field">
          <label className="config-label" htmlFor="cfg-friend-name">Friend's Name</label>
          <input
            type="text"
            className="config-input"
            id="cfg-friend-name"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />
        </div>

        <div className="config-field">
          <label className="config-label" htmlFor="cfg-your-name">Your Name</label>
          <input
            type="text"
            className="config-input"
            id="cfg-your-name"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />
        </div>

        <div className="config-field">
          <label className="config-label" htmlFor="cfg-custom-music">Custom Music URL (.mp3 or audio stream)</label>
          <input
            type="text"
            className="config-input"
            id="cfg-custom-music"
            placeholder="e.g. music/hedwigs_theme.mp3"
            value={customMusic}
            onChange={(e) => setCustomMusic(e.target.value)}
          />
          <small className="config-hint">Leave blank to use built-in procedural Hogwarts chimes & harp!</small>
        </div>

        <button type="submit" className="magic-pill-btn config-apply-btn" id="btn-save-config">
          Apply Magic ✨
        </button>
      </form>
    </aside>
  );
}
