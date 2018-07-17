import {Component, OnInit} from '@angular/core';
import 'phaser';
import {PreloadScene} from '../../scenes/Preload.scene';
import {GameService} from '../../providers/game.service';

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
      disableContextMenu: true,
      scene: [PreloadScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: {y: 0}
        }
      }
    });
  }

}
