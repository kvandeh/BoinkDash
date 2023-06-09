var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height / 2;

function updateCounterDisplay() {
    var counterElement = document.getElementById("counter");
    counterElement.textContent = "Counter: " + counter;
}

function updateHighScoreDisplay() {
    var highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = "High Score: " + highScore;
}

var highScore = localStorage.getItem("highScore") || 0;
updateHighScoreDisplay();

function updateCounterDisplay() {
    var counterElement = document.getElementById("counter");
    counterElement.textContent = "Counter: " + counter;
}

function updateHighScoreDisplay() {
    var highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = "High Score: " + highScore;
}

function showBoinkText() {
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("boink", x - rectWidth / 2, y - rectHeight / 2 - 10);

    setTimeout(function() {
        ctx.clearRect(x - rectWidth / 2, y - rectHeight / 2 - 26, 50, 20);
        faceExpression = "(•◡•)";
    }, 1000);
}

function resetCounter() {
    if (counter > highScore) {
        highScore = counter;
        localStorage.setItem("highScore", highScore);
        updateHighScoreDisplay();
    }
    counter = 0;
    dx = getRandomSpeed();
    dy = getRandomSpeed();
    updateCounterDisplay();
}