import {Component, OnInit} from '@angular/core';
import 'phaser';
import {GameService} from '../../providers/game.service';
import {AssetsService} from '../../../providers/assets.service';
import {MainScene} from '../../scenes/mainScene';

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
    this.gameService.game = new MyGame(<any>{
        width: innerWidth,
        height: innerHeight,
        type: Phaser.WEBGL,
        parent: 'game',
        scene: MainScene,
        pixelArt: true,
        autoResize: true,
        activePointers: 1,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            gravity: {y: 0}
          }
        },
      },
      this.gameService);
  }

}

export class MyGame extends Phaser.Game {
  gameService: GameService;

  constructor(gameConfig: GameConfig, gameService: GameService) {
    super(gameConfig);
    this.gameService = gameService;
  }
}
