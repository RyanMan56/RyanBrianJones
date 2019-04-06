import { Group, Vector3 } from 'three';
import Block from './block';

class Door {
  constructor({
    thickness = 0.05,
    position = new Vector3(0, 0, 0),
    width = 2,
    height = 2,
    depth = thickness,
  }) {
    this.thickness = thickness;
    this.position = position;
    this.width = width;
    this.height = height;
    this.depth = depth;
    return this.create();
  }

  create() {
    const { thickness, position, width, height, depth } = this;

    const group = new Group();
    group.position.set(position.x, position.y, position.z);
    group.add(
      // Bottom
      new Block({
        position: new Vector3(0, -height / 2 + 0.5, 0),
        dimensions: new Vector3(width, thickness, depth),
      }),
    );
    group.add(
      // Right
      new Block({
        position: new Vector3(width / 2 + thickness / 2, 0.5 - thickness / 2, 0),
        dimensions: new Vector3(thickness, height, depth),
      }),
    );
    group.add(
      // Left
      new Block({
        position: new Vector3(-width / 2 - thickness / 2, 0.5 - thickness / 2, 0),
        dimensions: new Vector3(thickness, height, depth),
      }),
    );
    group.add(
      // Top
      new Block({
        position: new Vector3(0, height / 2 + 0.5 - thickness, 0),
        dimensions: new Vector3(width, thickness, depth),
      }),
    );
    // group.add(
    //   new Block({
    //     position: new Vector3(0, 1, 0),
    //     dimensions: new Vector3(1, 0, 0.05),
    //   }),
    // );
    return group;
  }
}

export default Door;
