import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';
import { richBlack } from '../colors';
import Block from '../components/basic/block';
import ColorGUIHelper from '../helpers/color-gui-helper';
import { addDirectionalLight, addPointLight } from '../helpers';
import CityTile from '../components/tiles/city-tile-straight';
import { OSCILLATE } from '../helpers/buildings/building-types';
import CityTileCorner from '../components/tiles/city-tile-corner';

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

    const cityTile = new CityTile(null, null);
    this.scene.add(cityTile.group);

    const curvedCityTile = new CityTileCorner();
    this.scene.add(curvedCityTile.group);

    // const loader = new GLTFLoader();
    // loader.load('assets/lamp.gltf', (gltf) => {
    //   gltf.scene.position.set(0.4, -0.5, 0.8);
    //   console.log(gltf);
    //   this.scene.add(gltf.scene);
    // }, undefined, (error) => {
    //   console.error(error);
    // });

    this.scene.add(new THREE.AmbientLight(0xffffff, 1));

    const gui = new dat.GUI();

    const { light: directionalLight, helper: directionalLightHelper } = addDirectionalLight({
      scene: this.scene,
      color: 0xff9500,
      intensity: 2,
      position: new THREE.Vector3(0, 7, 5.1),
      shouldCreateHelper: true,
    });

    // const { light: pointLight, helper: pointLightHelper } = addPointLight({
    //   scene: this.scene,
    //   color: 0xfff000, // yellow
    //   // color: 0x72ffff // neon blue,
    //   intensity: 0.3,
    //   distance: 0.4,
    //   position: new THREE.Vector3(1, 1, -0.9),
    //   shouldCreateHelper: true,
    // });

    gui.addColor(new ColorGUIHelper(directionalLight, 'color'), 'value').name('directional light color');
    gui.add(directionalLight, 'intensity', 0, 2, 0.01);
    this.makeXYZGUI(gui, directionalLight.position, 'directional light position', () => this.updateDirectionalLight(directionalLight, directionalLightHelper));
    this.makeXYZGUI(gui, directionalLight.target.position, 'directional light target', () => this.updateDirectionalLight(directionalLight, directionalLightHelper));

    // this.makeXYZGUI(gui, pointLight.position, 'point light position', () => this.updatePointLight(pointLightHelper));
    // gui.addColor(new ColorGUIHelper(pointLight, 'color'), 'value').name('point light color');
    // gui.add(pointLight, 'intensity', 0, 2, 0.01).name('point light intensity');

    gui.add(this, 'resetCamera').name('reset camera');

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      cityTile.update(this.clock);
      curvedCityTile.update(this.clock);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}

export default BaseScene;
