// Board
let blockSize = 25;
let rows = 25;
let cols = 25;
let board;
let context;

//Snake Head
let snakeX = blockSize *5;
let snakeY = blockSize *5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//Food
let foodX;
let foodY;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); //updates every 100 milliseconds

    
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle ="black";
    context.fillRect(0,0,board.width, board.height);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        scoreBoard.textContent = score;
    }

    for (let i= snakeBody.length-1; i>0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle ="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    context.fillStyle ="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game Over Conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

/**
 * If the user presses an arrow key, and the snake is not moving in the opposite direction, change the
 * snake's direction.
 * @param e - the event object
 */
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//Restart button
document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
  });