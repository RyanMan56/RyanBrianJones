import Tile from './tile';
import { NO_BUILDINGS } from '../helpers/tile-types';

class UIManager {
  constructor({ tileFactory = null }) {
    this.tileFactory = tileFactory;

    this.tileTypes = null;
    this.uiTiles = [];
    this.selectedTile = null;
    this.init();
  }

  init() {
    const currentType = NO_BUILDINGS;

    this.tileTypes = {
      NO_BUILDINGS: { label: 'No buildings', items: this.tileFactory.noBuildingsTiles },
      OSCILLATE: { label: 'Towers', items: this.tileFactory.oscillatingTiles },
      BRIDGE: { label: 'Bridges', items: [] },
    };
    const tileHeadings = document.getElementById('tile-types');

    Object.keys(this.tileTypes).forEach((type, i) => {
      const tileType = this.tileTypes[type];

      const element = document.createElement('span');
      element.textContent = tileType.label;
      element.className = i === 0 ? 'tile-type-selected' : 'tile-type';
      element.onclick = () => this.onHeadingClick(type, element);

      tileHeadings.appendChild(element);
    });

    this.addUIForTileType(currentType);
  }

  addUIForTileType(currentType) {
    const tileItems = document.getElementById('tile-items');
    this.tileTypes[currentType].items.forEach((tileObject) => {
      const tile = new Tile(tileObject);
      this.uiTiles.push(tile);
      tile.element.onclick = () => this.onTileClick(tile);
      tileItems.appendChild(tile.element);
    });
  }

  onTileClick(tile) {    
    const selectedTiles = document.getElementsByClassName('tile-item-selected');
    for (let i = 0; i < selectedTiles.length; i++) {
      selectedTiles[i].className = 'tile-item';
    }

    tile.element.className = 'tile-item-selected';
    this.selectedTile = tile;
  }

  onHeadingClick(type, element) {
    const tileItems = document.getElementById('tile-items');

    while (this.uiTiles.length > 0) {
      // TODO: This is really really bad. Contexts aren't being properly destroyed, we're just fooling js.
      // Needed though, otherwise the main scene (more specifically the main WebGLRenderingContext) is automatically disposed.
      this.uiTiles[0].scene.dispose();
      this.uiTiles[0].renderer.forceContextLoss();
      this.uiTiles[0].renderer.dispose();
      this.uiTiles[0].renderer.domElement = null;
      this.uiTiles[0].renderer = null;
      this.uiTiles.shift();
    }
    while (tileItems.lastChild) {
      tileItems.removeChild(tileItems.lastChild);
    }

    const selectedHeadings = document.getElementsByClassName('tile-type-selected');
    for (let i = 0; i < selectedHeadings.length; i++) {
      selectedHeadings[i].className = 'tile-type';
    }

    element.className = 'tile-type-selected';
    this.addUIForTileType(type);
  }
}

export default UIManager;
