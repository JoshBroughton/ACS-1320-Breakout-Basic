/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import Background from './background..js';
import Score from './score.js';
import Lives from './lives.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballX = canvas.width / 2;
const ballY = canvas.height - 30;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let rightPressed = false;
let leftPressed = false;
let isPlaying = true;

const ball = new Ball(ballX, ballY, ballRadius, '#ffda1f');
const paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight, '#0095DD');
const background = new Background(0, 0, canvas.width, canvas.height, '#af1b3f');
const score = new Score();
const lives = new Lives(canvas.width - 65, 20, '#0095DD', 3, '16px Arial');

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = new Brick(0, 0, brickWidth, brickHeight, '#8a84e2');
  }
}

const endGame = function displayEndGameScreen(message) {
  isPlaying = false;
  document.getElementById('message').innerText = message;
  document.getElementById('overlay').style.display = 'flex';
};

const drawBricks = function drawBlockingBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === true) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        if (r === 1) {
          bricks[c][r].color = '#ffa69e';
        } else if (r === 2) {
          bricks[c][r].color = '#ff686b';
        }
        bricks[c][r].render(ctx);
      }
    }
  }
};

const collisionDetection = function ballBrickCollisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === true) {
        if (
          ball.x > b.x
                && ball.x < b.x + brickWidth
                && ball.y > b.y
                && ball.y < b.y + brickHeight
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score.score += 1;
          if (score.score === brickRowCount * brickColumnCount) {
            endGame('You Win!');
          }
        }
      }
    }
  }
};

const draw = function drawVisualComponents() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  drawBricks();
  collisionDetection();
  score.render(ctx);
  lives.render(ctx);
  ball.move(ctx);
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives.loseLife();
      if (!lives.lives) {
        endGame('Game Over! You lost.');
      } else {
        ball.reset(canvas.width, canvas.height);
        paddle.x = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddle.x = Math.min(paddle.x + 7, canvas.width - paddle.width);
  } else if (leftPressed) {
    paddle.x = Math.max(paddle.x - 7, 0);
  }
  // stops the animation refresh when the game is over
  if (isPlaying === true) {
    requestAnimationFrame(draw);
  }
};

const keyDownHandler = function handleKeyPressForPaddle(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

const keyUpHandler = function handleKepReleaseForPaddle(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

const mouseMoveHandler = function handleMouseMovement(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
};

const playAgain = function playAgainEventHandler() {
  // remove overlay
  document.getElementById('overlay').style.display = 'none';
  // reset brick status to true
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r].status = true;
    }
  }
  // reset ball and paddle
  ball.reset(canvas.width, canvas.height);
  paddle.x = (canvas.width - paddleWidth) / 2;
  isPlaying = true;
  score.score = 0;
  lives.lives = 3;
  draw();
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
document.getElementById('playAgain').addEventListener('click', playAgain);

draw();
