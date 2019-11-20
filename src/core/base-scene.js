import * as THREE from 'three';
import { richBlack } from '../colors';

const OrbitControls = require('three-orbit-controls')(THREE);

class BaseScene {
  constructor({ tileFactory = null }) {
    this.tileFactory = tileFactory;

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.d = 20;

    this.init.bind(this);
    this.init();
  }

  makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }

  updateDirectionalLight(light, helper) {
    light.target.updateMatrixWorld();
    helper.update();
  }

  updatePointLight(helper) {
    helper.update();
  }

  resetCamera() {
    this.camera.position.set(20, 20, 20);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = -Math.PI / 4;
    this.camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    this.camera.rotation.z = 0;
  }

  init() {
    const canvasContainer = document.querySelector('#main');

    // Set up renderer
    const canvas = document.querySelector('#canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    this.renderer.setClearColor(richBlack, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Create scene and camera
    this.scene = new THREE.Scene();
    const aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    this.camera = new THREE.OrthographicCamera(-this.d * aspect, this.d * aspect, this.d, -this.d, -1000, 1000);

    // Set up the camera for isometric projection
    this.resetCamera();

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.mouseButtons = {
      ZOOM: THREE.MOUSE.MIDDLE,
      PAN: THREE.MOUSE.LEFT,
      ORBIT: THREE.MOUSE.RIGHT,
    };

    this.clock = new THREE.Clock();
    this.clock.start();

    this.renderWorld();

    window.addEventListener('resize', () => {
      const newAspect = canvasContainer.clientWidth / canvasContainer.clientHeight;

      this.camera.left = -this.d * newAspect;
      this.camera.right = this.d * newAspect;
      this.camera.aspect = newAspect;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
  }
}

export default BaseScene;
