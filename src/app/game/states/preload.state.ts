import {MyGame} from '../components/play-game/play-game.component';

export default class Preloader extends Phaser.State {
  private preloadBarSprite: Phaser.Sprite = null;
  private preloadFrameSprite: Phaser.Sprite = null;

  public preload(): void {
    this.load.image('building', (<MyGame>this.game).gameService.assetsService.getAsset('buildings/1.png'));
  }

  public create() {
    this.game.state.start('title');

  }
}
