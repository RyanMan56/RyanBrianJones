import { Math as ThreeMath, Group, Vector2, CircleGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';
import { generatePath, generateCurveFromPoints, generateShapeFromPoints, generateCurvedRoadMarkings, generatePointMesh } from '../../helpers/generators';
import CityTileBase from './city-tile-base';

class CityTileCorner extends CityTileBase {
  constructor(props) {
    super(props);

    this.name = 'Road Corner';
  }

  init() {
    const { group } = this;

    group.add(this.generateTileBase());
    // group.add(this.generateBuildings(this.frontType, this.backType));
  }

  generateTileBase() {
    const group = new Group();
    group.name = 'Tile Base';
    group.position.setX(-1.5);

    // circle
    const r = 1.5;
    const center = new Vector2(3.5, 2);
    const geometry = new CircleGeometry(r + 0.5, 32);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const circle = new Mesh(geometry, material);
    circle.position.set(center.x, -0.55, center.y);
    circle.rotateX(ThreeMath.degToRad(-90));
    // group.add(circle);

    const farRoadPoints = generatePath(center, r + 1, 40);
    const nearRoadPoints = generatePath(center, r);
    group.add(generateCurveFromPoints(nearRoadPoints, farRoadPoints));

    const farPavement1Points = generatePath(center, r + 1.5, 40);
    const nearPavement1Points = farRoadPoints;
    group.add(generateCurveFromPoints(nearPavement1Points, farPavement1Points, 0.2, 0x411186, -0.5));

    const farPavement2Points = nearRoadPoints;
    const nearPavement2Points = generatePath(center, r - 0.5);
    group.add(generateCurveFromPoints(nearPavement2Points, farPavement2Points, 0.2, 0x411186, -0.5));

    const pavement1Points = [
      new Vector2(-0.5, 2),
      ...farPavement1Points,
      new Vector2(3.5, -2),
      new Vector2(-0.5, -2),
      new Vector2(-0.5, 2),
    ];
    group.add(generateShapeFromPoints(pavement1Points, 0.2, 0x160157, -0.5));

    const pavement2Points = [
      new Vector2(3.5, 2),
      ...nearPavement2Points,
      new Vector2(3.5, 2),
    ];
    group.add(generateShapeFromPoints(pavement2Points, 0.2, 0x160157, -0.5));

    group.add(generateCurvedRoadMarkings(center, r + 0.5));

    return group;
  }

  addBuildings(frontType = null, backType = null) {
    this.frontType = frontType;
    this.backType = backType;
    // this.group.add(this.generateBuildings(frontType, backType));
    return this;
  }

  update() {
    
  }

  clone() {
    const a = new CityTileCorner({ skipInit: true });
    a.group = this.group.clone();
    return a;
  }
}

export default CityTileCorner;
