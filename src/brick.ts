/* eslint-disable import/extensions */
import Sprite from './sprite';
  
class Brick extends Sprite {
  status: boolean;

  constructor(x: number, y: number, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color);
    this.status = true;
  }
}

export default Brick;
