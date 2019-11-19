import BaseScene from './core/base-scene';
import WorldScene from './core/world-scene';
import WorldEditor from './core/world-editor';
import UIManager from './ui/ui-manager';
import TileFactory from './helpers/tile-factory';

const tileFactory = new TileFactory();
new WorldEditor({ tileFactory });
