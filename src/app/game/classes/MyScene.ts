import {GameService} from '../providers/game.service';

export class MyScene extends Phaser.Scene {

  gameService: GameService;

  constructor(config) {
    super(config);
  }

  resize() {
    this.cameras.resize(innerWidth, innerHeight);
  }

}
