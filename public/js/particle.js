class Particle extends Actor {
  constructor(x, y, l, vel) {
    super(x, y, vel);
    this.lifespan = l;
  }

  update() {
    super.update();
    this.lifespan--;
  }

  get isAlive() {
    return this.lifespan > 0;
  }
}

class ParticleSystem {
  particles = [];

  constructor() {

  }

  add(p) {
    this.particles.push(p);
  }

  drawAndUpdate() {
    this.particles.forEach(p => {
      p.draw();
      p.update();
    });

    this.particles = this.particles.filter(p => p.isAlive);
  }
}

class SquareParticle extends Particle {
  constructor(x, y, l, s, vel) {
    super(x, y, l, vel);
    this.life = l;
    this.size = s;
  }

  draw() {
    push();
    noStroke();
    rectMode(RADIUS);
    translate(this.pos.x, this.pos.y);
    fill(240, 240 * (this.lifespan / this.life));
    rect(0, 0, this.size, this.size);
    pop();
  }
}
