import { Math as ThreeMath, AmbientLight, Vector3 } from 'three';
import * as dat from 'dat.gui';
import BaseScene from './base-scene';
import CityTileStraight from '../components/tiles/city-tile-straight';
import CityTileCorner from '../components/tiles/city-tile-corner';
import { OSCILLATE } from '../helpers/buildings/building-types';
import ColorGUIHelper from '../helpers/color-gui-helper';
import { addDirectionalLight, parseWorldMap } from '../helpers';
import worldMap from '../assets/world-map.json';

class WorldEditor extends BaseScene {
  renderWorld() {
    const tiles = parseWorldMap(worldMap);

    tiles.forEach((tile) => {
      this.scene.add(tile.group);
    });

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

export default WorldEditor;
