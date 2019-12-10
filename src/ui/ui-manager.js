import { WebGLRenderer, Clock } from 'three';
import Tile from './tile';
import { NO_BUILDINGS } from '../helpers/tile-types';
import { richBlack } from '../colors';

class UIManager {
  constructor({ tileFactory = null, onTileChange = tile => null }) {
    this.tileFactory = tileFactory;
    this.onTileChange = onTileChange;

    this.tileTypes = null;
    this.uiTiles = [];
    this.selectedTile = null;
    this.canvas = null;
    this.renderer = null;

    this.resizeRendererToDisplaySize.bind(this);
    this.init();
  }

  init() {
    this.canvas = document.getElementById('ui-canvas');
    const tileItems = document.getElementById('tile-items');
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(tileItems.clientWidth, tileItems.clientHeight);
    this.renderer.setClearColor(0x000000, 0);

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

    const clock = new Clock();
    clock.start();

    this.addUIForTileType(currentType);
    requestAnimationFrame(() => this.render(clock));
  }

  addUIForTileType(currentType) {
    const tileItems = document.getElementById('tile-items-list');
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

    tile.element.className = this.selectedTile === tile ? 'tile-item' : 'tile-item-selected';
    this.selectedTile = this.selectedTile === tile ? null : tile;

    this.onTileChange(this.selectedTile && this.selectedTile.tileObject.group.clone());
  }

  onHeadingClick(type, element) {
    const tileItems = document.getElementById('tile-items-list');

    while (this.uiTiles.length > 0) {
      this.uiTiles[0].scene.dispose();
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

  resizeRendererToDisplaySize(renderer) {
    const tileItems = document.getElementById('tile-items');
    const width = tileItems.clientWidth;
    const height = tileItems.clientHeight;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      renderer.setSize(width, height);
    }
  }

  renderTile(item, clock) {
    const { scene, camera, element, tileObject } = item;

    tileObject.update(clock);
    const canvasArea = element.querySelector('.tile-item-canvas');

    const { left: tileLeft, bottom: tileBottom, width: tileWidth, height: tileHeight } = canvasArea.getBoundingClientRect();
    const { left: areaLeft, bottom: areaBottom } = document.getElementById('tile-items').getBoundingClientRect();


    camera.aspect = tileWidth / tileHeight;
    camera.updateProjectionMatrix();

    const positiveYUpTileBottom = window.innerHeight - tileBottom;
    const positiveYUpAreaBottom = window.innerHeight - areaBottom;

    this.renderer.setScissor(tileLeft - areaLeft, positiveYUpTileBottom - positiveYUpAreaBottom, tileWidth, tileHeight);
    this.renderer.setViewport(tileLeft - areaLeft, positiveYUpTileBottom - positiveYUpAreaBottom, tileWidth, tileHeight);

    this.renderer.render(scene, camera);
  }

  // When needed for scrolling: https://threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html
  render(clock) {
    this.resizeRendererToDisplaySize(this.renderer);

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setScissorTest(false);
    this.renderer.clear(true, true);
    this.renderer.setScissorTest(true);
    this.renderer.setClearColor(richBlack, 1);

    this.uiTiles.forEach((item) => {
      this.renderTile(item, clock);
    });

    requestAnimationFrame(() => this.render(clock));
  }
}

export default UIManager;
