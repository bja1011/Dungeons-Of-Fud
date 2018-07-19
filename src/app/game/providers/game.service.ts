import {Injectable} from '@angular/core';
import {AssetsService} from '../../providers/assets.service';
import {DialogService} from '../../providers/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Phaser.Game;

  constructor(public assetsService: AssetsService,
              public dialogService: DialogService,) {
  }
}
