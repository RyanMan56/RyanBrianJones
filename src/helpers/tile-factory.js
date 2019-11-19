import CityTileStraight from '../components/tiles/city-tile-straight';
import CityTileCorner from '../components/tiles/city-tile-corner';
import { OSCILLATE } from './tile-types';

class TileFactory {
  constructor() {
    this.tiles = [];
    this.oscillatingTiles = [];
    this.noBuildingsTiles = [];
    this.cityTileStraight = null;
    this.cityTileCorner = null;

    this.init();

    return this;
  }

  init() {
    this.cityTileStraight = new CityTileStraight();
    this.cityTileCorner = new CityTileCorner();

    this.tiles.push(this.cityTileStraight.clone());
    this.tiles.push(this.cityTileCorner.clone());

    this.noBuildingsTiles.push(this.cityTileStraight.clone());
    this.noBuildingsTiles.push(this.cityTileCorner.clone());

    this.oscillatingTiles.push(this.cityTileStraight.clone().addBuildings(OSCILLATE));
  }
}

export default TileFactory;
