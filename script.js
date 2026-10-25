
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const screens = $$(".screen");
const music = $("#background-music");
const musicToggle = $("#music-toggle");

/* -------------------- PAGE NAVIGATION -------------------- */

function goToScreen(screenId) {
  const target = document.getElementById(screenId);
  if (!target) return;

  screens.forEach(screen => screen.classList.remove("active"));
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (screenId === "welcome-screen") {
    const photo = $(".anniversary-main-photo");
    if (photo) {
      photo.style.animation = "none";
      void photo.offsetWidth;
      photo.style.animation = "";
    }
  }
}

$$("[data-go]").forEach(button => {
  button.addEventListener("click", () => goToScreen(button.dataset.go));
});

/* -------------------- ENVELOPE + MUSIC -------------------- */

$("#open-envelope")?.addEventListener("click", async () => {
  const envelope = $(".envelope");
  envelope?.classList.add("open");

  try {
    await music?.play();
    musicToggle?.classList.add("playing");
    if (musicToggle) musicToggle.textContent = "♫ Pause music";
  } catch {
    musicToggle?.classList.remove("playing");
    if (musicToggle) musicToggle.textContent = "♫ Play music";
  }

  setTimeout(() => goToScreen("welcome-screen"), 900);
});

musicToggle?.addEventListener("click", async () => {
  if (!music) return;

  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫ Pause music";
    } catch {
      musicToggle.textContent = "♫ Music unavailable";
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♫ Play music";
  }
});

music?.addEventListener("error", () => {
  if (musicToggle) {
    musicToggle.title = "Add rathinamo.mp3 to assets/audio to play music.";
  }
});

/* -------------------- PHOTO FALLBACKS -------------------- */

const anniversaryImage = $(".anniversary-main-photo");
const anniversaryFallback = $("#anniversary-photo-fallback");

if (anniversaryImage) {
  anniversaryImage.addEventListener("error", () => {
    anniversaryImage.style.display = "none";
    anniversaryFallback?.classList.remove("hidden");
  });

  anniversaryImage.addEventListener("load", () => {
    anniversaryImage.style.display = "block";
    anniversaryFallback?.classList.add("hidden");
  });
}

$$(".polaroid img").forEach(image => {
  image.addEventListener("error", () => {
    image.style.display = "none";

    if (!image.parentElement.querySelector(".photo-missing-message")) {
      const message = document.createElement("p");
      message.className = "soft-text photo-missing-message";
      message.textContent =
        "Photo missing — check this filename in assets/photos.";
      image.parentElement.insertBefore(message, image.nextSibling);
    }
  });
});

/* -------------------- FLOATING HEARTS -------------------- */

const heartsLayer = $("#hearts-layer");
const floatingEmojis = ["♡", "💗", "💕", "✧", "🤎", "🌷"];

function createFloatingHeart() {
  if (!heartsLayer) return;

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent =
    floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;

  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 8500);
}

if (heartsLayer) {
  setInterval(createFloatingHeart, 1300);
}

/* -------------------- OPEN-WHEN LETTERS -------------------- */

const letters = [
  {
    title: "Open When You Miss Me 🥹",
    subtitle: "For the moments you wish I were there",
    messages: [
      "Kunjumaniiiii, distance irundhaalum en heart eppovume un koodathaan irukku. Kannu moodi imagine pannu… naan un pakkathula vandhu hug panren. 🫂🩷",
      "Hey my boy, enna miss panriya? Naanum unna miss panren da. Oru naal indha missing ellam namma serndhu irukkura memories-ah maarum. Until then, keep my love close. 🌙💗",
      "Un voice kekkanum pola irukka? Enna ninaichu oru chinna smile pannu. Unna hug panna mudiyala naalum, indha letter-la oru thousand hugs anuppuren. 🧸💋",
      "Enakuu nii venum d… enna distance vandhaalum, en manasu un pakkam thaan varum. Nee en favourite place, my safe feeling, my home. 🥹🏡❤️",
      "Imagine naan un shoulder-la saanjitu irukken. No big talks, no worries… just us. Seekiram andha hug-ah nijathula kudukkanum, my love. 🫂🌷"
    ]
  },
  {
    title: "Open When You're Sad 🌧️",
    subtitle: "A little reminder that you're loved",
    messages: [
      "My boy, ellaa naalum strong-ah irukkanum nu avasiyam illa. Tired-ah irundha rest edu. Naan unna un best days-ku mattum love pannala. 🩷🫶🏻",
      "Indha bad day un whole life illa da. Konjam breathe pannu, water kudu, slow-ah iru. Unna nambi irukkura oru ponnu inga irukka — un Shrii. 🌷🤍",
      "Un smile enakku romba precious. Aana nee sad-ah irundhaalum, silent-ah irundhaalum, un feelings-ku space irukku. I am rooting for you, always. 🥹✨",
      "Come here, imaginary hug time! 🫂 Nee ellathayum ore naal-la solve panna vendam. One small step at a time, my brave boy. ❤️‍🩹"
    ]
  },
  {
    title: "Open When You're Angry 😤",
    subtitle: "Before we turn a small fight into a big one",
    messages: [
      "Kunjumani, kovam irukkumbodhu konjam pause pannalaam. Namma rendu perum oru team da; problem namakku opposite side-la irukkanum, naam rendu perum opposite sides-la illa. 🫶🏻❤️",
      "Enna hurt aagirundhaalum, un feelings sollu. Naan purinjukka try panren. Namma rendu perum calm aana apram pesalaam, my boy. 🩷🌿",
      "Sanda pottalum unnodathaan… aana sanda mudinja apram sorry sollavum, hug pannavum marakka koodaadhu. Deal ah? 🥹🤝💋",
      "One deep breath for you, one imaginary kiss from me. 😚 Kovam konjam kuranja apram, namma love-a nyabagam pannitu pesalaam. 🌷"
    ]
  },
  {
    title: "Open When You Doubt Yourself 🥺",
    subtitle: "A note for your difficult days",
    messages: [
      "Try harder and comeback stronger, my boyyy 🥹💋 Nee ippo enga irundhaalum, un effort-ku value irukku. Naan un growth-ah paathu proud-ah iruppen. 🌟",
      "Nee perfect-ah irukkanum nu naan expect pannala. Learn pannu, mistakes pannu, thirumba try pannu. Un mela unakku nambikkai koranjaalum, konjam en nambikkai borrow pannikko. 🤍🫶🏻",
      "Un journey-a vera yaarodavum compare pannaadha. Un pace-la po. Small progress-um progress thaan, my Kunjumani. 🌱💗",
      "One day nee thirumbi paathu, 'naan give up pannala' nu proud-ah solluva. Andha day varaikkum, keep going da. I believe in you. 🥹🏆"
    ]
  },
  {
    title: "Open When You Can't Sleep 🌙",
    subtitle: "A tiny goodnight hug",
    messages: [
      "Phone-ah konjam side-la vechitu, eyes close pannu. Slow-ah breathe in… breathe out. Innaiku mudinja alavukku nee pannita. Rest eduthuko, my love. 🌙🩷",
      "Goodnight, en chellam. Naan un pakkathula irundha un forehead-la kiss kuduthu, blanket cover panni thoonga solliruppen. Imagine that hug. 😚🧸",
      "Tomorrow is a fresh page, da. Innaiku worries ellam konjam neram rest edukattum. Sweet dreams, my favourite human. ✨🤍",
      "Un dreams-la naan vandha, complaint panna koodaadhu! 😂🩷 I hope your sleep is peaceful and your heart feels safe. Goodnight, papaaa. 🌙💋"
    ]
  },
  {
    title: "Open When You Need Motivation 🔥",
    subtitle: "Your personal cheerleader is here",
    messages: [
      "Stand up, shoulders straight, one task at a time. Un future self unakku thanks sollum. Start small, but start today, my boy. 🔥💪🏻",
      "Un dreams-ku nee deserve panra effort kudu. Slow days okay; stop pannidradhu mattum thevai illa. I am cheering for you always. 🏆🩷",
      "Nee already evlo things overcome pannirukka nu nyabagam pannu. Intha challenge-um oru chapter thaan, whole story illa. 🌟📖",
      "Come on, my fighter! One small win ippo. Adhukku apram next one. Namma celebrate panna oru naal varum. 🥹🎉❤️"
    ]
  },
  {
    title: "Open When You Want a Kiss 💋",
    subtitle: "A little kiss delivery",
    messages: [
      "Mwaaaaaah 💋💋💋 Idhu normal kiss illa da, extra clingy Shrii kiss! Innum venumna, real life-la vandhu collect pannikko. 😂🩷",
      "Forehead kiss 🤍, cheek kiss 😚, nose kiss 🥹, and one big hug 🫂. Delivery completed, my Kunjumaniiiii!",
      "Unakku oru kiss, unakku oru hug, unakku endless love. Ippo smile pannu paapom! 😚💗✨",
      "Kiss count: infinity ♾️💋 Reason: nee en favourite human. Expiry date: never. From: your Shrii, with extra love. 💌🩷"
    ]
  },
  {
    title: "Open When You Miss Our Memories 📸",
    subtitle: "Let's travel back for a moment",
    messages: [
      "Annul Melae, andha Snapchat caption, namma beginning… adhellam ninaicha innum cute-ah irukku. Namma story-la enakku favourite part nee thaan. 🥹🖤",
      "October 20, 2024 — chinna chinna moments epdi ivlo special aayiduchu paaru. Oru naal namma old memories ellam ukkandhu pesi sirippom. 🌷📸",
      "First call-la un voice kekka naan evlo excited-ah irundhen nu unakku theriyuma? Andha feeling-a marakka mudiyadhu da. 🫶🏻☎️",
      "Namma photos paatha oru thing puriyum — perfect moments thevai illa, namma rendu perum irundha podhum. More memories loading… ♾️💗"
    ]
  },
  {
    title: "Open When You Need Reassurance 🤍",
    subtitle: "Read this slowly, my love",
    messages: [
      "Namma rendu perum different-ah feel pannalaam, different-ah think pannalaam. Aana honest-ah pesi, oruthara oruthar understand panna try pannalaam. Nee enakku important. 🤍🫂",
      "Unakku bad day irundhaalum, un value koraiyaadhu. Namma relationship-la perfect-ah irukkanum nu illa; caring-ah, honest-ah irundha podhum. 🩷🌿",
      "Enakuu nii venum d… adhu oru cute line mattum illa. Namma rendu perum effort pottu, respect-oda love-a build pannuvom. 🥹❤️",
      "Nee loved, nee valued, nee important. Idha oru naal mattum illa, unakku thevai padumbodhellam nyabagam vechikko. From your Shrii. 💌🫶🏻"
    ]
  },
  {
    title: "Open When You Need to Smile 😂",
    subtitle: "Officially silly love time",
    messages: [
      "Nee enna irritate pannuva, naan unna irritate pannuven, rendu perum kovapaduvom… apram yaar first sirippaanga nu competition! 😂🩷",
      "Breaking news: One very handsome boy has been permanently selected as one very clingy girl's favourite human. No returns, no exchanges. 📰💋",
      "Nee enakku romba pudikkum da. Aana sometimes un face paatha tease panna thonum. Idhuvum love-oda oru department thaan. 😂🫶🏻",
      "If being dramatic about you was a subject, naan university topper! 🏆😂 I love you, my Kunjumaniiiii. Now smile, pleaseee. 💗"
    ]
  }
];

const lettersList = $("#letters-list");
const letterContent = $("#letter-content");
const letterTitle = $("#letter-title");
const letterBody = $("#letter-body");
const letterKicker = $("#letter-kicker");
const letterProgress = $("#letter-progress");

const usedMessages = letters.map(() => new Set());

function getFreshMessage(letterIndex) {
  const letter = letters[letterIndex];
  const used = usedMessages[letterIndex];

  if (used.size >= letter.messages.length) used.clear();

  const available = letter.messages
    .map((message, index) => ({ message, index }))
    .filter(item => !used.has(item.index));

  const chosen = available[Math.floor(Math.random() * available.length)];
  used.add(chosen.index);

  return {
    message: chosen.message,
    remaining: letter.messages.length - used.size,
    total: letter.messages.length
  };
}

if (lettersList) {
  letters.forEach((letter, index) => {
    const button = document.createElement("button");
    button.className = "letter-choice";
    button.innerHTML = `${letter.title}<span>${letter.subtitle}</span>`;

    button.addEventListener("click", () => {
      const fresh = getFreshMessage(index);

      if (letterTitle) letterTitle.textContent = letter.title;
      if (letterBody) letterBody.textContent = fresh.message;
      if (letterKicker) letterKicker.textContent = "A FRESH NOTE FROM SHRII 💌";

      if (letterProgress) {
        letterProgress.textContent =
          `${fresh.remaining} fresh message${fresh.remaining === 1 ? "" : "s"} left in this letter before its messages reset.`;
      }

      letterContent?.classList.remove("hidden");
      letterContent?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    lettersList.appendChild(button);
  });
}

$("#close-letter")?.addEventListener("click", () => {
  letterContent?.classList.add("hidden");
});

/* -------------------- 100 REASONS TO LOVE YOU -------------------- */

const reasons = [
  "Because your smile makes my heart feel at home. 🥹🩷",
  "Because you are my favourite person to annoy. 😂💋",
  "Because your voice can make an ordinary day special. 🎧💕",
  "Because I love the way you hold me close. 🫂❤️",
  "Because being silly with you feels so natural. 🤭🌷",
  "Because you have become part of my favourite memories. 📸💗",
  "Because I can imagine a thousand little moments with you. ♾️🩷",
  "Because you make me want to keep choosing love. 🫶🏻💌",
  "Because your hugs are my favourite kind of comfort. 🧸🤍",
  "Because even our random conversations mean something to me. 💬💕",
  "Because you make me laugh when I least expect it. 😂💞",
  "Because I love learning new things about you. 🌱💗",
  "Because I like hearing you talk about what you love. 🥹🎧",
  "Because you are my favourite notification. 📱💘",
  "Because I love the little expressions on your face. 🤭🩷",
  "Because we have memories only we truly understand. 🔐💗",
  "Because I want to celebrate your little wins with you. 🏆🌷",
  "Because I want to encourage you when things get difficult. 💪🏻❤️",
  "Because I love your presence, not just your pictures. 📸🫶🏻",
  "Because I still get happy thinking about our beginning. 🥹🖤",
  "Because you make ordinary places feel memorable. 🌿💕",
  "Because I love our inside jokes. 😂🔐",
  "Because I want to make more memories with you. 📷💞",
  "Because I love the way we can be goofy together. 🤪🩷",
  "Because you are the person behind so many of my smiles. 😊💗",
  "Because I want to listen when you need to talk. 👂🏻🤍",
  "Because I want to understand you better every day. 🫶🏻🌷",
  "Because I love sharing songs that remind me of you. 🎶💋",
  "Because Annul Melae will always remind me of our beginning. 🎧🖤",
  "Because you are woven into a very special chapter of my life. 📖💘",
  "Because I love seeing you happy. 🥹🌸",
  "Because I want us to be able to laugh after a silly fight. 😂🫂",
  "Because I want us to learn how to communicate better. 💬🤍",
  "Because I love making little surprises for you. 🎁💗",
  "Because I want to be proud of your growth. 🌱🏆",
  "Because I want to grow as a person beside you. 🌷♾️",
  "Because I like your random little habits. 🤭💞",
  "Because your company makes time feel different. ⏳🩷",
  "Because I love our photographs together. 📸💕",
  "Because I want to keep creating stories we can retell. 📚💌",
  "Because I love your playful side. 😂💗",
  "Because I want to be honest with you. 🤍🫶🏻",
  "Because I value the trust we build together. 🔐❤️",
  "Because I want us to respect each other's feelings. 🌷🤍",
  "Because I love the little things you do that make me smile. 🥹💞",
  "Because I can be dramatic and still feel like myself. 😂🎀",
  "Because you have a special place in my heart. 💗🗝️",
  "Because I love remembering how everything began. 🖤📖",
  "Because I want our relationship to keep learning and growing. 🌱♾️",
  "Because I love the way a simple message can brighten my day. 💬💘",
  "Because I want to celebrate more anniversaries with you. 🎂🩷",
  "Because I love sharing little dreams with you. ☁️💗",
  "Because I want to support your goals without losing my own. 🌟🫶🏻",
  "Because I want our love to feel safe and kind. 🏡🤍",
  "Because I love when we make each other laugh. 😂💋",
  "Because I want us to apologise when we are wrong. 🫂🌷",
  "Because I want to keep choosing patience with you. 🩷🌿",
  "Because I love the memories that make us smile for no reason. 🥹📸",
  "Because I want our little world to keep getting bigger. 🌍💞",
  "Because you inspire so many sweet thoughts in me. 💭💗",
  "Because I love the idea of one more hug from you. 🫂💋",
  "Because I want to cheer for you when you doubt yourself. 📣❤️",
  "Because I love when we are comfortable being quiet together. 🌙🤍",
  "Because I want us to be a team, even during disagreements. 🤝💕",
  "Because I love your laugh. 😂🩷",
  "Because I want to keep learning your favourite things. 🎶🌷",
  "Because I love making little plans for us. 🗓️💘",
  "Because I want to protect the good memories we create. 🧸🔐",
  "Because I love how a picture can take me back to a moment. 📸🥹",
  "Because I want to celebrate your efforts, not just the results. 🏆🌱",
  "Because I love your company on ordinary days. ☁️💕",
  "Because I want us to be able to talk about hard things too. 💬🤍",
  "Because I love giving you silly nicknames. 😂💋",
  "Because Kunjumaniiiii is one of my favourite words. 🥹🩷",
  "Because I want to make you feel appreciated. 💌🌷",
  "Because I love the feeling of holding your hand. 🤝💗",
  "Because I want our trust to grow stronger. 🔐❤️",
  "Because I love sharing happy news with you. 🎉💕",
  "Because I want to keep making time for us. ⏳🫶🏻",
  "Because I love the tiny details I notice about you. 👀💞",
  "Because I want us to be gentle with each other on hard days. 🌧️🤍",
  "Because I love the memories we have yet to make. ✨📖",
  "Because I want to see you proud of yourself. 🥹🏆",
  "Because I love that we can create our own little traditions. 🎀💗",
  "Because I want to keep being curious about you. 🌷💭",
  "Because I love the comfort of a familiar hug. 🫂🤍",
  "Because I want us to keep choosing respect. 🤝💕",
  "Because I love the silly stories we can tell later. 😂📸",
  "Because I want to celebrate how far we've come. 🎉♾️",
  "Because I love when you share your thoughts with me. 💬🩷",
  "Because I want our love to include friendship too. 🧸💗",
  "Because I love having someone to make memories with. 📷🌷",
  "Because I want to be someone who listens to you. 👂🏻🤍",
  "Because I love the warmth of your presence. ☀️💕",
  "Because I want us to keep finding reasons to smile. 😊💘",
  "Because I love the little world we are building. 🌍🩷",
  "Because I want to keep showing up with care. 🫶🏻🌱",
  "Because our story is still being written. 📖✨",
  "Because there are still so many songs to share. 🎶💋",
  "Because there are still so many pictures to take. 📸💕",
  "Because there are still so many hugs waiting for us. 🫂💗",
  "Because after all these reasons, my heart still has more to say. 🥹💌",
  "Because you are my Kunjumaniiiii, and this is our little world. ♾️🩷"
];

const reasonCard = $("#reason-card");
const reasonCounter = $("#reason-counter");
const reasonText = $("#love-reason");
const reasonEmojis = $("#reason-back-emojis");
const nextReasonButton = $("#next-reason");

let reasonIndex = 0;

function showReason(index) {
  if (!reasonCard || !reasonCounter || !reasonText) return;

  reasonIndex = index;
  reasonCard.classList.remove("flipped");

  reasonCounter.textContent =
    `LOVE NOTE ${String(index + 1).padStart(2, "0")} / ${reasons.length}`;

  reasonText.textContent = reasons[index];

  const emojiSets = [
    "🥹🩷🫶🏻", "💋🌷💕", "🧸💌✨", "❤️‍🔥🫂💗",
    "🌙🤍💞", "🎀🥰💘", "🌸💖♾️", "💌😘🌷"
  ];

  if (reasonEmojis) {
    reasonEmojis.textContent = emojiSets[index % emojiSets.length];
  }
}

reasonCard?.addEventListener("click", () => {
  reasonCard.classList.toggle("flipped");
});

nextReasonButton?.addEventListener("click", () => {
  showReason((reasonIndex + 1) % reasons.length);
});

showReason(0);

/* -------------------- THREE-LEVEL HEART GAME -------------------- */

const gameInstructions = $("#game-instructions");
const gameTitle = $("#game-title");
const gameScore = $("#game-score");
const gameItems = $("#game-items");
const startLevelButton = $("#start-level");
const gameActionButton = $("#game-action");
const boyCharacter = $("#boy-character");
const girlCharacter = $("#girl-character");
const gameArena = $("#game-arena");
const gameHugSprite = $("#game-hug-sprite");

const levels = [
  {
    title: "Level 1 — Come Find Me 🥹",
    instruction: "Catch 3 hearts to start making up!",
    goal: 3,
    button: "Start Level 1 💗"
  },
  {
    title: "Level 2 — Come Catch Me 😂",
    instruction: "Find and catch 5 hearts to make up!",
    goal: 5,
    button: "Start Level 2 💞"
  },
  {
    title: "Level 3 — No More Fighting 🫂",
    instruction: "Catch 7 hearts and run back to each other!",
    goal: 7,
    button: "Start Level 3 ❤️"
  }
];

let currentLevel = 0;
let caughtHearts = 0;
let levelRunning = false;

function updateGameText() {
  if (!levels[currentLevel]) return;

  if (gameTitle) gameTitle.textContent = levels[currentLevel].title;
  if (gameInstructions) gameInstructions.textContent = levels[currentLevel].instruction;

  const levelLabel = $("#level-label");
  if (levelLabel) levelLabel.textContent = `LEVEL ${currentLevel + 1} OF 3`;

  if (gameScore) {
    gameScore.textContent =
      `Hearts: ${caughtHearts} / ${levels[currentLevel].goal}`;
  }

  if (startLevelButton) {
    startLevelButton.textContent = levels[currentLevel].button;
  }

  gameArena?.classList.remove("level-1", "level-2", "level-3", "hugging");
  gameArena?.classList.add(`level-${currentLevel + 1}`);
}

function spawnGameHeart() {
  if (!gameItems || !gameItems.parentElement) return;

  const heart = document.createElement("button");
  heart.className = "game-heart";
  heart.type = "button";
  heart.textContent = ["💗", "💖", "💘", "💕", "🤎"][
    Math.floor(Math.random() * 5)
  ];
  heart.setAttribute("aria-label", "Catch this heart");

  const arena = gameItems.parentElement;
  const maxX = Math.max(0, arena.clientWidth - 65);
  const maxY = Math.max(0, arena.clientHeight - 125);

  heart.style.left = `${20 + Math.random() * Math.max(10, maxX - 20)}px`;
  heart.style.top = `${15 + Math.random() * Math.max(10, maxY - 15)}px`;

  heart.addEventListener("click", () => {
    if (!levelRunning) return;

    heart.remove();
    caughtHearts++;

    if (gameScore) {
      gameScore.textContent =
        `Hearts: ${caughtHearts} / ${levels[currentLevel].goal}`;
    }

    if (caughtHearts >= levels[currentLevel].goal) {
      completeLevel();
    } else {
      spawnGameHeart();
    }
  });

  gameItems.appendChild(heart);
}

function startLevel() {
  levelRunning = true;
  caughtHearts = 0;

  gameItems?.replaceChildren();
  startLevelButton?.classList.add("hidden");
  gameActionButton?.classList.add("hidden");

  boyCharacter?.classList.remove("hidden");
  girlCharacter?.classList.remove("hidden");
  gameHugSprite?.classList.add("hidden");
  gameArena?.classList.remove("hugging");

  updateGameText();
  spawnGameHeart();
}

function completeLevel() {
  levelRunning = false;
  gameItems?.replaceChildren();

  if (gameInstructions) {
    if (currentLevel === 0) {
      gameInstructions.textContent =
        "You found each other! Now catch more hearts and make up. 🥹";
    } else if (currentLevel === 1) {
      gameInstructions.textContent =
        "Okay, okay… the fight is almost over! One last challenge. 😂💗";
    } else {
      gameInstructions.textContent =
        "All 3 levels complete! Ippo rendu perum final screen-la odi poi hug pannuvaanga. 🥹🫂";
    }
  }

  startLevelButton?.classList.add("hidden");
  gameActionButton?.classList.remove("hidden");

  if (gameActionButton) {
    gameActionButton.textContent =
      currentLevel === 2 ? "Run back to me 🫂" : "Next Challenge ✨";
  }
}

startLevelButton?.addEventListener("click", startLevel);

gameActionButton?.addEventListener("click", () => {
  if (currentLevel < 2) {
    currentLevel++;
    caughtHearts = 0;
    updateGameText();
    startLevelButton?.classList.remove("hidden");
    gameActionButton?.classList.add("hidden");
  } else {
    startFinalReunion();
  }
});

/* -------------------- FINAL REUNION -------------------- */

function startFinalReunion() {
  const stage = $("#reunion-stage");
  const vicky = $("#final-vicky-running");
  const shrii = $("#final-shrii-running");
  const hug = $("#final-hug-image");
  const message = $("#final-love-message");
  const finalScreen = $("#final-screen");

  if (!stage || !finalScreen) return;

  stage.classList.remove("reunion-happening", "reunion-hugged");
  finalScreen.classList.remove("final-contact-visible");

  vicky?.classList.remove("hidden");
  shrii?.classList.remove("hidden");
  hug?.classList.add("hidden");
  message?.classList.add("hidden");

  goToScreen("final-screen");
  void stage.offsetWidth;
  stage.classList.add("reunion-happening");
  launchFireworks();

  window.setTimeout(() => {
    vicky?.classList.add("hidden");
    shrii?.classList.add("hidden");
    hug?.classList.remove("hidden");

    stage.classList.remove("reunion-happening");
    stage.classList.add("reunion-hugged");

    message?.classList.remove("hidden");
    message?.classList.add("message-reveal");
    finalScreen.classList.add("final-contact-visible");

    const contact = $("#final-contact");
    if (contact) {
      contact.style.opacity = "1";
      contact.style.visibility = "visible";
    }

    launchFireworks();
  }, 1850);
}

updateGameText();

/* -------------------- FINALE FIREWORKS -------------------- */

const fireworks = $("#fireworks");
const fireworksButton = $("#fireworks-button");

function launchFireworks() {
  if (!fireworks) return;

  const partyEmojis = ["🎆", "✨", "💖", "💗", "💕", "🎇", "💋"];

  for (let i = 0; i < 24; i++) {
    const spark = document.createElement("span");
    spark.className = "firework";
    spark.textContent =
      partyEmojis[Math.floor(Math.random() * partyEmojis.length)];

    spark.style.left = `${5 + Math.random() * 90}%`;
    spark.style.top = `${10 + Math.random() * 75}%`;
    spark.style.fontSize = `${18 + Math.random() * 22}px`;
    spark.style.animationDelay = `${Math.random() * 0.8}s`;

    fireworks.appendChild(spark);
    setTimeout(() => spark.remove(), 2500);
  }
}

fireworksButton?.addEventListener("click", () => {
  launchFireworks();
  launchFireworks();

  const message = $("#final-love-message");
  if (message && !message.classList.contains("hidden")) {
    message.classList.remove("message-reveal");
    void message.offsetWidth;
    message.classList.add("message-reveal");
  }

  const finalScreen = $("#final-screen");
  const contact = $("#final-contact");

  finalScreen?.classList.add("final-contact-visible");

  if (contact) {
    contact.style.opacity = "1";
    contact.style.visibility = "visible";

    window.setTimeout(() => {
      contact.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }
});

/* -------------------- ANNIVERSARY MESSAGE CONTACT -------------------- */

const yourWhatsAppNumber = "919344551674";
const yourInstagramUsername = "draft_gurl_.x";
const messageBox = $("#his-message");

$("#send-whatsapp")?.addEventListener("click", () => {
  const message = messageBox?.value.trim();

  if (!message) {
    alert("First un message type pannu da 🤎");
    messageBox?.focus();
    return;
  }

  if (!/^\d{8,15}$/.test(yourWhatsAppNumber)) {
    alert("Check the WhatsApp number in script.js.");
    return;
  }

  window.open(
    `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

$("#open-instagram")?.addEventListener("click", async () => {
  const message = messageBox?.value.trim();

  if (!message) {
    alert("First un message type pannu da 💌");
    messageBox?.focus();
    return;
  }

  try {
    await navigator.clipboard.writeText(message);
    alert("Message copied! Instagram chat-la paste panni send pannu 🤎");
  } catch {
    alert("Instagram open aagum. Message-ah copy panni chat-la paste pannu.");
  }

  window.open(
    `https://www.instagram.com/${encodeURIComponent(yourInstagramUsername)}/`,
    "_blank",
    "noopener,noreferrer"
  );
});

/* -------------------- STARTUP -------------------- */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);
goToScreen("envelope-screen");

/* -------------------- VOICE NOTE RECORDER -------------------- */

const recordVoiceButton = $("#record-voice");
const stopVoiceButton = $("#stop-voice");
const voiceStatus = $("#voice-status");
const voicePlayback = $("#voice-playback");
const downloadVoice = $("#download-voice");
const recordAgainButton = $("#record-again");

let voiceRecorder = null;
let voiceChunks = [];
let voiceStream = null;
let voiceObjectUrl = null;

recordVoiceButton?.addEventListener("click", async () => {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    if (voiceStatus) {
      voiceStatus.textContent =
        "This browser doesn't support recording. Try a recent version of Chrome or Edge, da. ♡";
    }
    return;
  }

  try {
    voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    voiceChunks = [];

    const preferredType = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4"
    ].find(type => MediaRecorder.isTypeSupported?.(type));

    voiceRecorder = preferredType
      ? new MediaRecorder(voiceStream, { mimeType: preferredType })
      : new MediaRecorder(voiceStream);

    voiceRecorder.addEventListener("dataavailable", event => {
      if (event.data?.size) voiceChunks.push(event.data);
    });

    voiceRecorder.addEventListener("stop", () => {
      const blob = new Blob(voiceChunks, {
        type: voiceRecorder?.mimeType || "audio/webm"
      });

      if (voiceObjectUrl) URL.revokeObjectURL(voiceObjectUrl);
      voiceObjectUrl = URL.createObjectURL(blob);

      if (voicePlayback) {
        voicePlayback.src = voiceObjectUrl;
        voicePlayback.classList.remove("hidden");
      }

      if (downloadVoice) {
        downloadVoice.href = voiceObjectUrl;
        downloadVoice.download =
          `shrii-voice-note-${new Date().toISOString().slice(0, 10)}.${blob.type.includes("mp4") ? "mp4" : "webm"}`;
        downloadVoice.classList.remove("hidden");
      }

      recordAgainButton?.classList.remove("hidden");

      if (voiceStatus) {
        voiceStatus.textContent =
          "Your little voice note is ready, my love. Listen to it or download it. 🤎";
      }

      if (recordVoiceButton) recordVoiceButton.disabled = false;
      if (stopVoiceButton) stopVoiceButton.disabled = true;

      voiceStream?.getTracks().forEach(track => track.stop());
      voiceStream = null;
    });

    voiceRecorder.start();

    if (recordVoiceButton) recordVoiceButton.disabled = true;
    if (stopVoiceButton) stopVoiceButton.disabled = false;

    if (voiceStatus) {
      voiceStatus.textContent = "Recording… speak from your heart, my boy. 🔴";
    }
  } catch (error) {
    if (voiceStatus) {
      voiceStatus.textContent =
        error?.name === "NotAllowedError"
          ? "Microphone permission was blocked. Allow microphone access in your browser settings and try again. ♡"
          : "Couldn't start recording. Check your microphone and try again. ♡";
    }

    voiceStream?.getTracks().forEach(track => track.stop());
    voiceStream = null;

    if (recordVoiceButton) recordVoiceButton.disabled = false;
    if (stopVoiceButton) stopVoiceButton.disabled = true;
  }
});

stopVoiceButton?.addEventListener("click", () => {
  if (voiceRecorder && voiceRecorder.state !== "inactive") {
    voiceRecorder.stop();
    if (voiceStatus) voiceStatus.textContent = "Saving your voice note… ♡";
  }
});

recordAgainButton?.addEventListener("click", () => {
  if (voiceObjectUrl) URL.revokeObjectURL(voiceObjectUrl);
  voiceObjectUrl = null;

  voicePlayback?.pause();
  voicePlayback?.removeAttribute("src");
  voicePlayback?.classList.add("hidden");

  downloadVoice?.removeAttribute("href");
  downloadVoice?.classList.add("hidden");
  recordAgainButton.classList.add("hidden");

  if (voiceStatus) voiceStatus.textContent = "Ready when you are, my boy ♡";
});

/* -------------------- HOW WELL DO YOU KNOW YOUR GIRL? -------------------- */

const quizQuestions = [
  {
    q: "How did our little love story begin? 🥹🖤",
    options: [
      "You sent me a Snapchat with 'Annul Melae' and that cute caption",
      "We met at college",
      "I replied to your Instagram story",
      "Our friend introduced us"
    ],
    answer: 0,
    note: "Manifesting a love life like this 🥹🖤 — that little Snapchat became the beginning of us!"
  },
  {
    q: "What is the date our relationship began? 📅❤️",
    options: [
      "20 October 2024",
      "26 October 2024",
      "26 October 2025",
      "14 February 2025"
    ],
    answer: 1,
    note: "26.10.2024 — the date our little world began. ♾️🤎"
  },
  {
    q: "When I first asked you to call me, what did I want most? ☎️🥹",
    options: [
      "To ask you for a favour",
      "To talk about college",
      "To hear your voice",
      "To ask you about a song"
    ],
    answer: 2,
    note: "I just wanted to hear your voice, my Kunjumaniiiii. That little memory is so special to me. 🥹💗"
  },
  {
    q: "When we disagree, what should we always remember? 🫂",
    options: [
      "One of us must always win",
      "We should ignore each other",
      "We are a team, and the problem is what we face together",
      "We should stay angry"
    ],
    answer: 2,
    note: "Namma rendu perum oru team da. The problem is against us, not us against each other. 🤎🫶🏻"
  },
  {
    q: "What do I appreciate about you, even when you're feeling down? 🥹❤️",
    options: [
      "You keep trying and putting in effort",
      "You pretend nothing is wrong",
      "You never make mistakes",
      "You always have everything figured out"
    ],
    answer: 0,
    note: "Even when you're down, you still try so hard. I notice that effort, my boy, and I'm proud of you. 🥹🌷"
  },
  {
    q: "What does '730 days, still you' mean to me? 💌♾️",
    options: [
      "I only remember our anniversary",
      "Two years of choosing each other and continuing our story",
      "We never have disagreements",
      "It's just a cute website title"
    ],
    answer: 1,
    note: "730 days of us — and my heart still chooses you, my Vicky. ❤️‍🔥"
  },
  {
    q: "After one of our silly fights, what ending do I want? 😂💋",
    options: [
      "A competition to see who stays angry longer",
      "To pretend we don't care",
      "To make up, come back together and hug",
      "To delete every memory"
    ],
    answer: 2,
    note: "Sanda pottalum unnodathaan… kadaisila onnu serndhu hug pannikanum! 🫂💗"
  },
  {
    q: "What is the secret password to unlock our treasure? 🔐🤎",
    options: [
      "26102025",
      "VICKYSHRII",
      "26102024",
      "730DAYS"
    ],
    answer: 2,
    note: "26102024 — the date that started our story. Our little secret unlocked! 🔐❤️"
  }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuizQuestion() {
  const q = quizQuestions[quizIndex];
  if (!q) return;

  const progress = $("#quiz-progress");
  const question = $("#quiz-question");
  const feedback = $("#quiz-feedback");
  const optionsContainer = $("#quiz-options");
  const result = $("#quiz-result");
  const nextButton = $("#quiz-next");

  if (!progress || !question || !feedback || !optionsContainer || !nextButton) {
    console.warn("Quiz elements are missing from index.html.");
    return;
  }

  progress.textContent =
    `Question ${quizIndex + 1} of ${quizQuestions.length} · Score ${quizScore}`;

  question.textContent = q.q;
  feedback.textContent = "";
  optionsContainer.innerHTML = "";
  result?.classList.add("hidden");

  nextButton.classList.remove("hidden");
  nextButton.disabled = true;
  nextButton.textContent =
    quizIndex === quizQuestions.length - 1
      ? "See my result ♡"
      : "Next question →";

  quizAnswered = false;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (quizAnswered) return;

      quizAnswered = true;
      const correct = index === q.answer;
      if (correct) quizScore++;

      [...optionsContainer.children].forEach((item, i) => {
        item.disabled = true;

        if (i === q.answer) {
          item.classList.add("correct");
        } else if (i === index) {
          item.classList.add("incorrect");
        }
      });

      feedback.textContent = correct
        ? `Correct daaa! ${q.note}`
        : `Aiyooo, not quite 😭 ${q.note}`;

      progress.textContent =
        `Question ${quizIndex + 1} of ${quizQuestions.length} · Score ${quizScore}`;

      nextButton.disabled = false;
    });

    optionsContainer.appendChild(button);
  });
}

$("#quiz-next")?.addEventListener("click", () => {
  if (!quizAnswered) return;

  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuizQuestion();
    return;
  }

  const question = $("#quiz-question");
  const optionsContainer = $("#quiz-options");
  const feedback = $("#quiz-feedback");
  const nextButton = $("#quiz-next");
  const result = $("#quiz-result");
  const restartButton = $("#quiz-restart");

  if (question) question.textContent = "Your result is here, Kunjumaniiiii!";
  if (optionsContainer) optionsContainer.innerHTML = "";
  if (feedback) feedback.textContent = "";

  nextButton?.classList.add("hidden");
  result?.classList.remove("hidden");

  let scoreText;

  if (quizScore === quizQuestions.length) {
    scoreText =
      "FULL MARKS, MY BOYYYY! You know your girl so well. 1000 kisses for you. 😭💋";
  } else if (quizScore >= 6) {
    scoreText =
      "Awww, you know me pretty well da! Still, you have more little things to discover about me. 🤎";
  } else if (quizScore >= 3) {
    scoreText =
      "Not bad, boyyy! Looks like you need extra hugs and more time with your girl. 😂🫂";
  } else {
    scoreText =
      "Aiyaiyooo! Come sit with me, let's make more memories so you know me better. 🥹❤️";
  }

  if (result) {
    result.innerHTML = `
      <div class="quiz-score-big">${quizScore} / ${quizQuestions.length}</div>
      <p>${scoreText}</p>
      <p class="handwritten">The best answer will always be: choosing each other. ♡</p>
    `;
  }

  restartButton?.classList.remove("hidden");
});

$("#quiz-restart")?.addEventListener("click", () => {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;

  renderQuizQuestion();
  $("#quiz-restart")?.classList.add("hidden");
});

renderQuizQuestion();

/* -------------------- HIDDEN TREASURE HUNT -------------------- */

const treasureClues = [
  "Clue 1: The day our little forever began was 26 October 2024. Keep that date close. 🤎",
  "Clue 2: Your girl calls you Kunjumaniiiii… and she always finds her way back to you. 🫂",
  "Clue 3: Our secret code is the date written without dots or spaces. You know it, my boy. 🔐"
];

const foundTreasureClues = new Set();

$$(".treasure-heart").forEach(button => {
  button.addEventListener("click", () => {
    const clueIndex = Number(button.dataset.clue);

    if (
      !Number.isInteger(clueIndex) ||
      clueIndex < 0 ||
      clueIndex >= treasureClues.length ||
      foundTreasureClues.has(clueIndex)
    ) {
      return;
    }

    foundTreasureClues.add(clueIndex);
    button.classList.add("found");
    button.textContent = "♥";

    const clue = $("#treasure-clue");
    const progress = $("#treasure-progress");

    if (clue) clue.textContent = treasureClues[clueIndex];
    if (progress) {
      progress.textContent = `Clues found: ${foundTreasureClues.size} / 3`;
    }

    if (foundTreasureClues.size === 3) {
      if (clue) {
        clue.textContent =
          "All three clues found! Enter the date that started our story. ♡";
      }

      $("#treasure-lock")?.classList.remove("hidden");
      $("#treasure-password")?.focus();
    }
  });
});

$("#unlock-treasure")?.addEventListener("click", () => {
  const input = $("#treasure-password");
  if (!input) return;

  if (input.value.trim() === "26102024") {
    const feedback = $("#treasure-feedback");

    if (feedback) {
      feedback.textContent =
        "Unlocked! This little treasure was waiting only for you. ❤️";
    }

    $("#treasure-lock")?.classList.add("hidden");
    $("#treasure-reward")?.classList.remove("hidden");
    launchFireworks();
  } else {
    const feedback = $("#treasure-feedback");

    if (feedback) {
      feedback.textContent =
        "Not quite, my boy. Think of the date we began — DDMMYYYY. 🥹";
    }

    input.select();
  }
});

$("#treasure-password")?.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    $("#unlock-treasure")?.click();
  }
});

$("#treasure-final-button")?.addEventListener("click", () => {
  startFinalReunion();
});
