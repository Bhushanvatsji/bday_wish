/**
 * ==========================================================
 * MAGICAL HOGWARTS BIRTHDAY EXPERIENCE — CONTROLLER (app.js)
 * Controls all 9 screens, animations, audio, and interactions.
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Engines & Configuration
  const particles = new MagicalParticles('particles-canvas');
  const audio = new MagicalAudio();
  const config = window.MAGICAL_CONFIG || {};

  let currentLayer = 0;
  let typewriterTimeout = null;
  let isTyping = false;

  // DOM Elements
  const screens = Array.from(document.querySelectorAll('.layer-screen'));
  const journeyDots = Array.from(document.querySelectorAll('.journey-dot'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const audioToggleBtn = document.getElementById('btn-audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  const configDrawer = document.getElementById('config-drawer');
  const openConfigBtn = document.getElementById('btn-open-config');
  const closeConfigBtn = document.getElementById('btn-close-config');
  const saveConfigBtn = document.getElementById('btn-save-config');

  // ==========================================================
  // DYNAMIC TEXT & PLACEHOLDER HYDRATION
  // ==========================================================
  function updatePlaceholders() {
    const friend = config.friendName || 'Hermione';
    const author = config.yourName || 'Your Best Friend';

    document.querySelectorAll('.placeholder-friend').forEach(el => {
      el.textContent = friend;
    });

    document.querySelectorAll('.placeholder-author').forEach(el => {
      el.textContent = author;
    });

    const cfgFriend = document.getElementById('cfg-friend-name');
    if (cfgFriend) cfgFriend.value = friend;

    const cfgYour = document.getElementById('cfg-your-name');
    if (cfgYour) cfgYour.value = author;
  }

  // ==========================================================
  // LAYER SWITCHING & NAVIGATION
  // ==========================================================
  function goToLayer(index) {
    if (index < 0 || index >= screens.length) return;

    screens.forEach((s) => s.classList.remove('active'));
    screens[index].classList.add('active');
    currentLayer = index;

    // Update bottom journey dots
    journeyDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    // Update top nav active link based on current screen
    navLinks.forEach(link => link.classList.remove('active'));
    if (index <= 2) {
      document.querySelector('.nav-link[data-target="0"]')?.classList.add('active');
    } else if (index === 3 || index === 4) {
      document.querySelector('.nav-link[data-target="3"]')?.classList.add('active');
    } else if (index === 5) {
      document.querySelector('.nav-link[data-target="5"]')?.classList.add('active');
    } else if (index === 6) {
      document.querySelector('.nav-link[data-target="6"]')?.classList.add('active');
    } else if (index >= 7) {
      document.querySelector('.nav-link[data-target="7"]')?.classList.add('active');
    }

    // Trigger layer-specific events
    onLayerActivated(index);
  }

  function onLayerActivated(layer) {
    if (layer === 0) {
      // Landing page
    } else if (layer === 1) {
      audio.startMusic();
    } else if (layer === 2) {
      // Birthday Reveal burst
      particles.burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 60);
      particles.burstSparks(window.innerWidth / 2, window.innerHeight / 2, 40, 'gold');
      audio.playChime();
    } else if (layer === 5) {
      // Typewriter Letter
      startTypewriterLetter();
    } else if (layer === 8) {
      // Finale
      particles.burstSparks(window.innerWidth / 2, window.innerHeight / 3, 40, 'magic');
    }
  }

  // Top Nav Click Bindings
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      audio.init();
      audio.startMusic();
      audio.playChime();
      const targetLayer = parseInt(link.getAttribute('data-target'), 10);
      goToLayer(targetLayer);
    });
  });

  // Journey Dots Click Bindings
  journeyDots.forEach(dot => {
    dot.addEventListener('click', () => {
      audio.init();
      audio.playChime();
      const target = parseInt(dot.getAttribute('data-layer'), 10);
      goToLayer(target);
    });
  });

  // ==========================================================
  // SCREEN 1: LANDING PAGE (MAGICAL INTRO)
  // ==========================================================
  function initScreen1() {
    const btnEnter = document.getElementById('btn-enter-magic');
    const envelope = document.getElementById('landing-envelope');

    const handleEnter = (e) => {
      audio.init();
      audio.startMusic();
      audio.playWandSpark();
      particles.burstSparks(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 45, 'gold');
      goToLayer(1);
    };

    btnEnter.addEventListener('click', handleEnter);
    envelope.addEventListener('click', handleEnter);

    // Signpost arrows interactive sound & sparks
    document.querySelectorAll('.signpost-arrow').forEach(arrow => {
      arrow.addEventListener('click', (e) => {
        audio.playChime();
        particles.burstSparks(e.clientX, e.clientY, 18, 'gold');
      });
    });
  }

  // ==========================================================
  // SCREEN 2: MAGICAL LETTER (ENVELOPE OPENS)
  // ==========================================================
  function initScreen2() {
    const btnOpenLetter = document.getElementById('btn-open-letter-main');
    btnOpenLetter.addEventListener('click', (e) => {
      audio.playSealStamp();
      particles.burstSparks(e.clientX, e.clientY, 40, 'gold');
      setTimeout(() => {
        audio.playChime();
        goToLayer(2);
      }, 400);
    });
  }

  // ==========================================================
  // SCREEN 3: BIRTHDAY REVEAL
  // ==========================================================
  function initScreen3() {
    const flames = Array.from(document.querySelectorAll('.cake-candle-flame'));
    const hint = document.getElementById('cake-hint-text');
    const wishSign = document.getElementById('make-a-wish-sign');
    const cakeZone = document.getElementById('interactive-cake');
    const btnJourney = document.getElementById('btn-reveal-journey');
    let extinguishedCount = 0;

    const blowAllCandles = (e) => {
      flames.forEach(f => f.classList.add('extinguished'));
      extinguishedCount = flames.length;
      audio.playBlowCandle();
      particles.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 75);
      particles.burstSparks(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 35, 'fire');
      hint.textContent = "✨ All candles blown! Your wish is on its way to the stars! ✨";
      hint.style.color = "#ffeaa7";
    };

    flames.forEach(flame => {
      flame.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!flame.classList.contains('extinguished')) {
          flame.classList.add('extinguished');
          extinguishedCount++;
          audio.playBlowCandle();
          particles.burstSparks(e.clientX, e.clientY, 15, 'fire');
          if (extinguishedCount >= flames.length) {
            blowAllCandles(e);
          }
        }
      });
    });

    wishSign.addEventListener('click', blowAllCandles);
    cakeZone.addEventListener('click', blowAllCandles);

    btnJourney.addEventListener('click', (e) => {
      audio.playPageTurn();
      particles.burstSparks(e.clientX, e.clientY, 30, 'gold');
      goToLayer(3);
    });
  }

  // ==========================================================
  // SCREEN 4: MEMORIES SECTION (PHOTO GALLERY)
  // ==========================================================
  function initScreen4() {
    const prevBtn = document.getElementById('btn-polaroids-prev');
    const nextBtn = document.getElementById('btn-polaroids-next');
    const polaroidsRow = document.getElementById('polaroids-container');
    const btnToAppreciation = document.getElementById('btn-to-appreciation');

    // Lightbox modal elements
    const modal = document.getElementById('memory-modal');
    const modalImgWrap = document.getElementById('modal-photo-img-wrap');
    const modalTitle = document.getElementById('modal-memory-title');
    const modalDate = document.getElementById('modal-memory-date');
    const modalStory = document.getElementById('modal-memory-story');
    const modalClose = document.getElementById('btn-close-memory-modal');

    const polaroids = config.memoryBook?.polaroids || [];

    // Polaroid click -> Modal
    document.querySelectorAll('.polaroid-frame').forEach((frame, idx) => {
      frame.addEventListener('click', (e) => {
        const item = polaroids[idx];
        if (!item) return;
        audio.playChime();
        particles.burstSparks(e.clientX, e.clientY, 20, 'gold');

        modalImgWrap.innerHTML = `<img src="${item.image}" alt="${item.caption}">`;
        modalTitle.textContent = item.caption;
        modalDate.textContent = item.date;
        modalStory.textContent = item.detail;
        modal.classList.add('active');
      });
    });

    // Modal close
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    // Arrow navigation
    prevBtn.addEventListener('click', () => {
      audio.playPageTurn();
      polaroidsRow.scrollBy({ left: -240, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      audio.playPageTurn();
      polaroidsRow.scrollBy({ left: 240, behavior: 'smooth' });
    });

    btnToAppreciation.addEventListener('click', (e) => {
      audio.playPageTurn();
      particles.burstSparks(e.clientX, e.clientY, 30, 'gold');
      goToLayer(4);
    });
  }

  // ==========================================================
  // SCREEN 5: APPRECIATION SECTION (INTERACTIVE CARDS)
  // ==========================================================
  function initScreen5() {
    const grid = document.getElementById('appreciation-cards-grid');
    const btnToLetter = document.getElementById('btn-to-typewriter-letter');
    const cardsData = config.appreciation?.cards || [];

    // Appreciation Modal
    const modal = document.getElementById('appreciation-modal');
    const modalIcon = document.getElementById('apprec-modal-icon');
    const modalTitle = document.getElementById('apprec-modal-title');
    const modalText = document.getElementById('apprec-modal-text');
    const modalClose = document.getElementById('btn-close-appreciation-modal');

    grid.innerHTML = '';
    cardsData.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'appreciation-card clickable';
      cardEl.innerHTML = `
        <div class="appreciation-card-icon">${card.icon}</div>
        <h3 class="appreciation-card-title">${card.title}</h3>
      `;

      cardEl.addEventListener('click', (e) => {
        audio.playChime();
        particles.burstSparks(e.clientX, e.clientY, 25, 'gold');
        modalIcon.textContent = card.icon;
        modalTitle.textContent = card.title;
        modalText.textContent = card.message;
        modal.classList.add('active');
      });

      grid.appendChild(cardEl);
    });

    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    btnToLetter.addEventListener('click', (e) => {
      audio.playPageTurn();
      particles.burstSparks(e.clientX, e.clientY, 30, 'gold');
      goToLayer(5);
    });
  }

  // ==========================================================
  // SCREEN 6: BIRTHDAY WISH LETTER (TYPEWRITER EFFECT)
  // ==========================================================
  function initScreen6() {
    const btnSeal = document.getElementById('btn-seal-parchment');
    const stamp = document.getElementById('sealed-wax-stamp');
    const btnToWishes = document.getElementById('btn-to-wishes');

    btnSeal.addEventListener('click', (e) => {
      audio.playSealStamp();
      stamp.classList.add('stamped');
      btnSeal.style.display = 'none';
      btnToWishes.style.display = 'inline-flex';
      particles.burstSparks(e.clientX, e.clientY, 40, 'gold');
    });

    btnToWishes.addEventListener('click', (e) => {
      audio.playChime();
      particles.burstSparks(e.clientX, e.clientY, 30, 'magic');
      goToLayer(6);
    });
  }

  function startTypewriterLetter() {
    const body = document.getElementById('typewriter-letter-text');
    const signoff = document.getElementById('letter-author-signoff');
    const paragraphs = config.letter?.paragraphs || [];
    const friend = config.friendName || 'Hermione';

    body.innerHTML = '';
    signoff.classList.remove('visible');

    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    isTyping = true;

    let pIdx = 0;
    function typeParagraph() {
      if (pIdx >= paragraphs.length) {
        isTyping = false;
        signoff.classList.add('visible');
        audio.playWandSpark();
        return;
      }

      const pText = paragraphs[pIdx].replace(/{friendName}/g, friend);
      const pEl = document.createElement('p');
      body.appendChild(pEl);

      let charIdx = 0;
      function typeChar() {
        if (charIdx < pText.length) {
          pEl.textContent += pText[charIdx];
          charIdx++;
          typewriterTimeout = setTimeout(typeChar, 16);
        } else {
          pIdx++;
          typewriterTimeout = setTimeout(typeParagraph, 220);
        }
      }
      typeChar();
    }

    typeParagraph();
  }

  // ==========================================================
  // SCREEN 7: WISHES SECTION
  // ==========================================================
  function initScreen7() {
    const container = document.getElementById('wishes-cards-container');
    const btnToChamber = document.getElementById('btn-to-chamber');
    const wishes = config.wishes?.cards || [];

    container.innerHTML = '';
    wishes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wish-parchment-card clickable';
      card.innerHTML = `
        <div class="wish-star-crest">⭐</div>
        <p class="wish-card-text">${item.text}</p>
      `;

      card.addEventListener('click', (e) => {
        audio.playChime();
        particles.burstSparks(e.clientX, e.clientY, 30, 'gold');
        card.style.transform = 'translateY(-8px) scale(1.08)';
        setTimeout(() => {
          card.style.transform = '';
        }, 300);
      });

      container.appendChild(card);
    });

    btnToChamber.addEventListener('click', (e) => {
      audio.playDoorUnlock();
      particles.burstSparks(e.clientX, e.clientY, 35, 'gold');
      goToLayer(7);
    });
  }

  // ==========================================================
  // SCREEN 8: SECRET CHAMBER (FINAL SURPRISE)
  // ==========================================================
  function initScreen8() {
    const btnUnlock = document.getElementById('btn-unlock-chamber');
    const revealModal = document.getElementById('chamber-surprise-modal');
    const btnToFinale = document.getElementById('btn-to-finale');
    const keyhole = document.getElementById('chamber-keyhole');

    btnUnlock.addEventListener('click', (e) => {
      audio.playDoorUnlock();
      keyhole.style.transform = 'scale(1.4)';
      particles.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 90);
      particles.burstSparks(window.innerWidth / 2, window.innerHeight / 2, 60, 'magic');

      setTimeout(() => {
        revealModal.classList.add('active');
        audio.playChime();
      }, 700);
    });

    btnToFinale.addEventListener('click', (e) => {
      revealModal.classList.remove('active');
      audio.playChime();
      particles.burstSparks(e.clientX, e.clientY, 35, 'gold');
      goToLayer(8);
    });
  }

  // ==========================================================
  // SCREEN 9: FINAL PAGE
  // ==========================================================
  function initScreen9() {
    const btnReplay = document.getElementById('btn-replay-magic-final');
    const btnReopen = document.getElementById('btn-reopen-letter-final');

    btnReplay.addEventListener('click', (e) => {
      audio.playChime();
      particles.burstSparks(e.clientX, e.clientY, 30, 'gold');
      goToLayer(0);
    });

    btnReopen.addEventListener('click', (e) => {
      audio.playPageTurn();
      particles.burstSparks(e.clientX, e.clientY, 30, 'gold');
      goToLayer(5);
    });
  }

  // ==========================================================
  // PERSONALIZATION DRAWER & AUDIO HUD
  // ==========================================================
  function initHUD() {
    // Audio Toggle
    audioToggleBtn.addEventListener('click', () => {
      const isMuted = audio.toggleMute();
      audioIcon.textContent = isMuted ? '🔇' : '♫';
    });

    // Config Drawer
    openConfigBtn.addEventListener('click', () => {
      configDrawer.classList.toggle('open');
    });

    closeConfigBtn.addEventListener('click', () => {
      configDrawer.classList.remove('open');
    });

    saveConfigBtn.addEventListener('click', () => {
      const friendVal = document.getElementById('cfg-friend-name').value.trim();
      const yourVal = document.getElementById('cfg-your-name').value.trim();
      const musicVal = document.getElementById('cfg-custom-music').value.trim();

      if (friendVal) config.friendName = friendVal;
      if (yourVal) config.yourName = yourVal;
      if (musicVal && config.audio) config.audio.customMusicUrl = musicVal;

      updatePlaceholders();
      configDrawer.classList.remove('open');
      audio.playChime();
      particles.burstSparks(window.innerWidth - 80, 60, 25, 'gold');
    });
  }

  // ==========================================================
  // BOOTSTRAP ALL SYSTEMS
  // ==========================================================
  updatePlaceholders();
  initScreen1();
  initScreen2();
  initScreen3();
  initScreen4();
  initScreen5();
  initScreen6();
  initScreen7();
  initScreen8();
  initScreen9();
  initHUD();
});
