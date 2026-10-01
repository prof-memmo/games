/**
 * FUORI REGISTRO — Core Page Controller & Particle Canvas
 */

const FuoriRegistro = {
  currentMode: 'free',
  currentPrompt: null,
  selectedRole: 'anonimo',
  canvas: null,
  ctx: null,
  particles: [],
  dissolutionParticles: [],
  animFrameId: null,

  init() {
    if (window.FuoriRegistroAudio) {
      window.FuoriRegistroAudio.init();
    }

    this.initCanvas();

    if (window.FuoriRegistroPrompts) {
      this.currentPrompt = window.FuoriRegistroPrompts.getDailyPrompt();
      const pText = document.getElementById('fr-prompt-question');
      if (pText && this.currentPrompt) {
        pText.textContent = `"${this.currentPrompt.text}"`;
      }
    }

    this.refreshCounter();
  },

  setPromptMode(mode) {
    this.currentMode = mode;
    const chipFree = document.getElementById('fr-chip-free');
    const chipGuided = document.getElementById('fr-chip-guided');
    const guidedBox = document.getElementById('fr-guided-box');

    if (mode === 'free') {
      chipFree.classList.add('active');
      chipGuided.classList.remove('active');
      if (guidedBox) guidedBox.style.display = 'none';
    } else {
      chipGuided.classList.add('active');
      chipFree.classList.remove('active');
      if (guidedBox) guidedBox.style.display = 'flex';
    }

    if (window.FuoriRegistroAudio) window.FuoriRegistroAudio.playSoftClick();
  },

  shufflePrompt() {
    if (!window.FuoriRegistroPrompts) return;
    const next = window.FuoriRegistroPrompts.getRandomPrompt(this.currentPrompt ? this.currentPrompt.id : null);
    this.currentPrompt = next;
    const pText = document.getElementById('fr-prompt-question');
    if (pText && next) {
      pText.style.opacity = '0';
      pText.style.transform = 'translateY(4px)';
      setTimeout(() => {
        pText.textContent = `"${next.text}"`;
        pText.style.transition = 'all 0.3s ease';
        pText.style.opacity = '1';
        pText.style.transform = 'translateY(0)';
      }, 150);
    }
    if (window.FuoriRegistroAudio) window.FuoriRegistroAudio.playSoftClick();
  },

  selectRole(role) {
    this.selectedRole = role;
    document.querySelectorAll('.fr-role-btn').forEach(btn => {
      if (btn.getAttribute('data-role') === role) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
    if (window.FuoriRegistroAudio) window.FuoriRegistroAudio.playSoftClick();
  },

  onTextChange() {
    const textarea = document.getElementById('fr-thought-text');
    const btn = document.getElementById('fr-release-btn');
    const counter = document.getElementById('fr-char-count');
    if (!textarea) return;

    const len = textarea.value.trim().length;
    if (counter) counter.textContent = `${textarea.value.length} / 2000`;
    if (btn) btn.disabled = len < 3;
  },

  async releaseThought() {
    const textarea = document.getElementById('fr-thought-text');
    const btn = document.getElementById('fr-release-btn');
    const writingCard = document.getElementById('fr-writing-card');
    const successScreen = document.getElementById('fr-success-screen');

    if (!textarea || textarea.value.trim().length < 3) return;
    const textContent = textarea.value.trim();
    if (btn) btn.disabled = true;

    if (window.FuoriRegistroAudio) {
      window.FuoriRegistroAudio.playReleaseChime();
    }

    const cardRect = writingCard.getBoundingClientRect();
    this.spawnDissolutionParticles(cardRect.left + cardRect.width / 2, cardRect.top + cardRect.height / 2, 80);

    writingCard.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    writingCard.style.opacity = '0';
    writingCard.style.transform = 'scale(0.95) translateY(-15px)';

    if (window.FuoriRegistroThoughts) {
      await window.FuoriRegistroThoughts.sendAnonymousThought({
        text: textContent,
        promptId: this.currentMode === 'guided' && this.currentPrompt ? this.currentPrompt.id : null,
        role: this.selectedRole
      });
      this.refreshCounter();
    }

    setTimeout(() => {
      writingCard.style.display = 'none';
      if (successScreen) {
        successScreen.style.display = 'flex';
        window.scrollTo({ top: successScreen.offsetTop - 100, behavior: 'smooth' });
      }
    }, 700);
  },

  resetForm() {
    const textarea = document.getElementById('fr-thought-text');
    const writingCard = document.getElementById('fr-writing-card');
    const successScreen = document.getElementById('fr-success-screen');

    if (textarea) textarea.value = '';
    this.onTextChange();

    if (successScreen) successScreen.style.display = 'none';
    if (writingCard) {
      writingCard.style.display = 'block';
      setTimeout(() => {
        writingCard.style.opacity = '1';
        writingCard.style.transform = 'none';
      }, 50);
    }

    if (window.FuoriRegistroAudio) window.FuoriRegistroAudio.playSoftClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  async refreshCounter() {
    if (window.FuoriRegistroThoughts) {
      const count = await window.FuoriRegistroThoughts.getSilentCounter();
      const el = document.getElementById('fr-counter-num');
      if (el) el.textContent = count;
    }
  },

  initCanvas() {
    this.canvas = document.getElementById('ambient-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    this.particles = [];
    const count = Math.min(window.innerWidth > 768 ? 70 : 35, 80);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1,
        color: Math.random() > 0.3 ? '212, 175, 55' : '192, 132, 252'
      });
    }

    this.animate();
  },

  spawnDissolutionParticles(centerX, centerY, num) {
    for (let i = 0; i < num; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.dissolutionParticles.push({
        x: centerX + (Math.random() - 0.5) * 150,
        y: centerY + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        radius: Math.random() * 3 + 1,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
        color: Math.random() > 0.2 ? '251, 224, 122' : '255, 255, 255'
      });
    }
  },

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) {
        p.y = this.canvas.height;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${p.color}, 0.5)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    for (let i = this.dissolutionParticles.length - 1; i >= 0; i--) {
      const dp = this.dissolutionParticles[i];
      dp.x += dp.vx;
      dp.y += dp.vy;
      dp.vy += 0.02;
      dp.life -= dp.decay;
      dp.alpha = Math.max(0, dp.life);

      if (dp.life <= 0) {
        this.dissolutionParticles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(dp.x, dp.y, dp.radius * dp.life, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${dp.color}, ${dp.alpha})`;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = `rgba(${dp.color}, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  FuoriRegistro.init();
});

window.FuoriRegistro = FuoriRegistro;
