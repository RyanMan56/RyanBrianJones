import BaseScene from './core/base-scene';
import WorldScene from './core/world-scene';
import WorldEditor from './core/world-editor';
import UIManager from './core/ui-manager';
import TileFactory from './helpers/tile-factory';

const tileFactory = new TileFactory();
new UIManager({ tileFactory });
new WorldEditor({ tileFactory });
