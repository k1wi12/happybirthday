const CONFIG = {
    name: "My Love",       
    age: 17 ,                 
    message:
`Hari ini spesial untuk kamu karena kamu sekarang sudah bertambah usia,
aku harap hari hari kamu semakin bahagia ya bersama ku dan bersama teman kamu,
dan aku berharap kita terus bersama maybe in another day but not this month and next month, but in October.

Semoga tahun ini membawa semua hal baik
yang kamu doakan diam-diam.

Selamat ulang tahun sayangg, I always love youu forever and ever`,
    surprises: [               
      "Terima kasih kamu sudah jadi diri kamu sendiri kalau bersama ku",
      "Aku suka kamu tertawa lepad jika bersama ku.",
      "Semoga tahun ini dan bulan ini kamu selalu bahagia yaa."
    ],
    photos: [
      { src: "landscapefirstmeet.jpg", caption: "Jalan-jalan pertama kita", orientation: "landscape" },
      { src: "potraitkfc.jpg", caption: "Makan malam",       orientation: "portrait"  },
      { src: "landscapebraga.jpg", caption: "Braga berdua",          orientation: "landscape" },
      { src: "potraitfotbar.jpg", caption: "Fotbar pertama kita",         orientation: "portrait"  },
      { src: "landscapepempek.jpg", caption: "Pertama kali masak bareng",        orientation: "landscape" },
      { src: "potraitharimau.jpg", caption: "pergi ke zoo berdua",              orientation: "portrait"  },
      { src: "photoboothlandscape.jpg", caption: "First time kita photobooth", orientation: "landscape" },
      { src: "potraitmirror.jpg", caption: "Kependekan buat mencet mirror nya",           orientation: "portrait"  },
      { src: "landscapegrab.jpg", caption: "Ini kmau mau cium tapi gengsi",       orientation: "landscape"},
      { src: "landscapetour.jpg", caption: "Kamu marah kepada ku karena kebab",    orientation: "landscape"},
      {src:  "potraitkucing.jpg", caption: "Bukan hanya kucing doang yang bikin saya cemburu",       orientation: "potrait"},
      {src: "potraitposter.jpg", caption: "Kembar tak seiras",    orientation: "potrait"},
      {src: "potraitvs.jpg", caption: "First time kita video call",   orientation: "potrait"},
      {src: "landscapekiaraartha.jpg", caption: "Date di air mancur Kiara Artha Park",   orientation: "landscape"},
      {src: "potraitice.jpg", caption: "mam aisklim sesuai janji aku",  orientation: "potrait"},
      {src: "landscapengambek.jpg", caption: "Ini ngambek karena kecapean", orientation: "landscape"},
      {src: "potraittamanbalkot.jpg", caption: "Ini awal kita mulai date berdua loh ya", orientation: "potrait"},
      {src: "potraitgemes.jpg", caption: "Gemess bangettt my lovee", orientation: "landscape"},
      {src: "potraitbraga.jpg", caption: "inii jugaa maniss awowoo", orientation: "potrait"}



    ],
    memeVideo: {
      src: "dino.mp4",
      caption: "yeayyy aku ga dimarahinn,maaf yaa sayangg atas kelalaian ku mungkin beberapa bilang aku ga ngasih kamu hadiah walaupun sering barengan tapi aku janjii seteleh ini datang aku langsung kasih kamuu sayangggg"
    },
    music: {
      src: "mcr.mp3"
    }
  };

  document.getElementById('coverTitle').textContent = "Untuk " + CONFIG.name;
  document.getElementById('nameSlot').textContent = CONFIG.name;
  document.getElementById('nameSlot2').textContent = CONFIG.name;
  document.getElementById('messageText').textContent = CONFIG.message;

  const petalLayer = document.getElementById('petalLayer');
  const petalColors = ['#F3A8C4', '#F7C4D8', '#E3B255'];
  for (let i = 0; i < 18; i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = petalColors[i % petalColors.length];
    p.style.animationDuration = (9 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
    petalLayer.appendChild(p);
  }

  const sprinkleColors = ['var(--rose)', 'var(--gold)', 'var(--deep)', '#ffffff'];
  function addSprinkles(el, count, topRange, bottomRange){
    for (let i = 0; i < count; i++){
      const s = document.createElement('span');
      s.className = 'sprinkle';
      s.style.left = (10 + Math.random() * 80) + '%';
      s.style.top = (topRange + Math.random() * bottomRange) + '%';
      s.style.background = sprinkleColors[i % sprinkleColors.length];
      s.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
      el.appendChild(s);
    }
  }
  addSprinkles(document.querySelector('.tier-top'), 5, 20, 45);
  addSprinkles(document.querySelector('.tier-bottom'), 9, 12, 30);

  const candlesWrap = document.getElementById('candles');
  const candleCount = Math.max(1, Math.min(CONFIG.age, 12));
  for (let i = 0; i < candleCount; i++){
    const c = document.createElement('button');
    c.type = 'button';
    c.className = 'candle';
    c.setAttribute('aria-label', 'Tiup lilin ' + (i + 1));
    c.innerHTML = '<span class="flame"></span><span class="smoke"></span>';
    candlesWrap.appendChild(c);
  }

  const giftsGrid = document.getElementById('giftsGrid');
  CONFIG.surprises.forEach((note, i) => {
    const gift = document.createElement('div');
    gift.className = 'gift';
    gift.innerHTML = `
      <button class="gift-btn" type="button" aria-label="Buka kado ${i + 1}">
        <span class="gift-box"><span class="bow"></span></span>
        <span class="gift-note">${note}</span>
      </button>
      <span class="gift-num">kado ${i + 1}</span>
    `;
    giftsGrid.appendChild(gift);
    gift.querySelector('.gift-btn').addEventListener('click', () => {
      if (gift.classList.contains('opened')) return;
      gift.classList.add('opened');
      const rect = gift.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    });
  });

  const galleryGrid = document.getElementById('galleryGrid');
  const rotations = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5];
  CONFIG.photos.forEach((photo, i) => {
    const card = document.createElement('figure');
    card.className = 'polaroid ' + (photo.orientation === 'portrait' ? 'portrait' : 'landscape');
    card.style.setProperty('--rot', rotations[i % rotations.length] + 'deg');

    const frame = document.createElement('div');
    frame.className = 'frame';

    if (photo.src){
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.caption || ('Kenangan ' + (i + 1));
      img.loading = 'lazy';
      frame.appendChild(img);

      // klik foto -> buka lightbox (zoom + deskripsi)
      img.addEventListener('click', () => {
        openLightbox(photo.src, photo.caption || '');
      });
    } else {
      frame.innerHTML = `
        <div class="ph-placeholder">
          <span class="icon">📷</span>
          <span class="hint">isi "src" di CONFIG.photos<br>foto ${i + 1} (${photo.orientation === 'portrait' ? 'potrait' : 'landscape'})</span>
        </div>`;
    }

    card.appendChild(frame);

    const caption = document.createElement('figcaption');
    caption.textContent = photo.caption || '';
    card.appendChild(caption);

    galleryGrid.appendChild(card);
  });
  const messageCard = document.getElementById('messageCard');
  const blowBtn = document.getElementById('blowBtn');
  let litCount = candleCount;

  function blowCandle(candle){
    if (candle.classList.contains('out')) return;
    candle.classList.add('out');
    litCount--;
    if (litCount === 0){
      blowBtn.setAttribute('disabled', 'true');
      setTimeout(revealMessage, 500);
    }
  }

  candlesWrap.addEventListener('click', (e) => {
    const candle = e.target.closest('.candle');
    if (candle) blowCandle(candle);
  });

  blowBtn.addEventListener('click', () => {
    document.querySelectorAll('.candle').forEach((c, i) => {
      setTimeout(() => blowCandle(c), i * 140);
    });
  });

  const giftsSection = document.getElementById('giftsSection');
  const gallerySection = document.getElementById('gallerySection');
  const giftSection = document.getElementById('giftSection');
  const replayBtn = document.getElementById('replayBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');

  let revealed = false;
  function revealMessage(){
    if (revealed) return;
    revealed = true;
    messageCard.classList.add('reveal');
    celebrate();
    setTimeout(() => giftsSection.classList.add('reveal'), 700);
    setTimeout(() => gallerySection.classList.add('reveal'), 1100);
    setTimeout(() => giftSection.classList.add('reveal'), 1500);
    playBackgroundMusic();
  }

  function playBackgroundMusic(){
    const music = CONFIG.music || {};
    if (!music.src) return;
    bgMusic.src = music.src;
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {
      // browser mungkin blokir autoplay suara, biarkan user pencet tombolnya
    });
    musicToggle.style.display = 'flex';
    musicToggle.classList.remove('paused');
    musicIcon.textContent = '♪';
  }

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused){
      bgMusic.play();
      musicToggle.classList.remove('paused');
      musicIcon.textContent = '♪';
    } else {
      bgMusic.pause();
      musicToggle.classList.add('paused');
      musicIcon.textContent = '⏸';
    }
  });

  function celebrate(){
    burstConfetti(canvas.width / 2, canvas.height * 0.42, 140);
    fireworksShow();
    launchBalloons();
    floatingHearts(9000);
  }

  replayBtn.addEventListener('click', celebrate);

  const sparkleLayer = document.getElementById('sparkleLayer');
  for (let i = 0; i < 14; i++){
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 2.4) + 's';
    sparkleLayer.appendChild(s);
  }

  const invitation = document.getElementById('invitation');
  const openBtn = document.getElementById('openBtn');
  const cover = document.getElementById('cover');
  const surprise = document.getElementById('surprise');
  const flash = document.getElementById('flash');
  let coverOpened = false;

  openBtn.addEventListener('click', () => {
    if (coverOpened) return;
    coverOpened = true;
    invitation.classList.add('open');
    flash.classList.add('pulse');
    setTimeout(() => {
      cover.classList.add('hide');
      surprise.classList.add('show');
    }, 1900);
  });

  const balloonColors = ['#F3A8C4', '#E3B255', '#A6335C', '#F7C4D8'];
  function launchBalloons(){
    for (let i = 0; i < 9; i++){
      setTimeout(() => {
        const b = document.createElement('div');
        b.className = 'balloon float';
        b.style.left = (5 + Math.random() * 90) + 'vw';
        b.style.background = balloonColors[i % balloonColors.length];
        b.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 7200);
      }, i * 180);
    }
  }

  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confettiColors = ['#F3A8C4', '#E3B255', '#A6335C', '#FFFFFF', '#F7C4D8'];
  const activeParticles = [];
  let rafRunning = false;

  function burstConfetti(x, y, count){
    count = count || 100;
    for (let i = 0; i < count; i++){
      activeParticles.push({
        kind: 'confetti',
        x: x + (Math.random() * 160 - 80),
        y: y,
        vx: (Math.random() - 0.5) * 11,
        vy: Math.random() * -11 - 4,
        size: 5 + Math.random() * 5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 14,
        gravity: 0.28 + Math.random() * 0.12,
        frame: 0,
        maxFrames: 200 + Math.random() * 40
      });
    }
    ensureLoop();
  }

  function burstFirework(x, y, color){
    const count = 46;
    for (let i = 0; i < count; i++){
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2.6 + Math.random() * 2.4;
      activeParticles.push({
        kind: 'spark',
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 1.6,
        color,
        gravity: 0.06,
        drag: 0.965,
        frame: 0,
        maxFrames: 70 + Math.random() * 20
      });
    }
    ensureLoop();
  }

  function fireworksShow(){
    const fireColors = ['#F3A8C4', '#E3B255', '#FFFFFF', '#A6335C'];
    const spots = [
      { x: 0.28, y: 0.24 },
      { x: 0.72, y: 0.2 },
      { x: 0.5, y: 0.3 },
      { x: 0.35, y: 0.22 }
    ];
    spots.forEach((s, i) => {
      setTimeout(() => {
        burstFirework(canvas.width * s.x, canvas.height * s.y, fireColors[i % fireColors.length]);
      }, i * 420);
    });
  }

  function ensureLoop(){
    if (rafRunning) return;
    rafRunning = true;
    requestAnimationFrame(tick);
  }

  function tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = activeParticles.length - 1; i >= 0; i--){
      const p = activeParticles[i];
      p.frame++;
      const alpha = Math.max(0, 1 - p.frame / p.maxFrames);

      if (p.kind === 'confetti'){
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      } else {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (p.frame >= p.maxFrames) activeParticles.splice(i, 1);
    }

    if (activeParticles.length > 0){
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rafRunning = false;
    }
  }

  const giftSlideAsk = document.getElementById('giftSlideAsk');
  const giftSlideSorry = document.getElementById('giftSlideSorry');
  const giftSlideDone = document.getElementById('giftSlideDone');
  const giftYesBtn = document.getElementById('giftYesBtn');
  const giftNoBtn = document.getElementById('giftNoBtn');
  const giftTease = document.getElementById('giftTease');
  const forgiveChoice = document.getElementById('forgiveChoice');
  const forgiveQuestion = document.getElementById('forgiveQuestion');
  const forgiveYesBtn = document.getElementById('forgiveYesBtn');
  const forgiveNoBtn = document.getElementById('forgiveNoBtn');

  const forgiveSteps = [
    { q: 'Kamu mau memaafkan aku atas kelalaian ku?', yes: 'Iy' },
    { q: 'Yakin nih kamuu benerann mau amafin akuu?', yes: 'Iya, terserah' },
    { q: 'Yakin banget? Beneran gak kesel samaa akuu?', yes: 'Beneran iya dimaafin' },
    { q: 'Terakhir nih... janji gak bakal berubah pikiran?', yes: 'Janji sayangg' },
    { q: 'Kamuu kalauu akuu ada kesalahan ginii masih sayangg akuu gaaa?hiks.', yes: 'masihh sayanggg bangett'}
  ];
  let forgiveStep = 0;
  let giftTeaseClicks = 0;

  const giftTeaseLines = [
    'yakin? padahal udah disiapin dari jauh-jauh hari lho 🥹',
    'coba dipikir lagi deh...',
    'yaudah deh, kalau berubah pikiran tombol satunya masih ada kok 👀'
  ];

  giftNoBtn.addEventListener('click', () => {
    giftTease.textContent = giftTeaseLines[Math.min(giftTeaseClicks, giftTeaseLines.length - 1)];
    giftTeaseClicks++;
  });

  giftYesBtn.addEventListener('click', () => {
    giftSlideAsk.classList.add('hide');
    giftSlideSorry.classList.remove('hide');
    forgiveStep = 0;
    renderForgiveStep();
  });

  function renderForgiveStep(){
    const step = forgiveSteps[forgiveStep];
    forgiveQuestion.textContent = step.q;
    forgiveYesBtn.textContent = step.yes;
    forgiveNoBtn.style.left = 'calc(50% + 60px)';
    forgiveNoBtn.style.top = '50%';
  }

  const memeVideoWrap = document.getElementById('memeVideoWrap');
  let memeVideoRendered = false;

  function renderMemeVideo(){
    if (memeVideoRendered) return;
    memeVideoRendered = true;
    const meme = CONFIG.memeVideo || {};
    if (meme.src){
      memeVideoWrap.innerHTML = `
        <video src="${meme.src}" autoplay loop muted playsinline controls></video>
        <p class="quiz-count" style="margin-top:8px;">${meme.caption || ''}</p>
      `;
    } else {
      memeVideoWrap.innerHTML = `
        <p class="meme-placeholder">
          🎬 isi "src" di CONFIG.memeVideo dengan nama file video meme kamu<br>
          (contoh: "meme.mp4"), taruh di folder yang sama dengan index.html
        </p>`;
    }
  }

  forgiveYesBtn.addEventListener('click', () => {
    forgiveStep++;
    if (forgiveStep < forgiveSteps.length){
      renderForgiveStep();
    } else {
      giftSlideSorry.classList.add('hide');
      giftSlideDone.classList.remove('hide');
      celebrate();
      renderMemeVideo();
    }
  });

  function dodgeNoButton(){
    const bounds = forgiveChoice.getBoundingClientRect();
    const btnRect = forgiveNoBtn.getBoundingClientRect();
    const padding = 10;
    const maxX = Math.max(bounds.width - btnRect.width - padding, padding);
    const maxY = Math.max(bounds.height - btnRect.height - padding, padding);
    const newX = padding + Math.random() * maxX;
    const newY = padding + Math.random() * maxY;
    forgiveNoBtn.style.left = newX + 'px';
    forgiveNoBtn.style.top = newY + 'px';
    forgiveNoBtn.style.transform = 'translate(0, 0)';
  }

  forgiveChoice.addEventListener('mousemove', (e) => {
    if (giftSlideSorry.classList.contains('hide')) return;
    const rect = forgiveNoBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 90) dodgeNoButton();
  });

  forgiveNoBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeNoButton();
  }, { passive: false });

  forgiveNoBtn.addEventListener('pointerenter', dodgeNoButton);

  forgiveNoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dodgeNoButton();
  });

  function floatingHearts(duration){
    const end = Date.now() + duration;
    (function spawn(){
      if (Date.now() > end) return;
      const h = document.createElement('span');
      h.className = 'heart-float';
      h.textContent = '♥';
      h.style.left = (5 + Math.random() * 90) + 'vw';
      h.style.fontSize = (14 + Math.random() * 14) + 'px';
      h.style.color = Math.random() > 0.5 ? 'var(--rose)' : 'var(--gold)';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 5600);
      setTimeout(spawn, 350 + Math.random() * 400);
    })();
  }

  // ---------- Lightbox foto kenangan ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  let lightboxOpen = false;

  function openLightbox(src, caption){
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Foto kenangan';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxOpen = false;
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  // klik di area gelap (di luar foto/caption) untuk menutup
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // tombol Esc untuk menutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOpen) closeLightbox();
  });
