import { Vector3, BoxGeometry } from 'three';
import { richBlack } from '../../colors';

class Block {
  constructor({
    color = richBlack,
    position = new Vector3(0, 0, 0),
    dimensions = new Vector3(0, 0, 0),
  }) {
    this.color = color;
    this.position = position;
    this.dimensions = dimensions;
    return this.create();
  }

  create() {
    const { color, position, dimensions } = this;
    const geometry = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
  }
}

export default Block;
