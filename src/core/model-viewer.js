import * as THREE from 'three';
import BaseScene from './base-scene';
import Block from '../components/basic/block';
import House from '../components/structures/house';
import Door from '../components/basic/door';

const OrbitControls = require('three-orbit-controls')(THREE);

const { Vector3 } = THREE;

class ModelViewer extends BaseScene {
  constructor() {
    super();
    this.create();
  }

  create() {
    const { scene, camera, renderer } = this;
    const controls = new OrbitControls(camera);

    const house = new House();
    const door = new Door({
      position: new Vector3(0, 0, 1.5),
      width: 0.5,
      height: 1,
    });

    scene.add(house);
    house.add(door);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}

export default ModelViewer;
