import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { frenchMauve } from '../colors';

class BaseScene {
  constructor() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.rat
    renderer.setSize(window.innerWidth / 1, window.innerHeight / 1, false);
    renderer.setClearColor(frenchMauve, 1);
    renderer.domElement.id = 'canvas';
    document.body.appendChild(renderer.domElement);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    })
  }
}

export default BaseScene;
