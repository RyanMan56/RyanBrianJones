import { Vector3, BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial, Group } from 'three';

class HighlightBlock {
  constructor({
    position = new Vector3(0, 0, 0),
  } = {}) {
    this.position = position;
    return this.create();
  }

  create() {
    const geom = new BoxGeometry(this.position.x, this.position.y, this.position.z);
    const edges = new EdgesGeometry(geom);
    this.group = new Group();
    this.group.add(new LineSegments(edges, new LineBasicMaterial({ color: 0xffffff })));
    this.group.position.setX(1.5);
    this.group.position.setY(-0.6);

    this.currentTile = null;
    // this.group.add(this.currentTile);
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

  setTile(tile) {
    this.group.remove(this.currentTile);
    if (tile) {
      this.currentTile = tile;
      this.currentTile.position.set(0, 0.6, 0);
      // this.currentTile.opacity
      this.group.add(this.currentTile);
    }
  }
}

export default HighlightBlock;
