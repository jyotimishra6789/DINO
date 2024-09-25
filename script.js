console.log("Game script loaded");

let dino = document.getElementById("dino");
let gameContainer = document.getElementById("game");
let isGameOver = false;

// Create and add a cactus
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
        }, 1000);
    }
}

function moveCactus() {
    let position = parseInt(window.getComputedStyle(activeCactus).getPropertyValue("right"));
    if (position > gameContainer.offsetWidth) {
        // Reset cactus position when it goes off-screen
        activeCactus.style.right = "0px";
    } else {
        activeCactus.style.right = (position + 5) + "px";
    }
}

function checkCollision() {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusRight = parseInt(window.getComputedStyle(activeCactus).getPropertyValue("right"));
    let cactusLeft = gameContainer.offsetWidth - cactusRight - activeCactus.offsetWidth;

    if (cactusLeft < 50 && cactusLeft > 0 && dinoBottom < 60) {
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
    // Reset game state
    isGameOver = false;
    activeCactus.style.right = "0px";
    gameLoop = setInterval(function() {
        if (!isGameOver) {
            moveCactus();
            checkCollision();
        }
    }, 20);
}