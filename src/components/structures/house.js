import { Group, Vector3 } from 'three';
import Block from '../basic/block';

class House {
  constructor() {
    return this.create();
  }

  create() {
    const group = new Group();
    for (let i = 0; i < 4; i++) {
      group.add(new Block({ position: new Vector3(0, 0, i) }));
    }
    return group;
  }
}

export default House;
