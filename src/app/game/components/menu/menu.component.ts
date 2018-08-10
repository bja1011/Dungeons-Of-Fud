import {Component, OnInit} from '@angular/core';
import {DialogService} from '../../../providers/dialog.service';
import {TrollpediaComponent} from '../trollpedia/trollpedia.component';
import {GameService} from '../../providers/game.service';
import {MainScene} from '../../scenes/MainScene';
import {MatDialogRef} from '@angular/material';
import {AboutComponent} from '../about/about.component';

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

  saveGame() {
    const scene = this.gameService.game.scene.getScene('MainScene');
    (<MainScene>scene).saveData();
    this.dialogRef.close();
    this.dialogService.showSnackBar('Game Saved!', 'Dismiss', {
      duration: 1500
    });
  }

  resetGame() {
    const scene = this.gameService.game.scene.getScene('MainScene');
    (<MainScene>scene).resetGame();
  }

  mute() {
    this.gameService.game.sound.mute = this.muteSounds;
  }

  openTrollopedia() {
    this.dialogService.open(
      TrollpediaComponent,
      {
        width: '300px',
        height: '405px',
        panelClass: 'trollpedia'
      }
    );
  }

  openAbout() {
    this.dialogService.open(
      AboutComponent,
      {
        width: '300px',
        height: '400px',
        autoFocus: false,
      }
    );
  }

}
