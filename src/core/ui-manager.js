import { WebGLRenderer } from 'three';
import Tile from '../ui/tile';

class UIManager {
  constructor() {
    this.init();
  }

  init() {
    const tileSelector = document.getElementById('tile-selector-body');
    console.log(tileSelector.clientHeight);
    tileSelector.appendChild(new Tile());
  }
}

export default UIManager;
