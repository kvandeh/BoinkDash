// Helper function to generate random speed for velocity
function getRandomSpeed() {
    return (Math.random() - 0.5) * 4; // Adjust the multiplier for desired speed range
}

// Helper function to generate a random color
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}