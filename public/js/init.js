export function vector1(x) {
  this.x = x;

  this.set = (x) => {
    this.x = x;
  }
}

export function vector2(x,y) {
  console.log(x,y)
  this.x = x;
  this.y = y;

  this.set = (x,y) => {
    this.x = x;
    this.y = y;
  }
}

export let canvas = document.getElementById("canvas");
export let cube = document.getElementById("cube");
export let eyes = document.getElementById("eyes");

export let velocity = new vector2(0, 0);
export let position = new vector2(
  canvas.clientWidth / 2 - cube.clientWidth / 2,
  canvas.clientHeight / 2 - cube.clientHeight / 2,
);

export let highscoreCounter = document.getElementById("highscore");
export let highscore = new vector1(localStorage.getItem("highscore") || 0);
export let scoreCounter = document.getElementById("score");
export let score = new vector1(0);

export let tickrate = 1000 / 64

export function getVelocityVector1 () {
  return (Math.random() - 0.5) * 500 + (Math.random() - 0.5) * score.x * 1.5^score.x
}

export function changeVelocity() {
  velocity.set(
    getVelocityVector1(),
    getVelocityVector1()
  );

  console.log(velocity);
}

export function changeColor() {
  let r = Math.random()
  let g = Math.random()
  let b = Math.random()
  let t = 255 * 2 * Math.min(Math.random(), .75)

  cube.style.backgroundColor = "rgb("+t * (r / (r + b + g))+","+t * (g / (r + b + g))+","+t * (b / (r + b + g))+")";
}

export function hitUpdate() {
  if (position.x <= 0 || position.x >= canvas.clientWidth - cube.clientWidth) {
    velocity.x *= -1
  } else if (position.y <= 0 || position.y >= canvas.clientHeight - cube.clientHeight) {
    velocity.y *= -1
  } else {return}

  position.set(
    Math.max(Math.min(position.x, canvas.clientWidth - cube.clientWidth), 0),
    Math.max(Math.min(position.y, canvas.clientHeight - cube.clientHeight), 0)
  )

  if (score.x > highscore.x) {
    highscore.set(score.x);
    localStorage.setItem("highscore", score.x);
  }

  score.set(0)

  changeColor()

  let oldSpeed = Math.max(Math.abs((velocity.x^2 + velocity.y^2)^0.5), 5)
  let newSpeed = Math.max(Math.abs((getVelocityVector1()^2 * 2)^0.5), 5)

  let ratio = Math.min(newSpeed / oldSpeed, 1.5)

  console.log(newSpeed, oldSpeed, ratio)

  velocity.set(
    velocity.x * ratio,
    velocity.y * ratio,
  )
}

export function update() {
  cube.style.left = position.x + "px";
  cube.style.top = position.y + "px";

  cube.style.transition = tickrate + "ms linear;"

  scoreCounter.innerHTML = score.x;
  highscoreCounter.innerHTML = "High Score: " + highscore.x;

  let x = (velocity.x / Math.max(Math.abs(velocity.x) + Math.abs(velocity.y))) * 5 - 2.5
  let y = (velocity.y / Math.max(Math.abs(velocity.x) + Math.abs(velocity.y))) * 5 - 2.5

  console.log(x,y)

  eyes.style.transform = "translate("+x+"px, "+y+"px)";
}

export function tick() {
  position.set(
    position.x + velocity.x * tickrate / 1000,
    position.y + velocity.y * tickrate / 1000
  );

  hitUpdate();
  update();
}
