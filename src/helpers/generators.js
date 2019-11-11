import * as THREE from 'three';

export function generateRoadMarkings() {
  const group = new THREE.Group();
  group.name = 'Road Markings';
  for (let i = 0; i < 4; i++) {
    const whiteLinesGeometry = new THREE.PlaneGeometry(0.025, 0.24);
    const whiteLinesMaterial = new THREE.MeshPhongMaterial({
      color: 0x72ffff, emissive: 0x72ffff,
    });
    const whiteLines = new THREE.Mesh(whiteLinesGeometry, whiteLinesMaterial);
    whiteLines.position.set(1.5, -0.549, i - 1.5);
    whiteLines.rotateX(THREE.Math.degToRad(-90));
    group.add(whiteLines);
  }
  return group;
}
