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

    const model = new House();
    const door = new Door();

    scene.add(model);
    scene.add(door);

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
