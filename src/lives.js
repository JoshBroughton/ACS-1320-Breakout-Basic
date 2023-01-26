class Lives {
  constructor(x, y = 20, color = '#0095DD', lives = 3, font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lives = lives;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  loseLife() {
    this.lives -= 1;
  }

  resetLives() {
    this.lives = 3;
  }
}

export default Lives;
