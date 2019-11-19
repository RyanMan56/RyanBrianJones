import { WebGLRenderer, Scene, OrthographicCamera, Vector3, AmbientLight, Clock } from 'three';
import { addDirectionalLight } from '../helpers';
import { richBlack } from '../colors';

class Tile {
  constructor(tileObject) {
    this.scene = null;
    this.renderer = null;
    this.element = null;

    return this.init(tileObject);
  }

  init(tileObject) {
    this.element = document.createElement('div');
    this.element.className = 'tile-item';

    const canvas = document.createElement('canvas');
    canvas.className = 'tile-item-canvas';
    canvas.width = 138;
    canvas.height = 138;
    this.element.appendChild(canvas);

    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.width, canvas.height);
    this.scene = new Scene();
    const d = 3;
    const camera = new OrthographicCamera(-d, d, d, -d, -100, 100);
    camera.position.set(1.5, -0.5, 0);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    camera.rotation.z = 0;

    this.scene.add(new AmbientLight(0xffffff, 1));
    this.renderer.setClearColor(richBlack, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene.add(tileObject.group);

    addDirectionalLight({
      scene: this.scene,
      color: 0xff9500,
      intensity: 2,
      position: new Vector3(0, 7, 5.1),
    });

    this.renderer.render(this.scene, camera);

    const title = document.createElement('span');
    title.className = 'tile-item-title';
    title.textContent = tileObject.name;
    this.element.appendChild(title);

    const clock = new Clock();
    clock.start();

    const animate = () => {
      if (this.renderer) {
        requestAnimationFrame(animate);
        tileObject.update(clock);
        this.renderer.render(this.scene, camera);
      }
    };
    animate();

    return this;
  }
}

export default Tile;
