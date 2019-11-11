import * as THREE from 'three';
import Block from '../basic/block';

const { Group } = THREE;

class CityTile {
  constructor() {
    // return this.init();
    this.init();
  }

  init() {
    this.group = new Group();
    const { group } = this;

    const base1 = new Block({
      // color: 0x20074e,
      // color: 0x0e0322,
      color: 0x160157,
      dimensions: new THREE.Vector3(1, 0.2, 4),
      position: new THREE.Vector3(0, -0.6, 0),
    });
    const pavement1 = new Block({
      color: 0x411186,
      dimensions: new THREE.Vector3(0.5, 0.2, 4),
      position: new THREE.Vector3(0.75, -0.6, 0),
    });
    const road = new Block({
      color: 0x2e127b,
      dimensions: new THREE.Vector3(1, 0.15, 4),
      position: new THREE.Vector3(1.5, -0.625, 0),
    });
    const pavement2 = new Block({
      color: 0x411186,
      dimensions: new THREE.Vector3(0.5, 0.2, 4),
      position: new THREE.Vector3(2.25, -0.6, 0),
    });
    const base2 = new Block({
      color: 0x160157,
      dimensions: new THREE.Vector3(1, 0.2, 4),
      position: new THREE.Vector3(3, -0.6, 0),
    });
    
    group.add(this.generateBuildings(group));

    for (let i = 0; i < 4; i++) {
      const whiteLinesGeometry = new THREE.PlaneGeometry(0.025, 0.24);
      const whiteLinesMaterial = new THREE.MeshPhongMaterial({ color: 0x72ffff, emissive: 0x72ffff });
      const whiteLines = new THREE.Mesh(whiteLinesGeometry, whiteLinesMaterial);
      whiteLines.position.set(1.5, -0.549, i - 1.5);
      whiteLines.rotateX(THREE.Math.degToRad(-90));
      group.add(whiteLines);
    }
    group.add(base1);
    group.add(pavement1);
    group.add(road);
    group.add(pavement2);
    group.add(base2);

    return group;
  }

  generateBuildings() {
    const buildings = new Group();

    this.backBuildings = new Group();
    this.backBuildings.name = 'backBuildings';
    for (let i = 0; i < 3; i++) {
      const block = new Block({
        color: 0x202181,
        // emissive: 0x202181,
        dimensions: new THREE.Vector3(1, 2, 1),
        position: new THREE.Vector3(0, 0.5, i * 1.3 - 1.3),
      });
      this.backBuildings.add(block);
    }

    buildings.add(this.backBuildings);
    return buildings;
  }

  update(clock) {
    console.log(clock.getElapsedTime());
    this.backBuildings.children.map((building, i) => {
      const pos = building.position;
      building.position.set(pos.x, 0.5 * Math.sin(clock.getElapsedTime() * 2 + ((90 * Math.PI / 180) / 3) * i) - 0.49, pos.z);
    });
    // this.buildings.children[0].position.set(pos.x, Math.sin(clock.getElapsedTime()) - 0.49, pos.z);
  }
}

export default CityTile;
