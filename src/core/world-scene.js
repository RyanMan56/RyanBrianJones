import { Math as ThreeMath, AmbientLight, Vector3 } from 'three';
import * as dat from 'dat.gui';
import BaseScene from './base-scene';
import CityTileStraight from '../components/tiles/city-tile-straight';
import CityTileCorner from '../components/tiles/city-tile-corner';
import { OSCILLATE } from '../helpers/tile-types';
import ColorGUIHelper from '../helpers/color-gui-helper';
import { addDirectionalLight } from '../helpers';

class WorldScene extends BaseScene {
  renderWorld() {
    const tiles = [];

    const cityTile = new CityTileStraight({ position: new Vector3(0, 0, 0), backType: OSCILLATE });
    tiles.push(cityTile);

    const curvedCityTile = new CityTileCorner({ position: new Vector3(0, 0, -1), rotation: new Vector3(0, ThreeMath.degToRad(-90), 0) });
    tiles.push(curvedCityTile);

    tiles.push(curvedCityTile.clone()
      .setPosition({ x: 1, z: -1 })
      .setRotation({ y: ThreeMath.degToRad(0) }));

    tiles.push(cityTile.clone()
      .setPosition({ x: 1, z: 0 })
      .addBuildings(OSCILLATE));

    tiles.push(curvedCityTile.clone()
      .setPosition({ x: 1, z: 1 })
      .setRotation({ y: ThreeMath.degToRad(180) }));

    tiles.push(curvedCityTile.clone()
      .setPosition({ x: 0, z: 1 })
      .setRotation({ y: ThreeMath.degToRad(90) }));

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

export default WorldScene;
