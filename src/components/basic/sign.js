import { Group, Vector3 } from 'three';
import Block from './block';

class Sign {
  constructor() {
    return this.create();
  }

  create() {
    const group = new Group();
    group.add(
      new Block({
        position: new Vector3(0, 0, 1.5),
        dimensions: new Vector3(0.05, 1, 0.05),
      }),
    );
    group.add(
      new Block({
        position: new Vector3(0, 1, 1.5),
        dimensions: new Vector3(1, 0, 0.05),
      }),
    );
    return group;
  }
}

export default Sign;
