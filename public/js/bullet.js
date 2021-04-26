class Bullet extends Actor {
  static screen;
  constructor(x, y, r, color, vel) {
    super(x, y, vel);
    this.r = r;
    this.color = color;
    this.isAlive = true;
  }

  update() {
    super.update();
    if(this.isOutOfScreen()) {
      this.isAlive = false;
    }
  }

  draw() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    fill(this.color);
    ellipseMode(RADIUS);
    ellipse(0, 0, this.r, this.r);
    pop();
  }

  isOutOfScreen() {
    const right = this.pos.x + this.r;
    const left = this.pos.x - this.r;
    const top = this.pos.y - this.r;
    const w = Bullet.screen.width;
    const h = Bullet.screen.height;

    return right < 0 || left > w || top > h;
  }
}
