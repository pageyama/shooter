class Enemy extends CircleCollision {

  static screen;
  static game;

  constructor(x, y, r) {
    super(x, y, r);
    this.isAlive = true;
    this.counter = 0;
  }

  update() {
    const  center = Enemy.screen.width / 2;
    this.pos.x = center + Math.sin(millis() / 1000) * center * 0.8;
    this.pos.y += 1;
    if(this.isOutofScreen()) {
      this.isAlive = false;
    }

    this.counter++;
    if(this.counter > 60) {
      Enemy.game.bullets.push(new Bullet(this.pos.x, this.pos.y, 6, 240, 3));
      this.counter = 0;
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
