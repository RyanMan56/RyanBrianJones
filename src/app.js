import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { black, purple, lightSkyBlue } from './colors';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(purple, 1);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: black });
const cube = new Mesh(geometry, material);
scene.add(cube);

const edges = new EdgesGeometry(geometry);
const line = new LineSegments(edges, new LineBasicMaterial({ color: lightSkyBlue }));

cube.add(line);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};
animate();
