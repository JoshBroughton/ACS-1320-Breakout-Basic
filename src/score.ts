class Score {
  x: number;
  y: number;
  color: string;
  score: number
  font: string;

  constructor(x = 8, y = 20, color = '#0095DD', score = 0, font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.score = score;
    this.font = font;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }

  updateScore() {
    this.score += 1;
  }

  resetScore() {
    this.score = 0;
  }
}

export default Score;
