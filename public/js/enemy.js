class Enemy extends CircleCollision {

  static screen;
  static game;

  constructor(x, y, r) {
    super(x, y, r, createVector(0, 1));
    this.isAlive = true;
    this.counter = 0;
  }

  update() {
    super.update();

    this.vel.x = Math.sin(this.counter * 0.05) * 4;

    if(this.isOutofScreen()) {
      this.isAlive = false;
    }

    this.counter++;
    if(this.counter % 60 == 0) {
      const vel = createVector(0, 3);
      Enemy.game.bullets.push(new Bullet(this.pos.x, this.pos.y, 6, 240, vel));
    }
  }

  draw() {
    push();
    noStroke();
    rectMode(RADIUS);
    translate(this.pos.x, this.pos.y);
    fill(240);
    rect(0, 0, this.r, this.r);
    pop();
  }

  isOutofScreen() {
    const top = this.pos.y - this.r;
    const h = Enemy.screen.height;

    return top > h;
  }
}
