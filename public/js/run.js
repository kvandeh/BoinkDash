import * as self from "/public/js/init.js";

self.changeVelocity();
self.changeColor();
self.cube.style.display = "block";

self.canvas.addEventListener("click", function(event) {
  if (!(event.pageX >= self.cube.offsetLeft + self.canvas.offsetLeft && // Check if mouse pos is within Cube, if not break function
        event.pageX <= self.cube.offsetLeft + self.canvas.offsetLeft + self.cube.clientWidth &&
        event.pageY >= self.cube.offsetTop + self.canvas.offsetTop &&
        event.pageY <= self.cube.offsetTop + self.canvas.offsetTop + self.cube.clientHeight)) {return}

  console.log("click")

  self.changeVelocity();
  self.score.set(self.score.x + 1);
  self.changeColor();
});

window.setInterval(self.tick, self.tickrate);
