import { WebGLRenderer } from 'three';
import Tile from '../ui/tile';

class UIManager {
  constructor({ tileFactory = null }) {
    this.tileFactory = tileFactory;
    this.init();
  }

  init() {
    const tileSelector = document.getElementById('tile-selector-body');

    this.tileFactory.tiles.forEach((tileObject) => {
      tileSelector.appendChild(new Tile(tileObject));
    });
    console.log(tileSelector.clientHeight);
  }
}

export default UIManager;
