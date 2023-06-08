// JavaScript code remains the same...

console.log("hello world")

// Update the counter display
function updateCounterDisplay() {
    var counterElement = document.getElementById("counter");
    counterElement.textContent = "Counter: " + counter;
}

// Update the high score display
function updateHighScoreDisplay() {
    var highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = "High Score: " + highScore;
}


// Get the canvas element and its context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Set initial position
var x = canvas.width / 2;
var y = canvas.height / 2;

// Generate random initial velocities for x and y directions
var dx = getRandomSpeed();
var dy = getRandomSpeed();

// Rectangle dimensions
var rectWidth = 100;
var rectHeight = 80;

// Current color
var currentColor = getRandomColor();

// Face expression
var faceExpression = "(•◡•)";

// Counter
var counter = 0;

// High Score
var highScore = localStorage.getItem("highScore") || 0;
updateHighScoreDisplay();

// Update the counter display
function updateCounterDisplay() {
    var counterElement = document.getElementById("counter");
    counterElement.textContent = "Counter: " + counter;
}

// Update the high score display
function updateHighScoreDisplay() {
    var highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = "High Score: " + highScore;
}

// Animation loop
function animate() {
    // Set a semi-transparent color to clear the canvas
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a moving rectangle
    ctx.fillStyle = currentColor;
    ctx.fillRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);

    // Draw face inside the rectangle
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(faceExpression, x, y);

    // Update position
    x += dx;
    y += dy;

    // Reverse direction if hitting the canvas boundaries
    if (x + dx > canvas.width - rectWidth / 2 || x + dx < rectWidth / 2) {
        dx = -dx;
        currentColor = getRandomColor();
        faceExpression = "(ಠ_ಠ)";
        showBoinkText();
        resetCounter();
    }
    if (y + dy > canvas.height - rectHeight / 2 || y + dy < rectHeight / 2) {
        dy = -dy;
        currentColor = getRandomColor();
        faceExpression = "(ಠ_ಠ)";
        showBoinkText();
        resetCounter();
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
}



// Show "boink" text near the rectangle
function showBoinkText() {
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("boink", x - rectWidth / 2, y - rectHeight / 2 - 10);

    // Clear the text after a second
    setTimeout(function() {
        ctx.clearRect(x - rectWidth / 2, y - rectHeight / 2 - 26, 50, 20);
        faceExpression = "(•◡•)";
    }, 1000);
}

// Reset the counter
function resetCounter() {
    if (counter > highScore) {
        highScore = counter;
        localStorage.setItem("highScore", highScore);
        updateHighScoreDisplay();
    }
    counter = 0;
    updateCounterDisplay();
}

// Event listener for click event on canvas
canvas.addEventListener("click", function(event) {
    // Get the position of the click relative to the canvas
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    // Check if the click occurred within the boundaries of the rectangle
    if (
        clickX >= x - rectWidth / 2 &&
        clickX <= x + rectWidth / 2 &&
        clickY >= y - rectHeight / 2 &&
        clickY <= y + rectHeight / 2
    ) {
        // Change the direction of the rectangle
        dx = getRandomSpeed();
        dy = getRandomSpeed();

        // Increment the counter
        counter++;
        updateCounterDisplay();
    }
});

// Start the animation
animate();