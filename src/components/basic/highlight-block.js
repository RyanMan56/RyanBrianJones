import { Vector3, BoxGeometry, MeshBasicMaterial, Mesh, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class HighlightBlock {
  constructor({
    position = new Vector3(0, 0, 0),
  } = {}) {
    this.position = position;
    return this.create();
  }

  create() {
    const geom = new BoxGeometry(this.position.x, this.position.y, this.position.z);
    const edges = new EdgesGeometry(geom, 90);
    this.group = new LineSegments(edges, new LineBasicMaterial({ color: 0xffffff }));
    this.group.position.setX(1.5);
    this.group.position.setY(-0.6);
    return this;
  }

  setPosition({ x, y, z }) {
    if (typeof x === 'number') {
      this.group.position.setX(1.5 + x * 4);
    }
    if (typeof y === 'number') {
      this.group.position.setY(y * 4);
    }
    if (typeof z === 'number') {
      this.group.position.setZ(z * 4);
    }
  }
}

export default HighlightBlock;
