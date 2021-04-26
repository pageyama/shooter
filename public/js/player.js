class Player extends CircleCollision{
  static screen;
  static game;

  constructor(x, y, r, s) {
    super(x, y, r);
    this.speed = s;

    const tan = Math.sqrt(3) * this.r;
    this.vertex = [-tan, this.r, tan, this.r, 0, -2 * this.r];

    this.isAlive = true;
  }

  update() {
    super.update();

    if(this.pos.x + this.vertex[0] < 0) {
      this.pos.x = -this.vertex[0];
    } else if (this.pos.x + this.vertex[2] > Player.screen.width) {
      this.pos.x = Player.screen.width - this.vertex[2];
    }

    if(this.pos.y + this.vertex[5] < 0) {
      this.pos.y = -this.vertex[5];
    } else if (this.pos.y + this.vertex[1] > Player.screen.height) {
      this.pos.y = Player.screen.height - this.vertex[1];
    }

  }

  draw() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    fill(color(220));
    triangle(this.vertex[0], this.vertex[1], this.vertex[2], this.vertex[3], this.vertex[4], this.vertex[5]);
    fill(color(255));
    ellipseMode(RADIUS);
    ellipse(0, 0, this.r, this.r);
    pop();
  }

  keyPressed(code) {
    if(code == LEFT_ARROW || code == RIGHT_ARROW || code == UP_ARROW || code ==DOWN_ARROW) {

      if(code === LEFT_ARROW) {
        this.vel.x = -this.speed;
      } else if(code === RIGHT_ARROW) {
        this.vel.x = this.speed;
      }else if(code === UP_ARROW) {
        this.vel.y = -this.speed;
      } else if(code === DOWN_ARROW) {
        this.vel.y = this.speed;
      }

      if(this.vel.x != 0 && this.vel.y != 0) {
        this.vel.setMag(this.speed);
      }
    }

    if(code == 32) {
      const leaser = new Leaser(this.pos.x, this.pos.y, 8, 4, 240, 12);
      Player.game.leasers.push(leaser);
    }
  }

  keyReleased(code) {
    if(code == LEFT_ARROW || code == RIGHT_ARROW || code == UP_ARROW || code ==DOWN_ARROW) {
      if(code === LEFT_ARROW || code === RIGHT_ARROW) {
        this.vel.x = 0;
      } else if(code === UP_ARROW || code === DOWN_ARROW) {
        this.vel.y = 0;
      }

      if(this.vel.x != 0 || this.vel.y != 0) {
        this.vel.setMag(this.speed);
      }
    }
  }
}
