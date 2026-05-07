/* ===================================================
   写给 Giulia — 母亲节网页主脚本
   =================================================== */

// ── 地点数据 ──
// mapGuide:     地图页导览角色气泡文字
// photoCaptions: 每张照片对应的气泡对话（共4条，占位后替换）
const LOCATIONS = [
  {
    name:      '大阪·心斋桥',
    date:      '2025.07',
    folder:    'osaka',
    mapGuide:  '心斋桥！格力高的广告牌好大啊，晚上看起来特别漂亮～',
    photoCaptions: [
      '来到著名的格力高广告牌打卡，一直在自拍。',
      '再来一张。',
      '那天本来想吃一兰拉面，结果误入另一家店',
      '下次再来吃蟹屋吧！',
    ],
  },
  {
    name:      '奈良·小鹿公园',
    date:      '2025.07',
    folder:    'nara',
    mapGuide:  '奈良的小鹿！妈妈说它们的眼睛像以前的兔兔～',
    photoCaptions: [
      '那只小鹿一直跟着我们走，像是认识我们。',
      '走在奈良的街道上，期待与小鹿邂逅。',
      '绿油油的草地，可惜关门了只能远远望',
      '这是这趟旅行里最开心的一天之一。',
    ],
  },
  {
    name:      '京都·清水寺',
    date:      '2025.07',
    folder:    'kiyomizu',
    mapGuide:  '清水寺！还记得我们喝了三个泉眼哪一口吗～',
    photoCaptions: [
      '红色的建筑和山里的绿色，配在一起真的很美。',
      '走出模特儿的步伐！',
      '吃上了豆腐和冷面，感觉好清爽。',
      '路过鸭川，嘲笑到这不过是个小水沟～',
    ],
  },
  {
    name:      '京都·嵯峨野',
    date:      '2025.07',
    folder:    'arashiyama',
    mapGuide:  '嵯峨野！下雨天最好看的京都景点，雨声沙沙～',
    photoCaptions: [
      '铁路自拍中，这条路上像是绿野仙踪。',
      '很明智地穿着溯溪鞋，在大雨里亲近自然。',
      '坐上小火车，穿越山谷。',
      '误入很贵的和牛店，在日本最昂贵的一顿。',
    ],
  },
  {
    name:      '京都·稻荷大社',
    date:      '2025.07',
    folder:    'fushimi',
    mapGuide:  '稻荷大社！红色鸟居，人与神的界限～',
    photoCaptions: [
      '鸟居，像开了一扇门。',
      '我们一路走一路拍，忘记了数有多少个。',
      '橙红色的柱子和树影，每一帧都像明信片。',
      '跟我走吧。',
    ],
  },
  {
    name:      '镰仓·片濑海岸',
    date:      '2025.07',
    folder:    'kamakura',
    mapGuide:  '片濑海岸！国家地理推荐的镰仓，很值得。',
    photoCaptions: [
      '排了很久的网红店，先来顿海鲜。',
      '海岛的风很大，竟然隐约可以看到富士山。',
      '逛逛超市，拼凑又一顿很好吃的。',
      '海浪拍打沙滩，有人开始起舞。',
    ],
  },
  {
    name:      '东京·银座',
    date:      '2025.07',
    folder:    'ginza',
    mapGuide:  '东京！旅行最后一站，买买买。',
    photoCaptions: [
      '逛街中。',
      '迷失东京，很标准的繁华。',
      '又见商场。',
      '那一天，为了找一个地铁直梯，煞费苦心。',
    ],
  },
];

// ── 花园图片数据 ──
const GARDEN_IMAGES = [
  { src: 'assets/images/garden/flower1.jpg', name: '杜鹃', language: '爱的欢愉，生机蓬勃' },
  { src: 'assets/images/garden/flower2.jpg', name: '海棠', language: '温柔相思，美丽永驻' },
  { src: 'assets/images/garden/flower3.jpg', name: '太阳', language: '纯洁自尊，吉祥如意' },
  { src: 'assets/images/garden/flower4.jpg', name: '合欢', language: '热情活力，生机盎然' },
  { src: 'assets/images/garden/flower5.jpg', name: '红枫', language: '岁月沉香，美在当下' },
  { src: 'assets/images/garden/flower6.jpg', name: '银杏', language: '长相守护，用心以待' },
  { src: 'assets/images/garden/flower7.jpg', name: '橙玫', language: '温暖珍重，岁月有情' },
  { src: 'assets/images/garden/flower8.jpg', name: '铃兰', language: '幸福归来，纯洁谦逊' },
  { src: 'assets/images/garden/flower9.jpg', name: '多肉', language: '静水流深，生生不息' },
];

/* =================================================== */

// DOM 就绪后启动
document.addEventListener('DOMContentLoaded', () => {
  initPetals();
  initJapanBg();
  initGarden();
  initGardenBg();
  initComicObserver();
  initMusicToggle();
  initLetterScene();
  tryAutoPlayBGM();
});

/* ─── 一、樱花花瓣入场动画 ─── */
function initPetals() {
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');
  let petals = [];
  let animFrame;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 创建花瓣
  function createPetal() {
    return {
      x:        Math.random() * canvas.width,
      y:        -20,
      size:     Math.random() * 10 + 6,
      speedY:   Math.random() * 1.5 + 0.8,
      speedX:   (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.06,
      opacity:  Math.random() * 0.5 + 0.5,
      color:    `hsl(${340 + Math.random() * 20}, 70%, ${80 + Math.random() * 12}%)`,
      wobble:   Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
    };
  }

  // 绘制单片花瓣（椭圆形）
  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    // 前3秒持续生成花瓣
    if (frame < 180) {
      if (frame % 4 === 0) petals.push(createPetal());
    }

    petals.forEach((p, i) => {
      p.wobble += p.wobbleSpeed;
      p.x      += p.speedX + Math.sin(p.wobble) * 0.8;
      p.y      += p.speedY;
      p.rotation += p.rotSpeed;

      // 花瓣落到底部后淡出
      if (p.y > canvas.height * 0.85) {
        p.opacity -= 0.015;
      }

      if (p.opacity <= 0) {
        petals.splice(i, 1);
      } else {
        drawPetal(p);
      }
    });

    animFrame = requestAnimationFrame(animate);
  }

  animate();

  // 4.5 秒后过渡到主页面
  setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.classList.add('fade-out');
    cancelAnimationFrame(animFrame);

    setTimeout(() => {
      intro.classList.add('hidden');
      document.getElementById('main').classList.remove('hidden');
      startMapSequence();
    }, 1000);
  }, 4500);
}

/* ─── 二、地图点亮序列 + 导览气泡 ─── */
function startMapSequence() {
  const dots      = document.querySelectorAll('.loc-dot');
  const routeLines = document.getElementById('route-lines');
  const bubble    = document.getElementById('guide-bubble');
  const bubbleText = document.getElementById('guide-bubble-text');
  const guide     = document.getElementById('map-guide');

  // 离开 japan 模块时隐藏导览角色
  new IntersectionObserver(
    ([entry]) => guide.classList.toggle('guide-hidden', !entry.isIntersecting),
    { threshold: 0.3 }
  ).observe(document.getElementById('japan'));

  // 路线线条延迟出现
  setTimeout(() => routeLines.classList.add('visible'), 400);

  // 地点依次点亮
  dots.forEach((dot, i) => {
    setTimeout(() => dot.classList.add('visible'), 500 + i * 320);
  });

  // 导览气泡：地点全部点亮后出现欢迎语
  const totalDelay = 500 + (dots.length - 1) * 320 + 400;
  setTimeout(() => bubble.classList.add('visible'), totalDelay);

  // 点击地点：气泡换成该地点导览词，短暂停留后进入场景
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      bubbleText.textContent = LOCATIONS[i].mapGuide;
      bubble.classList.remove('visible');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bubble.classList.add('visible');
      }));
      setTimeout(() => openScene(i), 900);
    });
  });
}

/* ─── 三、场景弹出（含照片滑动 + 气泡对话）─── */
function openScene(index) {
  const loc     = LOCATIONS[index];
  const display = document.getElementById('scene-display');
  const stage   = document.getElementById('scene-stage');
  const strip   = document.getElementById('photo-strip');
  const dotsEl  = document.getElementById('photo-dots');
  const photoBubble     = document.getElementById('photo-bubble');
  const photoBubbleText = document.getElementById('photo-bubble-text');

  const PHOTO_COUNT = 4;
  let currentPhoto = 0;

  // ── 构建照片条 ──
  strip.innerHTML  = '';
  dotsEl.innerHTML = '';

  for (let i = 1; i <= PHOTO_COUNT; i++) {
    const slide = document.createElement('div');
    slide.className = 'photo-slide';
    slide.style.backgroundImage =
      `url('assets/images/japan/${loc.folder}/${String(i).padStart(2,'0')}.jpg')`;
    strip.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'photo-dot' + (i === 1 ? ' active' : '');
    dotsEl.appendChild(dot);
  }

  // ── 切换照片并更新气泡 ──
  function goToPhoto(n) {
    currentPhoto = Math.max(0, Math.min(PHOTO_COUNT - 1, n));
    const slideWidth = document.getElementById('photo-strip-wrap').offsetWidth;
    strip.style.transform = `translateX(-${currentPhoto * slideWidth}px)`;
    dotsEl.querySelectorAll('.photo-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentPhoto);
    });

    // 气泡：先隐藏，换文字，再出现
    photoBubble.classList.remove('visible');
    setTimeout(() => {
      photoBubbleText.textContent = loc.photoCaptions[currentPhoto] || '';
      photoBubble.classList.add('visible');
    }, 220);
  }

  // ── 文字（地点+日期）──
  document.getElementById('caption-location').textContent = loc.name;
  document.getElementById('caption-date').textContent     = loc.date;

  // ── 显示弹窗 ──
  display.classList.remove('hidden');

  // 弹窗可见后设置 slide 精确像素宽度
  const slideWidth = document.getElementById('photo-strip-wrap').offsetWidth;
  strip.querySelectorAll('.photo-slide').forEach(s => {
    s.style.width = slideWidth + 'px';
  });
  strip.style.width = (slideWidth * PHOTO_COUNT) + 'px';
  goToPhoto(0);

  // ── AbortController 统一管理事件 ──
  const ac  = new AbortController();
  const sig = ac.signal;

  // 触摸滑动
  let touchStartX = 0;
  let touchMoved  = false;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchMoved  = false;
  }, { passive: true, signal: sig });

  stage.addEventListener('touchmove', (e) => {
    if (Math.abs(e.touches[0].clientX - touchStartX) > 8) touchMoved = true;
  }, { passive: true, signal: sig });

  stage.addEventListener('touchend', (e) => {
    if (!touchMoved) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 35) goToPhoto(currentPhoto + (dx < 0 ? 1 : -1));
  }, { signal: sig });

  // 箭头按钮
  document.getElementById('photo-prev').addEventListener('click',
    () => goToPhoto(currentPhoto - 1), { signal: sig });
  document.getElementById('photo-next').addEventListener('click',
    () => goToPhoto(currentPhoto + 1), { signal: sig });

  // ── 关闭 ──
  function closeScene() {
    ac.abort();
    photoBubble.classList.remove('visible');
    display.classList.add('hidden');
    strip.innerHTML  = '';
    dotsEl.innerHTML = '';
  }

  document.getElementById('scene-close').addEventListener('click', closeScene, { signal: sig });
  display.addEventListener('click', (e) => { if (e.target === display) closeScene(); }, { signal: sig });
}

/* ─── 四、小花园 ─── */
function initGarden() {
  const grid = document.getElementById('garden-grid');

  GARDEN_IMAGES.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'flower-card';

    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.name;
    image.onerror = () => {
      image.style.display = 'none';
      card.style.background = `hsl(${100 + Math.random()*60}, 30%, 88%)`;
    };

    const overlay = document.createElement('div');
    overlay.className = 'flower-info-overlay';

    const name = document.createElement('p');
    name.className = 'flower-name';
    name.textContent = item.name;

    const lang = document.createElement('p');
    lang.className = 'flower-language';
    lang.textContent = item.language;

    overlay.appendChild(name);
    overlay.appendChild(lang);
    card.appendChild(image);
    card.appendChild(overlay);

    card.addEventListener('click', () => {
      card.classList.toggle('info-open');
    });

    grid.appendChild(card);
  });
}

/* ─── 五、图片放大 + 信件淡入 ─── */
function initComicObserver() {
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    },
    { threshold: 0.4 }
  ).observe(document.getElementById('letter-content'));

  const lightbox    = document.getElementById('story-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.story-img img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.remove('hidden');
    });
  });

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);
}

/* ─── 六、背景音乐 ─── */
function tryAutoPlayBGM() {
  const bgm = document.getElementById('bgm');
  bgm.volume = 0.4;
  bgm.play().catch(() => {
    // 浏览器阻止自动播放，等待用户第一次交互（触摸或点击均可）
    const resume = () => bgm.play();
    document.addEventListener('touchstart', resume, { once: true });
    document.addEventListener('click', resume, { once: true });
  });
}

function initMusicToggle() {
  const btn = document.getElementById('musicToggle');
  const bgm = document.getElementById('bgm');
  let muted = false;

  btn.addEventListener('click', () => {
    // 若音乐还未开始（自动播放被拦截），点击按钮直接启动播放
    if (bgm.paused) {
      bgm.play();
      muted = false;
      bgm.muted = false;
      btn.classList.remove('muted');
      return;
    }
    muted = !muted;
    bgm.muted = muted;
    btn.classList.toggle('muted', muted);
  });
}

/* ─── 七、最后一页：花朵粒子 + 妈妈角色 ─── */
function initLetterScene() {
  const section = document.getElementById('letter');
  const canvas  = document.getElementById('letterCanvas');
  const ctx     = canvas.getContext('2d');
  const momEl   = document.getElementById('letter-mom');

  const COLORS = ['#f4b8c1', '#e8909e', '#ffd6a5', '#ffb347', '#c9845a', '#f9e4b7', '#d4a5d5', '#ff9eb5', '#ffe066'];
  let particles = [];
  let animFrame;
  let active = false;
  let frame = 0;

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function createParticle() {
    const type = Math.random() < 0.65 ? 'flower' : 'sparkle';
    return {
      x:          Math.random() * canvas.width,
      y:          canvas.height + 20,
      size:       type === 'flower' ? Math.random() * 10 + 6 : Math.random() * 4 + 2,
      speedY:     -(Math.random() * 1.4 + 0.6),
      speedX:     (Math.random() - 0.5) * 0.8,
      rotation:   Math.random() * Math.PI * 2,
      rotSpeed:   (Math.random() - 0.5) * 0.04,
      opacity:    Math.random() * 0.5 + 0.5,
      color:      COLORS[Math.floor(Math.random() * COLORS.length)],
      wobble:     Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      type,
    };
  }

  function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;

    if (p.type === 'flower') {
      // 5 片花瓣
      ctx.fillStyle = p.color;
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i / 5) * Math.PI * 2);
        ctx.beginPath();
        ctx.ellipse(0, -p.size * 0.55, p.size * 0.28, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // 花心
      ctx.fillStyle = '#fff9c4';
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // 闪光点：四角星
      ctx.fillStyle = p.color;
      ctx.beginPath();
      const s = p.size;
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.25, -s * 0.25);
      ctx.lineTo(s, 0);
      ctx.lineTo(s * 0.25, s * 0.25);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.25, s * 0.25);
      ctx.lineTo(-s, 0);
      ctx.lineTo(-s * 0.25, -s * 0.25);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function animate() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    if (frame % 2 === 0) particles.push(createParticle());
    if (particles.length > 80) particles.splice(0, 5);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.wobble  += p.wobbleSpeed;
      p.x       += p.speedX + Math.sin(p.wobble) * 0.6;
      p.y       += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y < -20) {
        particles.splice(i, 1);
      } else {
        drawParticle(p);
      }
    }

    animFrame = requestAnimationFrame(animate);
  }

  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        frame = 0;
        resize();
        momEl.classList.add('visible');
        animate();
      } else if (!entry.isIntersecting) {
        active = false;
        cancelAnimationFrame(animFrame);
        momEl.classList.remove('visible');
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    { threshold: 0.5 }
  ).observe(section);

  window.addEventListener('resize', resize);
}

/* ─── 八、日本地图背景：海洋 · 大陆 · 云 · 波浪 ─── */
function initJapanBg() {
  const section = document.getElementById('japan');
  const canvas  = document.getElementById('japanBgCanvas');
  const ctx     = canvas.getContext('2d');
  let animFrame, active = false, t = 0;

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  // 云朵
  let clouds = [];
  function initClouds() {
    clouds = Array.from({ length: 5 }, (_, i) => ({
      x:    (canvas.width / 5) * i + Math.random() * 60,
      y:    canvas.height * (0.06 + i * 0.03),
      w:    50 + Math.random() * 50,
      speed: 0.08 + Math.random() * 0.12,
      op:   0.10 + Math.random() * 0.08,
    }));
  }

  function drawCloud(c) {
    ctx.save();
    ctx.globalAlpha = c.op;
    ctx.fillStyle = '#fff';
    const x = c.x, y = c.y, w = c.w;
    ctx.beginPath();
    ctx.arc(x,           y,          w * 0.42, 0, Math.PI * 2);
    ctx.arc(x + w * 0.35, y - w * 0.08, w * 0.32, 0, Math.PI * 2);
    ctx.arc(x + w * 0.68, y,          w * 0.28, 0, Math.PI * 2);
    ctx.arc(x - w * 0.25, y + w * 0.04, w * 0.26, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawOcean() {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0,   'rgba(190,225,240,0.18)');
    g.addColorStop(0.6, 'rgba(155,205,225,0.13)');
    g.addColorStop(1,   'rgba(130,190,215,0.10)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawContinent() {
    ctx.save();
    ctx.globalAlpha = 0.055;
    ctx.fillStyle = '#c9a87c';
    // 亚洲大陆主体（左侧大块）
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(canvas.width * 0.18, canvas.height * 0.02,
                      canvas.width * 0.28, canvas.height * 0.08,
                      canvas.width * 0.22, canvas.height * 0.22);
    ctx.bezierCurveTo(canvas.width * 0.18, canvas.height * 0.35,
                      canvas.width * 0.10, canvas.height * 0.42,
                      canvas.width * 0.15, canvas.height * 0.55);
    ctx.bezierCurveTo(canvas.width * 0.08, canvas.height * 0.65,
                      canvas.width * 0.04, canvas.height * 0.75,
                      0, canvas.height * 0.80);
    ctx.closePath();
    ctx.fill();

    // 朝鲜半岛（小突出）
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.20, canvas.height * 0.28);
    ctx.bezierCurveTo(canvas.width * 0.24, canvas.height * 0.30,
                      canvas.width * 0.25, canvas.height * 0.38,
                      canvas.width * 0.22, canvas.height * 0.44);
    ctx.bezierCurveTo(canvas.width * 0.20, canvas.height * 0.50,
                      canvas.width * 0.16, canvas.height * 0.48,
                      canvas.width * 0.15, canvas.height * 0.42);
    ctx.bezierCurveTo(canvas.width * 0.14, canvas.height * 0.36,
                      canvas.width * 0.17, canvas.height * 0.30,
                      canvas.width * 0.20, canvas.height * 0.28);
    ctx.fill();

    // 山脉轮廓线（大陆内侧）
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#8b6347';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const baseY = canvas.height * (0.08 + i * 0.12);
      ctx.beginPath();
      for (let x = 0; x < canvas.width * 0.25; x += 6) {
        const y = baseY - Math.abs(Math.sin((x / 18) + i)) * 10 - Math.random() * 2;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawWaves() {
    for (let row = 0; row < 6; row++) {
      const baseY   = canvas.height * (0.15 + row * 0.13);
      const amp     = 2.5 + row * 0.5;
      const waveLen = 70 + row * 18;
      const phase   = t * (0.018 - row * 0.002);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(130,195,220,${0.14 - row * 0.015})`;
      ctx.lineWidth   = 1;
      for (let x = 0; x <= canvas.width; x += 3) {
        const y = baseY + Math.sin((x / waveLen) + phase) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // 樱花花瓣（少量点缀）
  let petals = [];
  function spawnPetal() {
    petals.push({
      x: Math.random() * canvas.width,
      y: -10,
      r: Math.random() * 0.04 + 0.02,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 0.5 + 0.25,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.03,
      op: Math.random() * 0.4 + 0.3,
    });
  }

  function drawPetals() {
    petals.forEach((p, i) => {
      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.rotV;
      if (p.y > canvas.height + 10) { petals.splice(i, 1); return; }
      const s = canvas.width * p.r;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.op;
      ctx.fillStyle = '#f4b8c1';
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.4, s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function animate() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;

    drawOcean();
    drawContinent();
    drawWaves();

    if (t % 40 === 0 && petals.length < 12) spawnPetal();
    drawPetals();

    clouds.forEach(c => {
      c.x += c.speed;
      if (c.x > canvas.width + 120) c.x = -120;
      drawCloud(c);
    });

    animFrame = requestAnimationFrame(animate);
  }

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !active) {
      active = true; resize(); initClouds(); animate();
    } else if (!entry.isIntersecting) {
      active = false; cancelAnimationFrame(animFrame);
    }
  }, { threshold: 0.25 }).observe(section);

  window.addEventListener('resize', () => { resize(); initClouds(); });
}

/* ─── 九、花园背景：蝴蝶 · 松鼠 · 花粉 ─── */
function initGardenBg() {
  const section = document.getElementById('garden');
  const canvas  = document.getElementById('gardenBgCanvas');
  const ctx     = canvas.getContext('2d');
  let animFrame, active = false, t = 0;

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  // ── 蝴蝶 ──
  const BF_COLORS = [
    ['#f9b8d0','#e8728e'], ['#ffd6a5','#e8943a'],
    ['#c8b4e8','#9068c8'], ['#a8dfc8','#4aaa80'],
  ];
  let butterflies = [];

  function initButterflies() {
    butterflies = BF_COLORS.map((cols) => ({
      x:      30 + Math.random() * (canvas.width  - 60),
      y:      canvas.height * (0.08 + Math.random() * 0.5),
      tx:     30 + Math.random() * (canvas.width  - 60),
      ty:     canvas.height * (0.08 + Math.random() * 0.5),
      spd:    0.35 + Math.random() * 0.5,
      wing:   Math.random() * Math.PI * 2,
      wingV:  0.10 + Math.random() * 0.08,
      sz:     11 + Math.random() * 9,
      cols,
      off:    Math.random() * Math.PI * 2,
    }));
  }

  function drawButterfly(b) {
    const flip = Math.cos(b.wing);
    const sx   = Math.abs(flip);
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.scale(flip < 0 ? -1 : 1, 1);
    ctx.globalAlpha = 0.78;

    // 上翅
    ctx.fillStyle = b.cols[0];
    ctx.save(); ctx.scale(sx, 1);
    ctx.beginPath();
    ctx.ellipse(-b.sz * 0.58, -b.sz * 0.28, b.sz * 0.52, b.sz * 0.36, -0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse( b.sz * 0.58, -b.sz * 0.28, b.sz * 0.52, b.sz * 0.36,  0.35, 0, Math.PI * 2);
    ctx.fill();
    // 下翅
    ctx.fillStyle = b.cols[1];
    ctx.beginPath();
    ctx.ellipse(-b.sz * 0.48,  b.sz * 0.22, b.sz * 0.36, b.sz * 0.26,  0.3,  0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse( b.sz * 0.48,  b.sz * 0.22, b.sz * 0.36, b.sz * 0.26, -0.3,  0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 身体
    ctx.fillStyle = '#4a3020';
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.ellipse(0, 0, b.sz * 0.09, b.sz * 0.44, 0, 0, Math.PI * 2);
    ctx.fill();

    // 触角
    ctx.strokeStyle = '#4a3020'; ctx.lineWidth = 0.8; ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.moveTo(-2, -b.sz * 0.38);
    ctx.quadraticCurveTo(-b.sz * 0.28, -b.sz * 0.78, -b.sz * 0.18, -b.sz * 0.88); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( 2, -b.sz * 0.38);
    ctx.quadraticCurveTo( b.sz * 0.28, -b.sz * 0.78,  b.sz * 0.18, -b.sz * 0.88); ctx.stroke();
    ctx.restore();
  }

  // ── 松鼠 ──
  let sq = { x: -80, y: 0, dir: 1, hop: 0, phase: 0, active: false, timer: 0 };

  function resetSq() {
    sq.dir = Math.random() < 0.5 ? 1 : -1;
    sq.x   = sq.dir > 0 ? -80 : canvas.width + 80;
    sq.y   = canvas.height - 72;
  }

  function drawSquirrel(sq) {
    if (!sq.active) return;
    ctx.save();
    ctx.translate(sq.x, sq.y - sq.hop);
    if (sq.dir < 0) ctx.scale(-1, 1);
    ctx.globalAlpha = 0.82;
    const s = 18;

    // 大尾巴
    ctx.strokeStyle = '#a0673a'; ctx.lineWidth = s * 0.55;
    ctx.lineCap = 'round'; ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-s * 1.3, -s * 0.8, -s * 0.6, -s * 2.1);
    ctx.stroke();

    // 身体
    ctx.globalAlpha = 0.82;
    ctx.fillStyle = '#c9845a';
    ctx.beginPath(); ctx.ellipse(0, 0, s * 0.48, s * 0.68, 0, 0, Math.PI * 2); ctx.fill();

    // 头
    ctx.beginPath(); ctx.arc(s * 0.22, -s * 0.82, s * 0.36, 0, Math.PI * 2); ctx.fill();

    // 耳朵
    ctx.fillStyle = '#e8a070';
    ctx.beginPath(); ctx.ellipse(s * 0.12, -s * 1.16, s * 0.11, s * 0.17, -0.3, 0, Math.PI * 2); ctx.fill();

    // 眼睛
    ctx.fillStyle = '#2e1e10';
    ctx.beginPath(); ctx.arc(s * 0.38, -s * 0.88, s * 0.07, 0, Math.PI * 2); ctx.fill();

    // 高光
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(s * 0.41, -s * 0.91, s * 0.03, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  }

  // ── 花粉粒子 ──
  let pollen = [];
  function spawnPollen() {
    pollen.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 8,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.7 + 0.3),
      r:  Math.random() * 2.5 + 1,
      op: Math.random() * 0.45 + 0.2,
      col: ['#ffe066','#b8e68a','#f9b8d0','#ffffff'][Math.floor(Math.random()*4)],
    });
  }

  function animate() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;

    // 蝴蝶
    butterflies.forEach(b => {
      b.wing += b.wingV;
      const dx = b.tx - b.x, dy = b.ty - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 25) {
        b.tx = 30 + Math.random() * (canvas.width - 60);
        b.ty = canvas.height * (0.08 + Math.random() * 0.52);
      }
      const spd = b.spd;
      b.x += (dx / dist) * spd + Math.sin(t * 0.035 + b.off) * 0.45;
      b.y += (dy / dist) * spd * 0.8 + Math.cos(t * 0.028 + b.off) * 0.35;
      drawButterfly(b);
    });

    // 松鼠
    sq.timer++;
    if (!sq.active && sq.timer > 220) { sq.active = true; sq.timer = 0; resetSq(); }
    if (sq.active) {
      sq.x     += sq.dir * 1.6;
      sq.phase += 0.2;
      sq.hop    = Math.abs(Math.sin(sq.phase)) * 13;
      if (sq.x > canvas.width + 90 || sq.x < -90) { sq.active = false; sq.timer = 0; }
    }
    drawSquirrel(sq);

    // 花粉
    if (t % 18 === 0 && pollen.length < 30) spawnPollen();
    for (let i = pollen.length - 1; i >= 0; i--) {
      const p = pollen[i];
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { pollen.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col;
      ctx.globalAlpha = p.op;
      ctx.fill();
    }

    animFrame = requestAnimationFrame(animate);
  }

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !active) {
      active = true; resize(); initButterflies(); animate();
    } else if (!entry.isIntersecting) {
      active = false; cancelAnimationFrame(animFrame);
    }
  }, { threshold: 0.25 }).observe(section);

  window.addEventListener('resize', () => { resize(); initButterflies(); });
}
