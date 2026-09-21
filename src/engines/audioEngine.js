/**
 * ==========================================================
 * MAGICAL AUDIO & PROCEDURAL MUSIC ENGINE
 * ==========================================================
 * Provides enchanted background music box melodies via Web Audio API
 * (no external audio files needed!) plus magical sound effects.
 * Supports custom audio files if specified.
 */

export class MagicalAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.customAudio = null;
    this.volume = 0.55;
    this.melodyTimer = null;
    this.melodyIndex = 0;

    // Hedwig/Enchanted inspired celesta mystery scale (frequencies in Hz)
    this.mysteryMelody = [
      { note: 659.25, dur: 0.6 }, // E5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 739.99, dur: 0.5 }, // F#5
      { note: 659.25, dur: 0.9 }, // E5
      { note: 987.77, dur: 0.9 }, // B5
      { note: 880.00, dur: 1.2 }, // A5
      { note: 739.99, dur: 1.0 }, // F#5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 739.99, dur: 0.5 }, // F#5
      { note: 622.25, dur: 0.9 }, // D#5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 493.88, dur: 1.4 }, // B4
      { note: null,   dur: 0.8 }  // Rest
    ];

    // Harmonizing chords
    this.harmonyChords = [
      [329.63, 392.00, 493.88], // Em
      [329.63, 392.00, 493.88],
      [293.66, 369.99, 440.00], // D
      [246.94, 311.13, 369.99], // B
    ];
  }

  init(customUrl = null) {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (customUrl) {
      if (!this.customAudio || this.customAudio.src !== customUrl) {
        if (this.customAudio) this.customAudio.pause();
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = this.volume;
      }
    }
  }

  startMusic() {
    this.init();
    if (this.isMuted) return;

    if (this.customAudio) {
      this.customAudio.play().catch(() => {});
      this.isPlaying = true;
      return;
    }

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playProceduralMelody();
    }
  }

  playProceduralMelody() {
    if (!this.isPlaying || this.isMuted) return;

    const item = this.mysteryMelody[this.melodyIndex];
    if (item && item.note) {
      this.synthesizeCelesta(item.note, item.dur * 1.5, 0.18 * this.volume);
      
      // Drone / warm harmony pad
      if (this.melodyIndex === 0 || this.melodyIndex === 7) {
        const chord = this.harmonyChords[(this.melodyIndex / 7) % this.harmonyChords.length];
        this.synthesizePad(chord, 3.5, 0.08 * this.volume);
      }
    }

    const nextDelay = (item ? item.dur : 0.8) * 750;
    this.melodyIndex = (this.melodyIndex + 1) % this.mysteryMelody.length;
    this.melodyTimer = setTimeout(() => {
      this.playProceduralMelody();
    }, nextDelay);
  }

  synthesizeCelesta(freq, duration, gainAmount) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Subtle bell overtone
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2.01, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(gainAmount, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + duration);
    subOsc.stop(t + duration);
  }

  synthesizePad(chordFreqs, duration, gainAmount) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    chordFreqs.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq / 2, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(gainAmount, t + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + duration);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.customAudio) this.customAudio.pause();
      if (this.melodyTimer) clearTimeout(this.melodyTimer);
      this.isPlaying = false;
    } else {
      this.startMusic();
    }
    return this.isMuted;
  }

  // --- SOUND EFFECTS ---

  playChime() {
    if (this.isMuted) return;
    this.init();
    const chords = [880, 1174.66, 1760]; // A5, D6, A6
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.synthesizeCelesta(freq, 1.2, 0.15 * this.volume);
      }, idx * 70);
    });
  }

  playWandSpark() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(2200, t + 0.35);

    gain.gain.setValueAtTime(0.12 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  playPageTurn() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.18;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2 * this.volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  playBlowCandle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();

    setTimeout(() => this.synthesizeCelesta(1318.51, 1.0, 0.12 * this.volume), 200);
  }

  playSealStamp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
    gain.gain.setValueAtTime(0.4 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);

    setTimeout(() => {
      this.synthesizeCelesta(987.77, 1.2, 0.15 * this.volume);
    }, 120);
  }

  playDoorUnlock() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [130, 195, 260, 520].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);
      gain.gain.setValueAtTime(0.2 * this.volume, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.08);
      osc.stop(t + 2.0);
    });
  }
}

export const magicalAudio = new MagicalAudio();
