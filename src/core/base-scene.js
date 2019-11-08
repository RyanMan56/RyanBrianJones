import * as THREE from 'three';
import { frenchMauve, richBlack, white } from '../colors';
import Block from '../components/basic/outlined-block';

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
    const canvas = document.querySelector('#canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(richBlack, 1);

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
    this.controls.mouseButtons = {
      ZOOM: THREE.MOUSE.MIDDLE,
      PAN: THREE.MOUSE.LEFT,
      ORBIT: THREE.MOUSE.RIGHT,
    };

    const base = new Block({
      color: 0x20074e,
      dimensions: new THREE.Vector3(1, 0.2, 4),
      position: new THREE.Vector3(0, -0.6, 0),
      disableLines: true,
    });
    const block = new Block({
      color: 0x202181,
      lineColor: frenchMauve,
      dimensions: new THREE.Vector3(1, 2, 1),
      position: new THREE.Vector3(0, 0.5, 0),
      disableLines: true,
    });
    const pavement1 = new Block({
      color: 0x411186,
      dimensions: new THREE.Vector3(0.5, 0.2, 4),
      position: new THREE.Vector3(0.75, -0.6, 0),
      disableLines: true,
    });
    const road = new Block({
      color: 0x2e127b,
      dimensions: new THREE.Vector3(1, 0.1, 4),
      position: new THREE.Vector3(1.5, -0.65, 0),
      disableLines: true,
    });
    const pavement2 = new Block({
      color: 0x411186,
      dimensions: new THREE.Vector3(0.5, 0.2, 4),
      position: new THREE.Vector3(2.25, -0.6, 0),
      disableLines: true,
    });
    this.scene.add(base);
    this.scene.add(block);
    this.scene.add(pavement1);
    this.scene.add(road);
    this.scene.add(pavement2);

    this.scene.add(new THREE.AmbientLight(0xffffff, 1));
    // const light = new THREE.PointLight(0xffffff, 0.8);
    // light.position.set(0, 0, 0);
    // this.scene.add(light);

    // const sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);
    // // lights
    // const light1 = new THREE.PointLight(0xff0040, 2, 50);
    // light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
    // light1.position.set(new THREE.Vector3(1, 1, 1));
    // this.scene.add(light1);

    // const color = 0x92f1fe;
    const color = 0xff0000;
    const intensity = 0.8;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 5);
    light.target.position.set(0, 0, 0);
    this.scene.add(light);
    this.scene.add(light.target);

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
