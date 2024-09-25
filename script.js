console.log("Game script loaded");

let dino = document.getElementById("dino");
let gameContainer = document.getElementById("game");
let isGameOver = false;

function createCactus() {
    let cactus = document.createElement("div");
    cactus.classList.add("obstacle");
    cactus.style.right = "0px";
    cactus.innerHTML = '<img src="cactus.png" alt="Cactus">';
    gameContainer.appendChild(cactus);
    return cactus;
}

let activeCactus = createCactus();

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && !isGameOver) {
        jump();
    }
});

function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(function() {
            dino.classList.remove("jump");
        }, 500);
    }
}

function moveCactus() {
    let gameWidth = gameContainer.offsetWidth;
    let cactusWidth = activeCactus.offsetWidth;
    let position = parseInt(window.getComputedStyle(activeCactus).getPropertyValue("right"));
    if (position > gameWidth) {
        activeCactus.style.right = "0px";
    } else {
        activeCactus.style.right = (position + gameWidth / 200) + "px";
    }
}

function checkCollision() {
    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = activeCactus.getBoundingClientRect();

    // Calculate the collision buffer (adjust these values as needed)
    let horizontalBuffer = dinoRect.width * 0.3; // 30% of dino width
    let verticalBuffer = dinoRect.height * 0.1; // 10% of dino height

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


let gameLoop = setInterval(function() {
    if (!isGameOver) {
        moveCactus();
        checkCollision();
    }
}, 20);

function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);
}

function resetGame() {
    isGameOver = false;
    activeCactus.style.right = "0px";
    gameLoop = setInterval(function() {
        if (!isGameOver) {
            moveCactus();
            checkCollision();
        }
    }, 20);
}

// Handle window resizing
window.addEventListener('resize', function() {
    if (isGameOver) {
        activeCactus.style.right = "0px";
    }
});