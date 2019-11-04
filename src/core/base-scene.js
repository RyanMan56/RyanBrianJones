import * as THREE from 'three';
import { frenchMauve, richBlack, white } from '../colors';
import Block from '../components/basic/block';

const OrbitControls = require('three-orbit-controls')(THREE);

class BaseScene {
  constructor() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;

    this.init.bind(this);
    this.init();
  }

  init() {
    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(richBlack, 1);
    this.renderer.domElement.id = 'canvas';
    document.body.appendChild(this.renderer.domElement);

    // Create scene and camera
    this.scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

    // Set up the camera for isometric projection
    this.camera.position.set(20, 20, 20);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = -Math.PI / 4;
    this.camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableZoom = true;
    // this.controls.enablePan = true;
    // this.controls.enableRotate = false;
    // this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.mouseButtons = {
      ZOOM: THREE.MOUSE.MIDDLE,
      PAN: THREE.MOUSE.LEFT,
      ORBIT: THREE.MOUSE.RIGHT,
    };

    const block = new Block({
      lineColor: frenchMauve,
      dimensions: new THREE.Vector3(1, 2, 1),
      position: new THREE.Vector3(0, 0.5, 0),
    });
    const pavement1 = new Block({
      dimensions: new THREE.Vector3(1, 0.1, 4),
      position: new THREE.Vector3(0, -0.55, 0),
    });
    const road = new Block({
      color: white,
      dimensions: new THREE.Vector3(1, 0.1, 4),
      position: new THREE.Vector3(1, -0.55, 0),
    });
    const pavement2 = new Block({
      dimensions: new THREE.Vector3(1, 0.1, 4),
      position: new THREE.Vector3(2, -0.55, 0),
    });
    this.scene.add(block);
    this.scene.add(pavement1);
    this.scene.add(road);
    this.scene.add(pavement2);

    this.scene.add(new THREE.AmbientLight(0x444444));
    const light = new THREE.PointLight(0xffffff, 0.8);
    light.position.set(0, 0, 0);
    this.scene.add(light);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}

export default BaseScene;
