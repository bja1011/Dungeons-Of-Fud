import {Component, OnInit} from '@angular/core';
import {DialogService} from '../../../providers/dialog.service';
import {GameService} from '../../providers/game.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  muteSounds = this.gameService.game.sound.mute;

  constructor(private dialogService: DialogService,
              private gameService: GameService,
              public dialogRef: MatDialogRef<MenuComponent>,) {
  }

  mute() {
    this.gameService.game.sound.mute = this.muteSounds;
  }


}
