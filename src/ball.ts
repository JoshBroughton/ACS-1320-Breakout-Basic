/* eslint-disable import/extensions */
import Sprite from './sprite';

class Ball extends Sprite {
  radius: number;
  dx: number;
  dy: number;

  constructor(x = 0, y = 0, radius = 10, color = '#0095DD') {
    super(x, y, 0, 0, color);
    this.radius = radius;
    this.dx = 6;
    this.dy = -6;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // reset the ball to the starting position
  reset(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight - 30;
    this.dx = 6;
    this.dy = -6;
  }
}

export default Ball;
