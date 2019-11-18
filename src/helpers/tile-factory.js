import CityTileStraight from '../components/tiles/city-tile-straight';
import CityTileCorner from '../components/tiles/city-tile-corner';

class TileFactory {
  constructor() {
    this.tiles = [];
    this.cityTileStraight = null;
    this.cityTileCorner = null;

    this.init();

    return this;
  }

  init() {
    this.cityTileStraight = new CityTileStraight();
    this.cityTileCorner = new CityTileCorner();

    this.tiles.push(this.cityTileStraight);
    this.tiles.push(this.cityTileCorner);
  }
}

export default TileFactory;
