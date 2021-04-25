class Game {
  constructor(width, height) {
    this.screen = {
      width: width,
      height: height,
    };

    createCanvas(this.screen.width, this.screen.height);

    this.leasers = [];

    Player.screen = this.screen;
    this.player = new Player(this.screen.width / 2, 640, 10, 5, this);

    Bullet.screen = this.screen;
    this.bullets = [];

    Enemy.screen = this.screen;
    Enemy.game = this;
    this.enemys = [];
    this.enemys.push(new Enemy(this.screen.width / 2, 0, 12));

    this.death = 0;
  }

  draw() {
    background(64);

    this.leasers.forEach(l => {
      l.draw();
      l.update();
    });

    this.enemys.forEach(e => {
      e.draw();
      e.update();
    });

    for(let l of this.leasers) {
      for(let e of this.enemys) {
        if(e.isCollidedWithPoint(l.pos)) {
          l.isAlive = false;
          e.isAlive = false;
        }
      }
    }

    this.leasers = this.leasers.filter(l => l.isAlive);
    this.enemys = this.enemys.filter(e => e.isAlive);

    this.bullets.forEach(b => {
      b.draw();
      b.update();
    });

    this.bullets = this.bullets.filter(b => b.isAlive);

    this.player.draw();
    this.player.update();

    for(let b of this.bullets) {
      if(this.player.isCollidedWithCircle(b)) {
        this.player.isAlive = false;
      }
    }

    for(let e of this.enemys) {
      if(this.player.isCollidedWithCircle(e)) {
        this.player.isAlive = false;
      }
    }

    if(!this.player.isAlive) {
      this.player.pos.x = this.screen. width / 2;
      this.player.pos.y = 640;
      this.player.isAlive = true;
      this.death++;
    }

    if(this.enemys.length == 0) {
      this.enemys.push(new Enemy(this.screen.width / 2, -100, 12));
    }

    push();
    textSize(24);
    fill(220);
    text('Death Counter: ' + this.death, 10, 40);
    pop();
  }

  keyPressed(code) {
    this.player.keyPressed(code);
  }

  keyReleased(code) {
    this.player.keyReleased(code);
  }

}
