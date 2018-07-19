import {MyGame} from '../components/play-game/play-game.component';
import {MyScene} from '../classes/MyScene';

export class MainScene extends MyScene {

  constructor() {
    super({
      key: 'MainScene'
    });
  }

  preload(): void {

    const preloadValue = this.add.text(100, 100, `test`, {
      fontSize: 20,
      fontFamily: 'Connection',
      align: 'center',
      weight: 'bold'
    });

    this.gameService = (<MyGame>this.sys.game).gameService;
    this.load.atlas(
      'characters',
      this.gameService.assetsService.getAsset('atlas/atlas.png'),
      this.gameService.assetsService.getAsset('atlas/atlas.json')
    );

    this.load.on('progress', (progress) => {
      preloadValue.setText(Math.round(100 * progress) + '%');
    });

    this.load.on('complete', (progress) => {
      preloadValue.destroy();
    });
  }

  create(): void {
    this.add.sprite(200, 200, 'characters', 'troll-1.png');
  }

  update(time, delta) {

  }

}

