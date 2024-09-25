console.log("Game script loaded");

let dino = document.getElementById("dino");
let gameContainer = document.getElementById("game");
let isGameOver = false;

// Function to create and return a cactus
function createCactus() {
    let cactus = document.createElement("div");
    cactus.classList.add("obstacle");
    cactus.style.right = "0px";
    cactus.innerHTML = '<img src="cactus.png" alt="Cactus">';
    gameContainer.appendChild(cactus);
    return cactus;
}

let activeCactus = createCactus();

// Event listener for jumping
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && !isGameOver) {
        jump();
    }
});

// Add touch event listener for mobile
gameContainer.addEventListener("touchstart", function() {
    if (!isGameOver) {
        jump();
    }
});

// Function to handle jumping
function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(function() {
            dino.classList.remove("jump");
        }, 500); // Duration of the jump animation
    }
}

// Function to move the cactus
function moveCactus() {
    let gameWidth = gameContainer.offsetWidth;
    let position = parseInt(window.getComputedStyle(activeCactus).getPropertyValue("right"));
    if (position > gameWidth) {
        activeCactus.style.right = "0px"; // Reset cactus position
    } else {
        activeCactus.style.right = (position + gameWidth / 200) + "px"; // Move cactus
    }
}

// Function to check for collisions
function checkCollision() {
    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = activeCactus.getBoundingClientRect();

    // Calculate collision buffer
    let horizontalBuffer = dinoRect.width * 0.3; // 30% of dino width
    let verticalBuffer = dinoRect.height * 0.1; // 10% of dino height

    // Collision detection logic
    if (
        dinoRect.right - horizontalBuffer > cactusRect.left &&
        dinoRect.left + horizontalBuffer < cactusRect.right &&
        dinoRect.bottom - verticalBuffer > cactusRect.top
    ) {
        console.log("Collision detected!");
        alert("Game Over!");
        endGame();
    }
}

// Main game loop
let gameLoop = setInterval(function() {
    if (!isGameOver) {
        moveCactus();
        checkCollision();
    }
}, 20);

// Function to end the game
function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);
}

// Function to reset the game (optional)
function resetGame() {
    isGameOver = false;
    activeCactus.style.right = "0px";
}
