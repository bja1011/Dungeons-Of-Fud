import {Component, OnInit} from '@angular/core';
import {GameService} from '../../providers/game.service';
import {MenuComponent} from '../menu/menu.component';

import * as Phaser from 'phaser-ce';

import Boot from '../../states/boot.state';
import Preloader from '../../states/preload.state';
import Title from '../../states/main.state';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  constructor(public gameService: GameService,) {
  }

  ngOnInit() {

    const debugMode = window.location.search.indexOf('debug') > -1;

    const gameConfig: Phaser.IGameConfig = {
      enableDebug: false,
      width: window.innerWidth * devicePixelRatio,
      height: window.innerHeight * devicePixelRatio,
      renderer: Phaser.AUTO,
      parent: 'game',
      transparent: false,
      antialias: true,
    };

    this.gameService.game = new MyGame(gameConfig);

    (<MyGame>this.gameService.game).gameService = this.gameService;

    // if (debugMode) {
    //   (<MyGame>this.gameService.game).debug = true;
    // }
    //
    // window.addEventListener('resize', () => {
    //   this.gameService.game.resize(window.innerWidth, window.innerHeight);
    // }, false);
  }

  openMenu() {
    this.gameService.dialogService.open(MenuComponent, {
      autoFocus: false
    });
  }

}


export class MyGame extends Phaser.Game {
  public gameService: GameService;

  constructor(config: Phaser.IGameConfig) {
    super(config);

    this.state.add('boot', Boot);
    this.state.add('preloader', Preloader);
    this.state.add('title', Title);

    this.state.start('boot');
  }
}
