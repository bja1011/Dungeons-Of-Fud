import {Component, OnInit} from '@angular/core';
import 'phaser';
import {GameService} from '../../providers/game.service';
import {AssetsService} from '../../../providers/assets.service';
import {MainScene} from '../../scenes/MainScene';
import {BootScene} from '../../scenes/Boot.scene';
import {MenuComponent} from '../menu/menu.component';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  constructor(private gameService: GameService,) {
  }

  ngOnInit() {

    const debugMode = window.location.search.indexOf('debug') > -1;
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
            debug: debugMode,
            gravity: {y: 0}
          }
        },
      },
      this.gameService
    );

    if (debugMode) {
      (<MyGame>this.gameService.game).debug = true;
    }

    window.addEventListener('resize', () => {
      this.gameService.game.resize(window.innerWidth, window.innerHeight);
    }, false);
  }

  openMenu() {
    this.gameService.dialogService.open(MenuComponent,{
      autoFocus: false
    });
  }

}

export class MyGame extends Phaser.Game {
  gameService: GameService;
  public debug = false;

  constructor(gameConfig: GameConfig, gameService: GameService) {
    super(gameConfig);
    this.gameService = gameService;
  }
}
