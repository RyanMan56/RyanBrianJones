import * as THREE from 'three';
import * as dat from 'dat.gui';
import { richBlack } from '../colors';
import ColorGUIHelper from '../helpers/color-gui-helper';
import { addDirectionalLight } from '../helpers';
import CityTileStraight from '../components/tiles/city-tile-straight';
import CityTileCorner from '../components/tiles/city-tile-corner';
import { OSCILLATE } from '../helpers/buildings/building-types';

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

    const tiles = [];

    const cityTile = new CityTileStraight({ backType: OSCILLATE });
    tiles.push(cityTile);

    const curvedCityTile = new CityTileCorner({ position: new THREE.Vector3(0, 0, -1) });
    tiles.push(curvedCityTile);

    tiles.push(curvedCityTile.clone()
      .setPosition({ x: 1, z: -1 })
      .setRotation({ y: THREE.Math.degToRad(-90) }));

    tiles.push(cityTile.clone()
      .setPosition({ x: 1, z: 0 })
      .addBuildings(OSCILLATE));

    tiles.push(curvedCityTile.clone()
      .setPosition({ x: 1, z: 1 })
      .setRotation({ y: THREE.Math.degToRad(180) }));

    tiles.push(curvedCityTile.clone()
      .setPosition({ x: 0, z: 1 })
      .setRotation({ y: THREE.Math.degToRad(90) }));

    tiles.forEach((tile) => {
      this.scene.add(tile.group);
    });

    this.scene.add(new THREE.AmbientLight(0xffffff, 1));

    const gui = new dat.GUI();

    const { light: directionalLight, helper: directionalLightHelper } = addDirectionalLight({
      scene: this.scene,
      color: 0xff9500,
      intensity: 2,
      position: new THREE.Vector3(0, 7, 5.1),
      shouldCreateHelper: true,
    });

    gui.addColor(new ColorGUIHelper(directionalLight, 'color'), 'value').name('directional light color');
    gui.add(directionalLight, 'intensity', 0, 2, 0.01);
    this.makeXYZGUI(gui, directionalLight.position, 'directional light position', () => this.updateDirectionalLight(directionalLight, directionalLightHelper));
    this.makeXYZGUI(gui, directionalLight.target.position, 'directional light target', () => this.updateDirectionalLight(directionalLight, directionalLightHelper));

    gui.add(this, 'resetCamera').name('reset camera');

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      tiles.forEach((tile) => {
        tile.update(this.clock);
      });
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}

export default BaseScene;
