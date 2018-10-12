import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { frenchMauve } from '../colors';

class BaseScene {
  constructor() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(frenchMauve, 1);
    renderer.domElement.id = 'canvas';
    document.body.appendChild(renderer.domElement);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }
}

export default BaseScene;
