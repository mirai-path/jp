class SakuraPetal {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
    this.y = Math.random() * canvas.height; // Distribute initial petals randomly across height
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 6; // Size between 6px and 14px
    this.speedY = Math.random() * 1.2 + 0.8; // Vertical fall speed
    this.speedX = Math.random() * 1.5 - 0.5; // Wind speed / base drift
    this.oscillationSpeed = Math.random() * 0.02 + 0.01; // Sway frequency
    this.oscillationDistance = Math.random() * 1.5 + 0.5; // Sway amplitude
    this.angle = Math.random() * 360;
    this.rotationSpeed = Math.random() * 1.5 - 0.75; // Rotate rate
    this.opacity = Math.random() * 0.4 + 0.5; // Opacity 0.5 - 0.9 for depth
    // Curated shades of cherry blossom pink
    const pinkShades = [
      'rgba(255, 183, 178, opacity)', // Soft light pink
      'rgba(255, 200, 221, opacity)', // Sakura blush
      'rgba(255, 175, 204, opacity)', // Rich blossom pink
      'rgba(255, 133, 161, opacity)'  // Highlight deep pink
    ];
    const shade = pinkShades[Math.floor(Math.random() * pinkShades.length)];
    this.color = shade;
  }

  draw() {
    this.ctx.save();
    const currentColor = this.color.replace('opacity', this.opacity.toFixed(2));
    this.ctx.fillStyle = currentColor;
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle * Math.PI / 180);
    
    // Draw an elegant cherry blossom petal using bezier curves
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    // Draw left half of petal
    this.ctx.bezierCurveTo(-this.size * 0.8, -this.size * 0.3, -this.size * 0.6, -this.size * 1.2, 0, -this.size * 1.5);
    // Draw right half of petal with tiny notch at the tip
    this.ctx.bezierCurveTo(this.size * 0.6, -this.size * 1.2, this.size * 0.8, -this.size * 0.3, 0, 0);
    
    this.ctx.shadowBlur = 4;
    this.ctx.shadowColor = 'rgba(255, 117, 143, 0.2)';
    this.ctx.fill();
    this.ctx.restore();
  }

  update() {
    this.y += this.speedY;
    // Oscillate horizontal drift mimicking wind currents
    this.x += this.speedX + Math.sin(this.y * this.oscillationSpeed) * this.oscillationDistance;
    this.angle += this.rotationSpeed;

    // Reset if it drifts off bottom or sides of screen
    if (this.y > this.canvas.height + 20 || this.x < -20 || this.x > this.canvas.width + 20) {
      this.reset();
    }
  }
}

class SakuraEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.active = true;
    this.maxPetals = 40; // Default count, optimized for performance

    this.resizeCanvas();
    this.init();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Adjust density based on screen size
    if (window.innerWidth < 768) {
      this.maxPetals = 20;
    } else {
      this.maxPetals = 40;
    }
  }

  init() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(new SakuraPetal(this.canvas));
    }
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.animate();
  }

  stop() {
    this.active = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  toggle() {
    if (this.active) {
      this.stop();
    } else {
      this.start();
    }
    return this.active;
  }

  animate() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.petals.length; i++) {
      this.petals[i].update();
      this.petals[i].draw();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const engine = new SakuraEngine('sakura-canvas');
  if (engine.canvas) {
    engine.animate();
    window.sakuraEngine = engine; // Expose globally to let user toggle it
  }
});
