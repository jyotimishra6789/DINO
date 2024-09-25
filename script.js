let dino = document.getElementById("dino");
let obstacles = document.querySelectorAll(".obstacle");

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        jump();
    }
});

function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");

        // Adjust timeout to match the slower jump animation
        setTimeout(function() {
            dino.classList.remove("jump");
        }, 1000); // Duration matches the CSS animation (1s)
    }
}

// Check collision for each obstacle
let checkCollision = setInterval(function() {
    obstacles.forEach(function(obstacle) {
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

        if (obstacleRight > 50 && obstacleRight < 70 && dinoBottom < 40) {
            alert("Game Over!");
        }
    });
}, 10);
