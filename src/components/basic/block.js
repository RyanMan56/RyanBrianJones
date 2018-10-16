import {
  BoxGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector3,
} from 'three';

import { richBlack, lightSkyBlue } from '../../colors';

class Block {
  constructor({
    color = richBlack,
    lineColor = lightSkyBlue,
    dimensions = new Vector3(1, 1, 1),
    position = new Vector3(0, 0, 0),
  }) {
    this.color = color;
    this.lineColor = lineColor;
    this.dimensions = dimensions;
    this.position = position;
    return this.create();
  }

  create() {
    const {
      color, lineColor, dimensions, segments, position,
    } = this;
    const geometry = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
    const material = new MeshBasicMaterial({ color });
    const cube = new Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);

    const edges = new EdgesGeometry(geometry);
    const line = new LineSegments(edges, new LineBasicMaterial({ color: lineColor }));
    cube.add(line);

    return cube;
  }
}

export default Block;
