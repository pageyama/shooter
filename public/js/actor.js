class Actor {
  constructor(x, y, vx = 0, vy = 0) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
  }

  update() {
    this.pos.add(this.vel);
  }
}
