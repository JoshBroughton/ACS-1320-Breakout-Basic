/* eslint-disable no-alert */
import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import Background from './background.js';
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

const ball = new Ball(ballX, ballY, ballRadius, '#ffda1f');
const paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight, '#0095DD');
const background = new Background(0, 0, canvas.width, canvas.height, '#af1b3f');
const score = new Score();
const lives = new Lives(canvas.width - 65, 20, '#0095DD', 3, '16px Arial');

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

const drawBricks = function drawBlockingBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        let brickColor = '#8a84e2';
        if (r === 1) {
          brickColor = '#ffa69e';
        } else if (r === 2) {
          brickColor = '#ff686b';
        }
        ctx.fillStyle = brickColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

// const collisionDetection = function ballBrickCollisionDetection() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       const b = bricks[c][r];
//       if (b.status === 1) {
//         if (
//           x > b.x
//                 && x < b.x + brickWidth
//                 && y > b.y
//                 && y < b.y + brickHeight
//         ) {
//           dy = -dy;
//           b.status = 0;
//           score += 1;
//           if (score === brickRowCount * brickColumnCount) {
//             alert('YOU WIN, CONGRATULATIONS!');
//             document.location.reload();
//           }
//         }
//       }
//     }
//   }
// };

const draw = function drawVisualComponents() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  // drawBricks();
  // collisionDetection();
  score.render(ctx);
  lives.render(ctx);
  ball.move(ctx);
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives.loseLife();
      if (!lives.lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 6;
        ball.dy = -6;
        paddle.x = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddle.x = Math.min(paddle.x + 7, canvas.width - paddle.width);
  } else if (leftPressed) {
    paddle.x = Math.max(paddle.x - 7, 0);
  }

  requestAnimationFrame(draw);
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

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
