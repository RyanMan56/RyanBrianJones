import { WebGLRenderer, Scene, OrthographicCamera, Vector3, AmbientLight, Clock } from 'three';
import CityTileStraight from '../components/tiles/city-tile-straight';
import { addDirectionalLight } from '../helpers';
import { richBlack } from '../colors';
import { OSCILLATE } from '../helpers/buildings/building-types';

class Tile {
  constructor(tileObject) {
    return this.init(tileObject);
  }

  init(tileObject) {
    const element = document.createElement('div');
    element.className = 'tile-item';

    const canvas = document.createElement('canvas');
    canvas.className = 'tile-item-canvas';
    canvas.width = 138;
    canvas.height = 138;
    element.appendChild(canvas);

    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    const scene = new Scene();
    const d = 3;
    const camera = new OrthographicCamera(-d, d, d, -d, -100, 100);
    camera.position.set(1.5, -0.5, 0);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    camera.rotation.z = 0;

    scene.add(new AmbientLight(0xffffff, 1));
    renderer.setClearColor(richBlack, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    const tileClone = tileObject.clone();
    scene.add(tileClone.group);

    addDirectionalLight({
      scene,
      color: 0xff9500,
      intensity: 2,
      position: new Vector3(0, 7, 5.1),
    });

    renderer.render(scene, camera);

    const title = document.createElement('span');
    title.className = 'tile-item-title';
    title.textContent = tileClone.name;
    element.appendChild(title);

    // const clock = new Clock();
    // clock.start();


    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   cityTile.update(clock);
    //   renderer.render(scene, camera);
    // };
    // animate();

    return element;
  }
}

export default Tile;
