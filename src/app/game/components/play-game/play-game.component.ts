import {Component, OnInit} from '@angular/core';
import 'phaser';
import {PreloadScene} from '../../scenes/Preload.scene';
import {GameService} from '../../providers/game.service';
import {MainScene} from '../../scenes/mainScene';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.game = new Phaser.Game({
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
    });
  }

}
