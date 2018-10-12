import {
  BoxGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector3,
} from 'three';

import { richBlack, lightSkyBlue } from '../colors';

class Block {
  constructor({ color = richBlack, lineColor = lightSkyBlue, dimensions = new Vector3(1, 1, 1) }) {
    this.color = color;
    this.lineColor = lineColor;
    this.dimensions = dimensions;
    return this.create();
  }

  create() {
    const { x, y, z } = this.dimensions;
    const geometry = new BoxGeometry(x, y, z);
    const material = new MeshBasicMaterial({ color: richBlack });
    const cube = new Mesh(geometry, material);

    const edges = new EdgesGeometry(geometry);
    const line = new LineSegments(edges, new LineBasicMaterial({ color: lightSkyBlue }));
    cube.add(line);

    return cube;
  }
}

export default Block;
