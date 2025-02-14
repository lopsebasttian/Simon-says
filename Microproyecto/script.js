const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let userSequence = [];
let score = 0;
let playerName = "";

function createColorBoard() {
    const grid = document.getElementById("grid");
    colors.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color", color);
        colorDiv.addEventListener("click", handleUserClick);
        grid.appendChild(colorDiv);
    });
}

document.getElementById("play-button").addEventListener("click", startGame);
document.getElementById("submit__name").addEventListener("click", saveName);

createColorBoard();

function startGame() {
    score = 0;
    sequence = [];
    userSequence = [];
    document.getElementById("score").innerText = "Puntuación: " + score;
    nextRound();
}

function nextRound() {
    userSequence = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    showSequence();
}

function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(interval);
            return;
        }
        flashColor(sequence[index]);
        index++;
    }, 1000);
}

function flashColor(color) {
    const colorDiv = document.querySelector(`.${color}`);
    colorDiv.style.opacity = "1"; 
    setTimeout(() => {
        colorDiv.style.opacity = "0.7"; 
    }, 500);
}

function handleUserClick(event) {
    const color = event.target.classList[1];
    userSequence.push(color);
    flashColor(color);
    checkUserSequence();
}

function checkUserSequence() {
    const lastIndex = userSequence.length - 1;
    if (userSequence[lastIndex] !== sequence[lastIndex]) {
        alert("Perdiste, tus puntos fueron: " + score);
        return;
    }
    if (userSequence.length === sequence.length) {
        score++;
        document.getElementById("score").innerText = "Puntuación: " + score;
        setTimeout(nextRound, 1000);
    }
}

function saveName() {
    playerName = document.getElementById("name__player").value;
    localStorage.setItem("playerName", playerName);
    document.getElementById("player__name").innerText = playerName;
    alert("Nombre: " + playerName);
}

