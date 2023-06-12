import * as self from "/public/js/init.js"; // Importing utilities

// Auto click prevention init
let clickRefresh = Date.now();
let clicks = 0;

// Randomising at start
self.changeVelocity();
self.changeColor();
self.cube.style.display = "block";

// Click Event
self.canvas.addEventListener("click", function(event) {
  clicks++

  // Auto click prevention
  if (Date.now() - clickRefresh > 1000) {clicks = 0; clickRefresh = Date.now()}
  if (clicks > 15) {alert(
    ["Stop the cap.", "You aint click that fast.", "Get outta here.", "You need better cheats.", "Who cheats on single player browser games?", "R.I.P. \"your\" highscore."][Math.floor(Math.random() * 5)]
    ); close(); window.close;}
  if (clicks > 5) {return}

  if (!(event.pageX >= self.cube.offsetLeft + self.canvas.offsetLeft && // Check if mouse pos is within Cube, if not break function
        event.pageX <= self.cube.offsetLeft + self.canvas.offsetLeft + self.cube.clientWidth &&
        event.pageY >= self.cube.offsetTop + self.canvas.offsetTop &&
        event.pageY <= self.cube.offsetTop + self.canvas.offsetTop + self.cube.clientHeight)) {return}

  self.changeVelocity();
  self.score.set(self.score.x + 1);
  self.changeColor();
});

window.setInterval(self.tick, self.tickrate);
