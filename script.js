const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
let direction = "";
let food = {};
let score = 0;
let game = null;
let gameStarted = false;


document.addEventListener("keydown", changeDirection);
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restart").addEventListener("click", restartGame);


function startGame() {
  document.getElementById("startScreen").style.display = "none";
  gameStarted = true;
  init();
}


function restartGame() {
  clearInterval(game);
  document.getElementById("startScreen").style.display = "flex";
  gameStarted = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score = 0;
  document.getElementById("score").innerText = score;
}


function init() {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = score;

  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };

  game = setInterval(draw, 120);
}


function changeDirection(e) {
  if (!gameStarted) return;

  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "lime" : "green";
    ctx.fillRect(segment.x, segment.y, box, box);
  });


  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;


  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    collision(headX, headY)
  ) {
    clearInterval(game);
    alert("Game Over!");
    restartGame();
    return;
  }

  
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift({ x: headX, y: headY });
}

function collision(x, y) {
  return snake.some(segment => segment.x === x && segment.y === y);
}


