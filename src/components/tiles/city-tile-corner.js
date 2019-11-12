import { Group, Vector2 } from 'three';
import { generatePath, generateCurveFromPoints } from '../../helpers/generators';

class CityTileCorner {
  constructor() {
    this.init();
  }

  init() {
    this.group = new Group();
    const { group } = this;

    group.add(this.generateTileBase());
    // this.buildings = this.generateBuildings(this.frontType, this.backType);
    // group.add(this.buildings);

    this.group = group;
  }

  generateTileBase() {
    const group = new Group();
    group.name = 'Tile Base';

    // circle
    const r = 1.5;
    const center = new Vector2(3.5, -2);

    const farPoints = generatePath(center, r + 1);
    const nearPoints = generatePath(center, r);

    group.add(generateCurveFromPoints(nearPoints, farPoints));

    return group;
  }

  update() {
    
  }
}

export default CityTileCorner;
