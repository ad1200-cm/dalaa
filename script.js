const pages = [...document.querySelectorAll('.page')];
const progressItems = [...document.querySelectorAll('.progress-item')];
const transitionOverlay = document.getElementById('pageTransition');
const sparkLayer = document.getElementById('sparkLayer');
const cursorGlow = document.getElementById('cursorGlow');
const storyButton = document.getElementById('storyButton');
const secretHeart = document.getElementById('secretHeart');
const secretOverlay = document.getElementById('secretOverlay');
const restartStory = document.getElementById('restartStory');
const envelope = document.getElementById('envelope');
const openLetterBtn = document.getElementById('openLetterBtn');
const letterPaper = document.getElementById('letterPaper');
const closeLetterBtn = document.getElementById('closeLetterBtn');
const morphNumber = document.getElementById('morphNumber');
const morphText = document.getElementById('morphText');
const morphSubtext = document.getElementById('morphSubtext');
const musicToggle = document.getElementById('musicToggle');

let currentPage = 0;
let animatedWelcome = false;
let letterOpened = false;
let yearMorphTimer = null;

const allHearts = ['♥', '❤', '♥', '❤'];

function showPage(index) {
  currentPage = index;

  pages.forEach((page, pageIndex) => {
    const active = pageIndex === index;
    page.classList.toggle('active', active);
  });

  progressItems.forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === index);
  });

  if (index === 4) {
    startYearMorph();
  } else {
    stopYearMorph();
  }
}

function triggerButtonExplosion() {
  if (!storyButton) return;

  storyButton.classList.add('is-pressed');
  storyButton.classList.add('has-glow');

  const rect = storyButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const heartBurst = document.createElement('div');
  heartBurst.className = 'glow-heart';
  heartBurst.textContent = '♥';
  heartBurst.style.left = `${centerX}px`;
  heartBurst.style.top = `${centerY}px`;
  heartBurst.style.position = 'fixed';
  heartBurst.style.zIndex = '40';
  sparkLayer.appendChild(heartBurst);

  setTimeout(() => {
    heartBurst.style.opacity = '1';
    heartBurst.style.transform = 'translate(-50%, -50%) scale(1.7)';
  }, 20);

  setTimeout(() => {
    makeHeartBurst(centerX, centerY, 34, 210);
    makeParticleBurst(centerX, centerY, 60, 160);
  }, 430);

  setTimeout(() => {
    spreadFloatingHearts(centerX, centerY, 30);
  }, 680);

  setTimeout(() => {
    transitionOverlay.classList.add('active');
  }, 1240);

  setTimeout(() => {
    showPage(1);
    transitionOverlay.classList.remove('active');
  }, 1860);
}

function makeHeartBurst(x, y, count, radius) {
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'heart-particle';
    particle.textContent = allHearts[i % allHearts.length];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.fontSize = `${(Math.random() * 1.8 + 0.9).toFixed(2)}rem`;

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const range = radius * (0.55 + Math.random() * 0.7);
    const dx = Math.cos(angle) * range;
    const dy = Math.sin(angle) * range;

    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    sparkLayer.appendChild(particle);

    setTimeout(() => particle.remove(), 2200);
  }
}

function makeParticleBurst(x, y, count, radius) {
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'red-dot';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8;
    const range = radius * (0.6 + Math.random() * 0.7);
    const dx = Math.cos(angle) * range;
    const dy = Math.sin(angle) * range;
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    sparkLayer.appendChild(particle);
    setTimeout(() => particle.remove(), 1900);
  }
}

function spreadFloatingHearts(x, y, count) {
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle-star';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8;
    const range = 110 + Math.random() * 160;
    const dx = Math.cos(angle) * range;
    const dy = Math.sin(angle) * range;
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    sparkLayer.appendChild(particle);
    setTimeout(() => particle.remove(), 1800);
  }
}

function startWelcomeSequence() {
  if (animatedWelcome) return;
  animatedWelcome = true;

  const textNodes = document.querySelectorAll('.fade-up, .story-line, .name-line, .main-title, .subtitle');
  textNodes.forEach((node) => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(18px)';
  });

  setTimeout(() => {
    document.querySelector('.story-line')?.classList.add('visible');
  }, 900);

  setTimeout(() => {
    const nameLine = document.querySelector('.name-line');
    if (nameLine) {
      nameLine.style.opacity = '1';
      nameLine.style.transform = 'translateY(0)';
    }
  }, 1800);

  setTimeout(() => {
    const title = document.querySelector('.main-title');
    if (title) {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }
  }, 2600);

  setTimeout(() => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }
  }, 3200);
}

function startYearMorph() {
  if (!morphNumber || !morphText || !morphSubtext) return;

  stopYearMorph();

  const steps = [
    { number: '2', text: 'سنتان', sub: '24 شهر' },
    { number: '2', text: 'سنتان', sub: '24 شهر' },
    { number: '2', text: 'سنتان', sub: '24 شهر' },
    { number: '2', text: 'سنتان', sub: '24 شهر' },
    { number: '2', text: 'سنتان', sub: '24 شهر' },
    { number: '2', text: 'سنتان', sub: '104 أسبوع' },
    { number: '2', text: 'سنتان', sub: '730+ يوم' }
  ];

  let i = 0;
  morphNumber.textContent = steps[0].number;
  morphText.textContent = steps[0].text;
  morphSubtext.textContent = steps[0].sub;

  yearMorphTimer = setInterval(() => {
    i = (i + 1) % steps.length;
    morphNumber.textContent = steps[i].number;
    morphText.textContent = steps[i].text;
    morphSubtext.textContent = steps[i].sub;

    morphNumber.style.opacity = '0';
    morphText.style.opacity = '0';
    morphSubtext.style.opacity = '0';

    setTimeout(() => {
      morphNumber.style.opacity = '1';
      morphText.style.opacity = '1';
      morphSubtext.style.opacity = '1';
    }, 60);
  }, 2000);
}

function stopYearMorph() {
  if (yearMorphTimer) {
    clearInterval(yearMorphTimer);
    yearMorphTimer = null;
  }
}

function setupMusicPlayer() {
  if (!musicToggle) return;

  const audio = new Audio('assets/music.mp3');
  audio.loop = true;
  audio.volume = 0.34;

  fetch('assets/music.mp3', { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) {
        musicToggle.style.opacity = '0.2';
        musicToggle.style.pointerEvents = 'none';
        musicToggle.title = 'الموسيقى غير متوفرة';
      }
    })
    .catch(() => {
      musicToggle.style.opacity = '0.2';
      musicToggle.style.pointerEvents = 'none';
      musicToggle.title = 'الموسيقى غير متوفرة';
    });

  musicToggle.addEventListener('click', async () => {
    const isMissing = musicToggle.style.pointerEvents === 'none';
    if (isMissing) return;

    try {
      if (audio.paused) {
        await audio.play();
        musicToggle.classList.add('playing');
      } else {
        audio.pause();
        musicToggle.classList.remove('playing');
      }
    } catch (error) {
      musicToggle.classList.remove('playing');
    }
  });
}

function openLetter() {
  if (letterOpened) return;
  letterOpened = true;

  envelope.style.transform = 'rotateX(60deg) translateY(-18px)';
  envelope.style.filter = 'blur(3px)';

  setTimeout(() => {
    letterPaper.classList.add('visible');
  }, 240);

  setTimeout(() => {
    envelope.style.opacity = '0';
    envelope.style.pointerEvents = 'none';
  }, 420);
}

function closeLetter() {
  if (!letterOpened) return;

  letterPaper.classList.remove('visible');
  envelope.style.opacity = '1';
  envelope.style.filter = 'blur(0)';
  envelope.style.transform = 'rotateX(0deg) translateY(0)';
  envelope.style.pointerEvents = 'auto';

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;

  makeHeartBurst(startX, startY, 90, 240);
  makeParticleBurst(startX, startY, 90, 200);

  setTimeout(() => {
    showPage(7);
  }, 500);

  letterOpened = false;
}

function toggleSecretOverlay() {
  secretOverlay.classList.toggle('visible');
}

function resetExperience() {
  secretOverlay.classList.remove('visible');
  showPage(0);
  animatedWelcome = false;
  startWelcomeSequence();
}

progressItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selectedPage = Number(item.dataset.page);
    showPage(selectedPage);
  });
});

storyButton?.addEventListener('click', triggerButtonExplosion);
openLetterBtn?.addEventListener('click', openLetter);
closeLetterBtn?.addEventListener('click', closeLetter);
secretHeart?.addEventListener('click', toggleSecretOverlay);
restartStory?.addEventListener('click', resetExperience);

window.addEventListener('pointermove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${x}px`;
  cursorGlow.style.top = `${y}px`;

  const sparkle = document.createElement('span');
  sparkle.className = 'particle-star';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.width = '4px';
  sparkle.style.height = '4px';
  sparkle.style.position = 'fixed';
  sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`);
  sparkle.style.setProperty('--dy', `${(Math.random() - 0.5) * 30}px`);
  sparkLayer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 600);
});

window.addEventListener('pointerleave', () => {
  cursorGlow.style.opacity = '0';
});

window.addEventListener('load', () => {
  showPage(0);
  startWelcomeSequence();
  setupMusicPlayer();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    secretOverlay.classList.remove('visible');
  }
});
