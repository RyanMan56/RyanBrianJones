import { Vector3, DirectionalLight, DirectionalLightHelper, PointLight, PointLightHelper } from 'three';

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
