import { GameService } from '../providers/game.service';
import { Player } from './Player.class';

export class MyScene extends Phaser.Scene {
  gameService: GameService;
  player: Player;

  constructor(config) {
    super(config);
  }

  resize() {
    this.cameras.resize(innerWidth, innerHeight);
  }
}
