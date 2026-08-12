/* =================================================================
     GANTI ISINYA DI SINI:
  ================================================================= */
  const CONFIG = {
    name: "Sayangku",        // ganti dengan nama pacarmu
    age: 5,                  // jumlah lilin di kue (misal umur, boleh diganti bebas)
    message:
`Hari ini spesial karena ada kamu di dalamnya.
Terima kasih sudah jadi alasan aku tersenyum
di hari-hari biasa sekalipun.

Semoga tahun ini membawa semua hal baik
yang kamu doakan diam-diam.

Selamat ulang tahun. Aku sayang kamu.`,
    surprises: [               // isi kotak kado kecil, boleh ditambah/kurang sesuka hati
      "Terima kasih sudah selalu jadi tempat pulang paling nyaman.",
      "Aku suka caramu tertawa lepas tiap kali kita jalan bareng.",
      "Semoga tahun ini kamu makin bahagia, kayak kamu bikin aku bahagia."
    ],
    photos: [                  // 8 foto kenangan: isi "src" dengan nama file fotomu
      { src: "", caption: "Jalan-jalan pertama kita", orientation: "landscape" },
      { src: "", caption: "Makan malam spesial",       orientation: "portrait"  },
      { src: "", caption: "Liburan ke pantai",          orientation: "landscape" },
      { src: "", caption: "Momen konyol berdua",         orientation: "portrait"  },
      { src: "", caption: "Nonton sunset bareng",        orientation: "landscape" },
      { src: "", caption: "Foto favoritku",              orientation: "portrait"  },
      { src: "", caption: "Hari ulang tahunmu tahun lalu", orientation: "landscape" },
      { src: "", caption: "Selalu bareng, ya",           orientation: "portrait"  }
    ]
  };
  /* ================================================================= */

  document.getElementById('coverTitle').textContent = "Untuk " + CONFIG.name;
  document.getElementById('nameSlot').textContent = CONFIG.name;
  document.getElementById('nameSlot2').textContent = CONFIG.name;
  document.getElementById('messageText').textContent = CONFIG.message;

  // ---------- Ambient petals ----------
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

  // ---------- Cake sprinkles ----------
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

  // ---------- Build candles ----------
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

  // ---------- Build gift boxes ----------
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

  // ---------- Build photo gallery ----------
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

    // Tambahkan event click untuk membuka modal jika foto ada src-nya
    if (photo.src) {
      card.style.cursor = 'pointer'; // Biar kelihatan bisa diklik
      card.addEventListener('click', () => {
        openModal(photo.src, photo.caption);
      });
    }
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
  const replayBtn = document.getElementById('replayBtn');

  let revealed = false;
  function revealMessage(){
    if (revealed) return;
    revealed = true;
    messageCard.classList.add('reveal');
    celebrate();
    setTimeout(() => giftsSection.classList.add('reveal'), 700);
    setTimeout(() => gallerySection.classList.add('reveal'), 1100);
  }

  function celebrate(){
    burstConfetti(canvas.width / 2, canvas.height * 0.42, 140);
    fireworksShow();
    launchBalloons();
    floatingHearts(9000);
  }

  replayBtn.addEventListener('click', celebrate);

  // ---------- Sparkles around the card ----------
  const sparkleLayer = document.getElementById('sparkleLayer');
  for (let i = 0; i < 14; i++){
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 2.4) + 's';
    sparkleLayer.appendChild(s);
  }

  // ---------- Cover open (3D flip) ----------
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

  // ---------- Balloons ----------
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

  // ---------- Confetti ----------
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

  // ---------- Floating hearts ----------
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
  
  // ---------- Modal (Lightbox) Logic ----------
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

function openModal(src, caption) {
  modal.style.display = "flex";
  // Sedikit delay untuk efek transisi yang mulus
  setTimeout(() => modal.classList.add('show'), 10);
  modalImg.src = src;
  modalCaption.textContent = caption || "";
}

function closeModal() {
  modal.classList.remove('show');
  // Tunggu transisi selesai sebelum di-hide beneran
  setTimeout(() => modal.style.display = "none", 300); 
}

// Tutup modal kalau tombol X diklik
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Tutup modal kalau area di luar foto (background gelapnya) diklik
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
