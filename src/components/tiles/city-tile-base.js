import { Group, Vector3 } from 'three';

class CityTileBase {
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    frontType = null,
    backType = null,
    skipInit = false,
  } = {}) {
    this.position = position;
    this.rotation = rotation;
    this.frontType = frontType;
    this.backType = backType;
    this.name = 'Tile';
    this.group = new Group();
    if (!skipInit) {
      this.setupPositionAndRotation();
      this.init();
    }
  }

  init() {}

  setupPositionAndRotation() {
    this.group.position.set(1.5 + this.position.x * 4, this.position.y * 4, this.position.z * 4);
    this.group.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
  }

  setPosition({ x = 0, y = 0, z = 0 }) {
    this.group.position.set(1.5 + x * 4, y * 4, z * 4);
    return this;
  }

  setRotation({ x = 0, y = 0, z = 0 }) {
    this.group.rotation.set(x, y, z);
    return this;
  }
}

export default CityTileBase;
