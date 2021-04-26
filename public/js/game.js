class Game {
  constructor(width, height) {
    this.screen = {
      width: width,
      height: height,
    };

    createCanvas(this.screen.width, this.screen.height);

    this.leasers = [];

    Player.screen = this.screen;
    Player.game = this;
    this.player = new Player(this.screen.width / 2, 640, 10, 5, this);

    Bullet.screen = this.screen;
    this.bullets = [];

    Enemy.screen = this.screen;
    Enemy.game = this;
    this.enemys = [];

    this.particleSystem = new ParticleSystem();

    this.spawnCounter = 0;
    this.kill = 0;
    this.death = 0;
  }

  draw() {
    background(64);

    //draw and update
    this.player.draw();
    this.player.update();
    this.enemys.forEach(drawAndUpdate);
    this.leasers.forEach(drawAndUpdate);
    this.bullets.forEach(drawAndUpdate);

    //collision detection
    for(let l of this.leasers) {
      for(let e of this.enemys) {
        if(e.isCollidedWithPoint(l.pos)) {
          l.isAlive = false;
          e.isAlive = false;
          breakEnemy(e, this.particleSystem);
          this.kill++;
        }
      }
    }

    for(let b of this.bullets) {
      if(this.player.isCollidedWithCircle(b)) {
        b.isAlive = false;
        this.player.isAlive = false;
      }
    }

    for(let e of this.enemys) {
      if(this.player.isCollidedWithCircle(e)) {
        this.player.isAlive = false;
      }
    }

    //fiter dead actor
    this.leasers = this.leasers.filter(isAlive);
    this.enemys = this.enemys.filter(isAlive);
    this.bullets = this.bullets.filter(isAlive);

    if(!this.player.isAlive) {
      this.death++;
      this.player.isAlive = true;
    }

    this.particleSystem.drawAndUpdate();

    this.spawnEnemy();

    //draw kill and death counter
    push();
    textSize(24);
    fill(220);
    text('Kill: ' + this.kill, 16, 40);
    text('Death: ' + this.death, 16, 80);
    pop();
  }

  spawnEnemy() {
    this.spawnCounter++;
    if(this.enemys.length > 2 || this.spawnCounter % 100 != 0) {
      return;
    }

    const x = Math.random() * this.screen.width * 0.5 + this.screen.width * 0.25;

    this.enemys.push(new Enemy(x, -100, 12));
  }

  keyPressed(code) {
    this.player.keyPressed(code);
  }

  keyReleased(code) {
    this.player.keyReleased(code);
  }

}

function drawAndUpdate(a) {
  a.draw();
  a.update();
}

function isAlive(a) {
  return a.isAlive;
}

function breakEnemy(enemy, particleSystem) {
  const x = enemy.pos.x;
  const y = enemy.pos.y;
  for(let i = 0; i < 8; i++) {
    const vel = createVector(1, 0);
    vel.rotate(TWO_PI / 8 * i);
    const p = new SquareParticle(x, y, 32, 3, vel);
    particleSystem.add(p);
  }
}
