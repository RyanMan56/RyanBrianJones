import { Scene, OrthographicCamera, Vector3, AmbientLight } from 'three';
import { addDirectionalLight } from '../helpers';

class Tile {
  constructor(tileObject) {
    this.tileObject = tileObject;

    this.scene = null;
    this.camera = null;
    this.element = null;

    return this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'tile-item';

    const canvas = document.createElement('div');
    canvas.className = 'tile-item-canvas';
    this.element.appendChild(canvas);

    this.scene = new Scene();
    const d = 3;
    this.camera = new OrthographicCamera(-d, d, d, -d, -100, 100);
    this.camera.position.set(1.5, -0.5, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = -Math.PI / 4;
    this.camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    this.camera.rotation.z = 0;

    this.scene.add(new AmbientLight(0xffffff, 1));
    this.scene.add(this.tileObject.group);

    addDirectionalLight({
      scene: this.scene,
      color: 0xff9500,
      intensity: 2,
      position: new Vector3(0, 7, 5.1),
    });

    const title = document.createElement('span');
    title.className = 'tile-item-title';
    title.textContent = this.tileObject.name;
    this.element.appendChild(title);

    return this;
  }
}

export default Tile;
