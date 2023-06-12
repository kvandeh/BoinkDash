export function vector1(x) { // Defining vector1 rule set (duplicated single value objects)
  this.x = x;
  this.set = (x) => {this.x = x;}
};

export function vector2(x,y) { // Defining vector2 rule set (duplicated double value objects)
  this.x = x; this.y = y;
  this.set = (x,y) => {this.x = x; this.y = y;}
};

// Element Constands
export const canvas = document.getElementById("canvas");
export const cube = document.getElementById("cube");
export const eyes = document.getElementById("eyes");
export const highscoreCounter = document.getElementById("highscore");
export const scoreCounter = document.getElementById("score");

// Force Object Constants
export const velocity = new vector2(0, 0);
export const position = new vector2(canvas.clientWidth / 2 - cube.clientWidth / 2, canvas.clientHeight / 2 - cube.clientHeight / 2);

// Game Values
export let highscore = new vector1(localStorage.getItem("highscore") || 0);
export let score = new vector1(0);

// Game Settings
export let tickrate = 1000 / 32; // Updates 32 times per second
export let refreshFace = Date.now(); // Defines default time for when to reset face type
export let cColor = [0,0,0]; // Defines default color value

// Change functions
export function getVelocityVector1 () {return (150 + Math.random() * 50) * 1.05^score.x * (Math.random() * 2 - 1)}
export function changeVelocity() {velocity.set(getVelocityVector1(), getVelocityVector1());}

export function changeColor() {
  let r = Math.random();
  let g = Math.random();
  let b = Math.random();
  let t = 255 * 2 * Math.min(Math.random(), .75);

  cColor = [t * (r / (r + b + g)), t * (g / (r + b + g)), t * (b / (r + b + g))];
  cube.style.backgroundColor = "rgb("+cColor[0]+","+cColor[1]+","+cColor[2]+")";
}

// Updates
export function hitUpdate() {
  if (Date.now() - refreshFace > 0) {eyes.innerHTML = "•◡•"} else {eyes.innerHTML = "ಠ_ಠ"};

  if (position.x <= 0 || position.x >= canvas.clientWidth - cube.clientWidth) {velocity.x *= -1;}
  else if (position.y <= 0 || position.y >= canvas.clientHeight - cube.clientHeight) {velocity.y *= -1;}
  else {return};

  changeColor();
  refreshFace = Date.now() + 500;

  position.set(Math.max(Math.min(position.x, canvas.clientWidth - cube.clientWidth), 0),
    Math.max(Math.min(position.y, canvas.clientHeight - cube.clientHeight), 0));

  if (score.x > highscore.x) {
    highscore.set(score.x);
    localStorage.setItem("highscore", score.x);
  };
  score.set(0);

  let oldSpeed = Math.max(Math.abs((velocity.x^2 + velocity.y^2)^0.5), 5);
  let newSpeed = Math.max(Math.abs((getVelocityVector1()^2 * 2)^0.5), 5);
  let ratio = Math.min(newSpeed / oldSpeed, 1.05);
  velocity.set(velocity.x * ratio, velocity.y * ratio);
}

export function update() {
  cube.style.left = position.x + "px";
  cube.style.top = position.y + "px";
  cube.style.transition = tickrate + "ms linear;"
  scoreCounter.innerHTML = score.x;
  highscoreCounter.innerHTML = "High Score: " + highscore.x;

  eyes.style.transform = "translate("+(velocity.x / Math.max(Math.abs(velocity.x) + Math.abs(velocity.y))) * 5 - 2.5+"px, "+
  (velocity.y / Math.max(Math.abs(velocity.x) + Math.abs(velocity.y))) * 5 - 2.5+"px)";
  eyes.style.color = "rgb("+Math.floor(255 - cColor[0])+","+Math.floor(255 - cColor[1])+","+Math.floor(255 - cColor[2])+")";
}

// Run function
export function tick() {
  position.set(position.x + velocity.x * tickrate / 1000, position.y + velocity.y * tickrate / 1000);

  hitUpdate();
  update();
}
