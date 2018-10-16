import { Group, Vector3 } from 'three';
import Block from '../basic/block';

class House {
  constructor() {
    return this.create();
  }

  create() {
    const group = new Group();
    group.add(
      new Block({
        position: new Vector3(0, 0, 0),
        dimensions: new Vector3(4, 1, 1),
        sections: new Vector3(4, 1, 1),
        margin: 1,
      }),
    );
    return group;
  }
}

export default House;
