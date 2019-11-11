import * as THREE from 'three';
import Block from '../../components/basic/block';

export function generateOscillateBuildings() {
  const group = [];
  for (let i = 0; i < 3; i++) {
    const block = new Block({
      color: 0x202181,
      // emissive: 0x202181,
      dimensions: new THREE.Vector3(1, 2, 1),
      position: new THREE.Vector3(0, 0.5, i * 1.3 - 1.3),
    });
    group.push(block);
  }
  return group;
}

export function updateOscillateBuildings(clock, buildings) {
  buildings.children.map((building, i) => {
    const pos = building.position;
    building.position.set(pos.x, 0.5 * Math.cos(clock.getElapsedTime() * 2 + ((90 * Math.PI / 180) / 3) * i) - 0.49, pos.z);    
  });
}
