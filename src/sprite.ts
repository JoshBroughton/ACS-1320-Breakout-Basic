class Sprite {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(x = 0, y = 0, width = 100, height = 100, color = '#f00') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveBy(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
