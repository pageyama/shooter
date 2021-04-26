class Actor {
  constructor(x, y, vel) {
    this.pos = createVector(x, y);
    if(vel == undefined) {
      this.vel = createVector(0, 0);
    } else {
      this.vel = vel;
    }
  }

  update() {
    this.pos.add(this.vel);
  }
}
