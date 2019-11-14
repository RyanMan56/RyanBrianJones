import { Math as ThreeMath, Vector3, DirectionalLight, DirectionalLightHelper, PointLight, PointLightHelper } from 'three';
import CityTileStraight from '../components/tiles/city-tile-straight';
import CityTileCorner from '../components/tiles/city-tile-corner';

export function addDirectionalLight({
  scene,
  color,
  intensity,
  distance = 0,
  position,
  targetPosition = new Vector3(0, 0, 0),
  shouldCreateHelper = false,
}) {
  const light = new DirectionalLight(color, intensity);
  light.distance = distance;
  light.position.set(position.x, position.y, position.z);
  light.target.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
  scene.add(light);
  scene.add(light.target);

  const returnValue = { light };

  if (shouldCreateHelper) {
    const helper = new DirectionalLightHelper(light);
    scene.add(helper);
    returnValue.helper = helper;
  }
  return returnValue;
}

export function addPointLight({
  scene,
  color,
  intensity,
  position,
  shouldCreateHelper = false,
}) {
  const light = new PointLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);

  const returnValue = { light };

  if (shouldCreateHelper) {
    const helper = new PointLightHelper(light);
    scene.add(helper);
    returnValue.helper = helper;
  }
  return returnValue;
}

export function parseWorldMap(worldMap) {
  const cityTileStraight = new CityTileStraight();
  const cityTileCorner = new CityTileCorner();

  const tiles = worldMap.map((item) => {
    let tile = null;
    switch (item.type) {
      case 'corner':
        tile = cityTileCorner.clone();
        break;
      case 'straight':
      default:
        tile = cityTileStraight.clone();
        break;
    }

    tile.setPosition({ x: item.position.x || 0, y: item.position.y || 0, z: item.position.z || 0 });
    tile.setRotation({
      x: ThreeMath.degToRad(item.rotation.x || 0),
      y: ThreeMath.degToRad(item.rotation.y || 0),
      z: ThreeMath.degToRad(item.rotation.z),
    });
    tile.addBuildings(item.frontType, item.backType);

    return tile;
  });

  console.log(tiles);
  return tiles;
}
