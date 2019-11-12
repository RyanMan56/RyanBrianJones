import * as THREE from 'three';
import Block from '../basic/block';
import { generateRoadMarkings } from '../../helpers/generators';
import { generateOscillateBuildings, updateOscillateBuildings } from '../../helpers/buildings/oscillate-helper';
import { OSCILLATE } from '../../helpers/buildings/building-types';

const { Group } = THREE;

class CityTileStraight {
  constructor(frontType = null, backType = null) {
    this.frontType = frontType;
    this.backType = backType;
    this.init();
  }

  init() {
    this.group = new Group();
    const { group } = this;

    group.add(this.generateTileBase());
    this.buildings = this.generateBuildings(this.frontType, this.backType);
    group.add(this.buildings);

    this.group = group;
  }

  generateTileBase() {
    const group = new Group();
    group.name = 'Tile Base';

    const land1 = new Block({
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
    const land2 = new Block({
      color: 0x160157,
      dimensions: new THREE.Vector3(1, 0.2, 4),
      position: new THREE.Vector3(3, -0.6, 0),
    });

    group.add(land1);
    group.add(pavement1);
    group.add(road);
    group.add(pavement2);
    group.add(land2);
    group.add(generateRoadMarkings());

    return group;
  }

  generateBuildings(frontType = null, backType = null) {
    const buildings = new Group();

    switch (frontType) {
      case OSCILLATE:
        this.frontBuildings = this.generateBuildingRow(OSCILLATE, true);
        buildings.add(this.frontBuildings);
        break;
      default:
        break;
    }

    switch (backType) {
      case OSCILLATE:
        this.backBuildings = this.generateBuildingRow(OSCILLATE, false);
        buildings.add(this.backBuildings);
        break;
      default:
        break;
    }

    return buildings;
  }

  generateBuildingRow(type = null, isFront) {
    const group = new Group();
    group.name = `${isFront ? 'Front' : 'Back'} Buildings`;
    group.position.set(isFront ? 3 : 0, 0, 0);
    switch (type) {
      case OSCILLATE:
        generateOscillateBuildings().map(x => group.add(x));
        break;
      default:
        break;
    }
    return group;
  }

  update(clock) {
    this.updateBuildings(clock, this.frontType, this.frontBuildings);
    this.updateBuildings(clock, this.backType, this.backBuildings);
  }

  updateBuildings(clock, type, buildings) {
    switch (type) {
      case OSCILLATE:
        updateOscillateBuildings(clock, buildings);
        break;
      default:
        break;
    }
  }
}

export default CityTileStraight;
