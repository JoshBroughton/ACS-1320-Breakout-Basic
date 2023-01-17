import Sprite from './sprite';

class Paddle extends Sprite {
  constructor(x = 0, y = 0, width = 75, height = 10, color = '#f00') {
    super(x, y, width, height, color);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
