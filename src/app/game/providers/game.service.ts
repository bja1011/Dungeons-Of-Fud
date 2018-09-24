import {EventEmitter, Injectable} from '@angular/core';
import {AssetsService} from '../../providers/assets.service';
import {DialogService} from '../../providers/dialog.service';
import {MyScene} from '../classes/MyScene';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Phaser.Game;
  scene: MyScene;
  gameReady = false;
  eventEmitter: EventEmitter<any>;
  playerExp = 0;

  constructor(public assetsService: AssetsService,
              public dialogService: DialogService,) {

    this.eventEmitter = new EventEmitter();

    this.eventEmitter.subscribe((event) => {
      console.log(event);
      switch (event.type) {
        case 'exp':
          this.playerExp += event.value;
          break;
      }
    });
  }
}
