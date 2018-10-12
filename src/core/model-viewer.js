import * as THREE from 'three';
import BaseScene from './base-scene';
import Block from '../components/block';

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

    const block = new Block({ dimensions: new Vector3(1, 2, 1) });

    scene.add(block);

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
