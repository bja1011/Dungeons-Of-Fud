import {Component, OnInit} from '@angular/core';
import 'phaser';
import {GameService} from '../../providers/game.service';
import {AssetsService} from '../../../providers/assets.service';
import {MainScene} from '../../scenes/MainScene';
import {BootScene} from '../../scenes/Boot.scene';

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
        scene: [BootScene, MainScene],
        pixelArt: true,
        autoResize: true,
        activePointers: 1,
        physics: {
          default: 'arcade',
          arcade: {
            debug: true,
            gravity: {y: 0}
          }
        },
      },
      this.gameService
    );

    window.addEventListener('resize', (event) => {
      this.gameService.game.resize(window.innerWidth, window.innerHeight);
    }, false);
  }

}

export class MyGame extends Phaser.Game {
  gameService: GameService;

  constructor(gameConfig: GameConfig, gameService: GameService) {
    super(gameConfig);
    this.gameService = gameService;
  }
}
