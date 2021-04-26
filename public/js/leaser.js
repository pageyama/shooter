class Leaser extends Actor {
  constructor(x, y, length, weight, color, speed) {
    super(x, y, createVector(0, -speed));
    this.length = length;
    this.weight = weight;
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
    translate(this.pos.x, this.pos.y);
    stroke(this.color);
    strokeWeight(this.weight);
    line(0, 0, 0, this.length);
    pop();
  }

  isOutOfScreen() {
    return this.pos.y + this.length < 0;
  }
}
