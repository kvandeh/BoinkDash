function animate() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = currentColor;
    ctx.fillRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(faceExpression, x, y);

    x += dx;
    y += dy;

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

    requestAnimationFrame(animate);
}

canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    if (
        clickX >= x - rectWidth / 2 &&
        clickX <= x + rectWidth / 2 &&
        clickY >= y - rectHeight / 2 &&
        clickY <= y + rectHeight / 2
    ) {
        dx = getRandomSpeed();
        dy = getRandomSpeed();
        counter++;
        updateCounterDisplay();
    }
});

animate();