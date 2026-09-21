/**
 * ==========================================================
 * PARTICLES & MAGICAL SPELL EFFECTS ENGINE
 * ==========================================================
 */

class MagicalParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.bursts = [];
    this.wandTrail = [];
    this.maxAmbientParticles = 65;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.lastMouseX = -1000;
    this.lastMouseY = -1000;
    this.isTouch = false;

    this.resize();
    this.initAmbientParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initAmbientParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxAmbientParticles; i++) {
      this.particles.push(this.createAmbientParticle());
    }
  }

  createAmbientParticle() {
    const isGold = Math.random() > 0.35;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.2 + 0.8,
      color: isGold ? '243, 229, 171' : '224, 86, 253', // Gold vs soft amethyst
      alpha: Math.random() * 0.7 + 0.2,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      oscillation: Math.random() * Math.PI * 2,
      oscSpeed: Math.random() * 0.02 + 0.01,
      pulseSpeed: Math.random() * 0.03 + 0.01
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    const handlePointerMove = (x, y) => {
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
      this.mouseX = x;
      this.mouseY = y;

      // Create wand sparkle trail
      if (Math.hypot(x - this.lastMouseX, y - this.lastMouseY) > 4) {
        for (let i = 0; i < 2; i++) {
          this.wandTrail.push({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            radius: Math.random() * 2.5 + 1.2,
            color: Math.random() > 0.4 ? '255, 215, 0' : '255, 255, 255',
            alpha: 1,
            decay: Math.random() * 0.03 + 0.025,
            rotation: Math.random() * 360
          });
        }
      }
    };

    window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  burstSparks(x, y, count = 25, colorType = 'gold') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      let rgb = '243, 229, 171'; // gold
      if (colorType === 'magic') {
        rgb = Math.random() > 0.5 ? '224, 86, 253' : '104, 109, 224';
      } else if (colorType === 'fire') {
        rgb = Math.random() > 0.5 ? '255, 121, 63' : '255, 215, 0';
      }
      this.bursts.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1.5,
        color: rgb,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        gravity: 0.08
      });
    }
  }

  burstConfetti(x, y, count = 80) {
    const colors = ['#f1c40f', '#e67e22', '#e056fd', '#686de0', '#ffffff', '#badc58'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      this.bursts.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 4,
        colorHex: colors[Math.floor(Math.random() * colors.length)],
        isConfetti: true,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        gravity: 0.15
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Render ambient floating embers
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.oscillation += p.oscSpeed;
      p.x += Math.sin(p.oscillation) * 0.4 + p.speedX;
      p.y += p.speedY;

      // Pulse alpha
      p.alpha += Math.sin(p.oscillation) * 0.01;
      const currentAlpha = Math.max(0.15, Math.min(0.9, p.alpha));

      // Draw glowing particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      this.ctx.fill();

      // Reset when offscreen top or sides
      if (p.y < -10 || p.x < -20 || p.x > this.width + 20) {
        this.particles[i] = this.createAmbientParticle();
        this.particles[i].y = this.height + 10;
      }
    }

    // 2. Render wand sparkle trail
    for (let i = this.wandTrail.length - 1; i >= 0; i--) {
      const spark = this.wandTrail[i];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.alpha -= spark.decay;

      if (spark.alpha <= 0) {
        this.wandTrail.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(spark.x, spark.y);
      this.ctx.beginPath();
      // Draw 4-point star
      const r = spark.radius * spark.alpha;
      this.ctx.moveTo(0, -r * 2);
      this.ctx.quadraticCurveTo(0, 0, r * 2, 0);
      this.ctx.quadraticCurveTo(0, 0, 0, r * 2);
      this.ctx.quadraticCurveTo(0, 0, -r * 2, 0);
      this.ctx.quadraticCurveTo(0, 0, 0, -r * 2);
      this.ctx.fillStyle = `rgba(${spark.color}, ${spark.alpha})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `rgba(${spark.color}, 1)`;
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Render bursts and confetti
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.alpha -= b.decay;

      if (b.alpha <= 0 || b.y > this.height + 50) {
        this.bursts.splice(i, 1);
        continue;
      }

      if (b.isConfetti) {
        this.ctx.save();
        this.ctx.translate(b.x, b.y);
        b.rotation += b.rotSpeed;
        this.ctx.rotate((b.rotation * Math.PI) / 180);
        this.ctx.fillStyle = b.colorHex;
        this.ctx.globalAlpha = b.alpha;
        this.ctx.fillRect(-b.size / 2, -b.size / 4, b.size, b.size / 2);
        this.ctx.restore();
      } else {
        this.ctx.beginPath();
        this.ctx.arc(b.x, b.y, b.radius * b.alpha, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${b.color}, ${b.alpha})`;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = `rgba(${b.color}, 1)`;
        this.ctx.fill();
      }
    }

    // Reset shadow blur
    this.ctx.shadowBlur = 0;
    requestAnimationFrame(() => this.animate());
  }
}

window.MagicalParticles = MagicalParticles;
