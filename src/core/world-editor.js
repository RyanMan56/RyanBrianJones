import { Math as ThreeMath, AmbientLight, Vector3, PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Raycaster, Vector2, Group } from 'three';
import * as dat from 'dat.gui';
import BaseScene from './base-scene';
import ColorGUIHelper from '../helpers/color-gui-helper';
import { addDirectionalLight, parseWorldMap } from '../helpers';
import worldMap from '../assets/world-map.json';
import HighlightBlock from '../components/basic/highlight-block';
import UIManager from '../ui/ui-manager';

class WorldEditor extends BaseScene {
  constructor(props) {
    super(props);

    this.uiManager = new UIManager({ tileFactory: this.tileFactory });
    window.addEventListener('mousemove', e => this.onMouseMove(e), false);
  }

  onMouseMove(e) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    const canvasContainer = document.getElementById('main');
    this.mouse.x = (e.clientX / canvasContainer.clientWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / canvasContainer.clientHeight) * 2 + 1;
  }

  renderWorld() {
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.group = new Group();
    this.scene.add(this.group);

    const planeGeom = new PlaneGeometry(1000, 1000);
    const planeMat = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide, visible: false });
    const plane = new Mesh(planeGeom, planeMat);
    plane.position.set(0, -0.55, 0);
    plane.rotateX(ThreeMath.degToRad(90));
    plane.name = 'Plane';
    this.scene.add(plane);

    const tiles = parseWorldMap(worldMap, this.tileFactory);

    tiles.forEach((tile) => {
      this.scene.add(tile.group);
    });

    const highlightBlock = new HighlightBlock({ position: new Vector3(4.01, 0.21, 4.01) });
    this.scene.add(highlightBlock.group);
    highlightBlock.setPosition({ x: 1 });

    this.scene.add(new AmbientLight(0xffffff, 1));

    const gui = new dat.GUI();

    const { light: directionalLight, helper: directionalLightHelper } = addDirectionalLight({
      scene: this.scene,
      color: 0xff9500,
      intensity: 2,
      position: new Vector3(0, 7, 5.1),
      shouldCreateHelper: true,
    });

    gui.addColor(new ColorGUIHelper(directionalLight, 'color'), 'value').name('directional light color');
    gui.add(directionalLight, 'intensity', 0, 2, 0.01);
    this.makeXYZGUI(gui, directionalLight.position, 'directional light position', () => this.updateDirectionalLight(directionalLight, directionalLightHelper));
    this.makeXYZGUI(gui, directionalLight.target.position, 'directional light target', () => this.updateDirectionalLight(directionalLight, directionalLightHelper));

    gui.add(this, 'resetCamera').name('reset camera');

    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      const planeCollision = intersects.find(collision => collision.object.name === 'Plane');
      if (planeCollision) {
        const collPointX = Math.round(planeCollision.point.x / 4 - 0.37);
        const collPointZ = Math.round(planeCollision.point.z / 4);
        highlightBlock.setPosition({ x: collPointX, z: collPointZ });
      }

      tiles.forEach((tile) => {
        tile.update(this.clock);
      });
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}

export default WorldEditor;
