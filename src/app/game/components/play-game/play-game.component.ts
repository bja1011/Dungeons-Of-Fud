import {Component, OnInit} from '@angular/core';
import 'phaser';
import {PreloadScene} from '../../scenes/Preload.scene';
import {GameService} from '../../providers/game.service';
import {AssetsService} from '../../../providers/assets.service';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  constructor(private gameService: GameService,
              private assetsService: AssetsService,) {
  }

  ngOnInit() {
    this.gameService.game = new MyGame({
        width: innerWidth,
        height: innerHeight,
        type: Phaser.WEBGL,
        parent: 'game',
        disableContextMenu: true,
        scene: [PreloadScene],
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            gravity: {y: 0}
          }
        }
      },
      this.gameService);
  }

}

class MyGame extends Phaser.Game {
  gameService: GameService;

  constructor(gameConfig: GameConfig, gameService: GameService) {
    super(gameConfig);
    this.gameService = gameService;
  }
}
