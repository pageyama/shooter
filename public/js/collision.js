class CircleCollision extends Actor {
  constructor(x, y, r, vel) {
    super(x, y, vel);
    this.r = r;
  }

  isCollidedWithCircle(c) {
    const x2 = Math.pow(this.pos.x - c.pos.x, 2);
    const y2 = Math.pow(this.pos.y - c.pos.y, 2);
    const r2 = Math.pow(this.r + c.r, 2);

    return x2 + y2 <= r2;
  }

  isCollidedWithPoint(p) {
    const x2 = Math.pow(this.pos.x - p.x, 2);
    const y2 = Math.pow(this.pos.y - p.y, 2);
    const r2 = Math.pow(this.r, 2);

    return x2 + y2 <= r2;
  }
}

