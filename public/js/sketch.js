const screen = {
  width: 480,
  height: 720,
};

let game;

function setup() {
  game = new Game(screen.width, screen.height);
}

function draw() {
  game.draw();
}

function keyPressed() {
  game.keyPressed(keyCode);
}

function keyReleased() {
  game.keyReleased(keyCode);
}
