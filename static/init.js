var counter = 0;
var dx = getRandomSpeed();
var dy = getRandomSpeed();

var rectWidth = 100;
var rectHeight = 80;

var currentColor = getRandomColor();
var faceExpression = "(•◡•)";

function getRandomSpeed() {
    return (Math.random() - 0.5) * 1.025**counter;
}

function getRandomColor() {
    var letters = "ABCDEF";
    var color = "#";
    for (var i = 0; i < 4; i++) {
        color += letters[Math.floor(Math.random() * 6)];
    }
    
    return color;
}