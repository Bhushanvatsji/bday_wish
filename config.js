/**
 * ==========================================================
 * MAGICAL BIRTHDAY EXPERIENCE — CONFIGURATION
 * ==========================================================
 * Customize names, memories, appreciation cards, letter,
 * and wishes for your friend!
 */

window.MAGICAL_CONFIG = {
  // 1. PERSONAL DETAILS
  friendName: "Hermione",       // Replace with friend's name (e.g. "Hermione", "Sarah", "Elena")
  yourName: "Your Best Friend", // Replace with your name
  birthdayDate: "September 21",

  // 2. SCREEN 1: LANDING PAGE
  landing: {
    quote: "Happiness can be found even in the darkest times, if one only remembers to turn on the light.",
    author: "D. D.",
    title: "Something Magical is Waiting for You...",
    subtitle: "A special birthday experience made with love.",
    buttonText: "Enter the Magic ✨",
    signpost: [
      "HAPPINESS",
      "FRIENDSHIP",
      "MEMORIES",
      "A BRIGHTER YOU"
    ]
  },

  // 3. SCREEN 2: MAGICAL LETTER
  invitationLetter: {
    title: "A Special Letter Has Arrived...",
    greeting: "Dear {friendName},",
    intro: "An important message has arrived for you...",
    body: "Today is not an ordinary day.\nBecause today, the world became a little more special when you were born.\n\nSo consider this your personal invitation to a small magical birthday celebration...",
    buttonText: "Open the Letter 🪄"
  },

  // 4. SCREEN 3: BIRTHDAY REVEAL
  reveal: {
    bannerText: "SAME BRIGHT SOUL, A BRIGHTER YEAR",
    title: "HAPPY BIRTHDAY\n{friendName}!",
    subtitle: "Today, your story gets another beautiful chapter.",
    makeAWishText: "Make a Wish",
    buttonText: "Begin Your Journey →"
  },

  // 5. SCREEN 4: MEMORIES SECTION (PHOTO GALLERY)
  memoryBook: {
    title: "Your Magical Memory Book",
    subtitle: "Little moments, big memories.",
    polaroids: [
      {
        id: 1,
        image: "assets/photo_sunset.jpg",
        caption: "That one day we couldn't stop laughing 💛",
        date: "Golden Sunset",
        detail: "The evening we laughed so hard until our cheeks hurt and our stomachs ached. Pure golden memories that stay forever."
      },
      {
        id: 2,
        image: "assets/photo_coffee.jpg",
        caption: "Random conversations that mean everything.",
        date: "Cozy Cafe Talk",
        detail: "Hours flying by over warm coffee cups, sharing inside jokes, dreaming big, and knowing someone truly gets you."
      },
      {
        id: 3,
        image: "assets/photo_adventure.jpg",
        caption: "Adventures big or small.",
        date: "Mountain Viewpoints",
        detail: "From unexpected road trips to scenic overlooks, every journey is a hundred times brighter with you along."
      },
      {
        id: 4,
        image: "assets/photo_boots.jpg",
        caption: "Proof that ordinary days can be extraordinary.",
        date: "Quiet Escapes",
        detail: "Just sitting back, taking a deep breath of fresh air, and realizing the best days are the ones shared with great friends."
      }
    ]
  },

  // 6. SCREEN 5: APPRECIATION SECTION
  appreciation: {
    title: "Things I Appreciate About You",
    subtitle: "A few of the many reasons you're amazing ✨",
    cards: [
      {
        icon: "☀️",
        title: "Your Smile",
        message: "Your smile genuinely lights up every room and turns gloomy days into pure sunshine."
      },
      {
        icon: "💖",
        title: "Your Kindness",
        message: "You have an exceptionally thoughtful soul. The genuine empathy, generosity, and care you give to others is truly rare."
      },
      {
        icon: "⚡",
        title: "Your Crazy Energy",
        message: "Your spontaneous humor and electric vibe bring unmatchable fun into ordinary days. Never lose that brilliant spark!"
      },
      {
        icon: "👥",
        title: "Your Support",
        message: "Thank you for listening whenever I needed an ear, never judging, and being the rock-solid confidant anyone would be blessed to have."
      },
      {
        icon: "💬",
        title: "Your Random Messages",
        message: "Those out-of-nowhere memes, funny thoughts, and sweet check-ins brighten my whole day more than you will ever know."
      },
      {
        icon: "❤️",
        title: "Your Beautiful Heart",
        message: "Underneath everything is a heart of pure gold. You are irreplaceable, and I am endlessly grateful to have you in my corner."
      }
    ],
    hint: "Click on each card to see a special message 💕",
    buttonText: "Read The Letter 💌"
  },

  // 7. SCREEN 6: BIRTHDAY WISH LETTER (TYPEWRITER)
  letter: {
    sideQuote: "Words\nhave a way of\nstaying forever,\njust like the\npeople who\nmatter.",
    heading: "A Letter From Me To You",
    paragraphs: [
      "Happy Birthday! ❤️",
      "I honestly don't know how to put everything into a few words, but I wanted to make something special for you instead of just sending a simple \"Happy Birthday\" message...",
      "You've become a really special part of my life, and I'm genuinely grateful for all the memories, conversations, laughs, random moments, and even the completely crazy things we've done.",
      "Life changes, people change, and time keeps moving, but some people leave behind memories that you genuinely want to keep forever.",
      "You're one of those people.",
      "On your birthday, I just want to wish you happiness that stays, people who genuinely care about you, dreams that come true, and countless moments that make you smile.",
      "I hope this new chapter of your life brings you closer to everything you've been working for.",
      "I hope you never stop believing in yourself.",
      "I hope you always remember how special you are.",
      "And most importantly...",
      "I hope you have a life filled with moments that make you look back and smile.",
      "Thank you for being you.",
      "Happy Birthday once again, {friendName}! 🎂✨",
      "May your next chapter be your most magical one yet."
    ],
    signoff: "— {yourName} ❤️",
    sealButtonText: "Seal The Letter"
  },

  // 8. SCREEN 7: WISHES SECTION
  wishes: {
    title: "My Wishes For You",
    subtitle: "May this year bring you everything you deserve ✨",
    cards: [
      { id: 1, text: "May your dreams become plans." },
      { id: 2, text: "May you always find reasons to smile." },
      { id: 3, text: "May you have people who genuinely value you." },
      { id: 4, text: "May your plans become achievements." },
      { id: 5, text: "May you become the person you've always wanted to be." },
      { id: 6, text: "May this year bring you unexpected happiness." }
    ],
    buttonText: "To The Secret Chamber 🔮"
  },

  // 9. SCREEN 8: SECRET CHAMBER
  chamber: {
    title: "There's One Final Secret...",
    bannerQuote: "SOMETIMES\nTHE BEST\nSURPRISES\nARE THE ONES\nYOU NEVER\nSEE COMING.",
    buttonText: "Open The Chamber 🔮",
    surpriseTitle: "YOU DESERVE A LITTLE MAGIC TOO. ✨",
    surpriseSubtitle: "Happy Birthday, {friendName}! ❤️",
    proceedText: "The Final Chapter 🏰"
  },

  // 10. SCREEN 9: FINAL PAGE
  finale: {
    poem: [
      "Every story has chapters.",
      "Today, you begin another one.",
      "Make this chapter beautiful."
    ],
    title: "Happy Birthday, {friendName}! ❤️",
    bannerText: "SAME MAGIC, BRIGHTER YOU",
    footer: "Made with ❤️ and a little bit of magic by {yourName}",
    replayText: "Replay The Magic 🔄",
    letterText: "Open The Letter Again ✉️"
  },

  // AUDIO & ATMOSPHERE
  audio: {
    customMusicUrl: "",
    defaultVolume: 0.65,
    soundEffects: true
  }
};
