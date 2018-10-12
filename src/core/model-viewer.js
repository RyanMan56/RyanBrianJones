import * as THREE from 'three';
import BaseScene from './base-scene';
import Block from '../components/basic/block';
import House from '../components/structures/house';

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

    // const block = new Block({ dimensions: new Vector3(1, 2, 1) });
    const house = new House();

    scene.add(house);

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
