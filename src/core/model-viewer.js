import * as THREE from 'three';
import BaseScene from './base-scene';
import Block from '../components/basic/block';
import { frenchMauve } from '../colors';

const OrbitControls = require('three-orbit-controls')(THREE);

class ModelViewer extends BaseScene {
  constructor() {
    super();
    this.create();
  }

  create() {
    const { scene, camera, renderer } = this;
    const controls = new OrbitControls(camera);

    const block = new Block({ lineColor: frenchMauve });

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
