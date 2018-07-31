import 'phaser';
import {MyScene} from '../classes/MyScene';
import {MyGame} from '../components/play-game/play-game.component';

export class BootScene extends MyScene {

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload() {
    this.gameService = (<MyGame>this.sys.game).gameService;

    let t = this.add.text(innerWidth / 2, 50, `preloading...`, {
      fontSize: 20,
      fontFamily: 'Connection',
      align: 'center',
      weight: 'bold'
    });
    t.setOrigin(0.5, 1);
    this.load.image('splash', this.gameService.assetsService.getAsset('splash.png'));
  }

  create() {
    this.scene.start('MainScene');
  }

}
