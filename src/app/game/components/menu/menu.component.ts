import {Component, OnInit} from '@angular/core';
import {DialogService} from '../../../providers/dialog.service';
import {TrollpediaComponent} from '../trollpedia/trollpedia.component';
import {GameService} from '../../providers/game.service';
import {MainScene} from '../../scenes/MainScene';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private dialogService: DialogService,
              private gameService: GameService,
              private dialogRef: MatDialogRef<MenuComponent>,) {
  }

  ngOnInit() {
  }

  saveGame() {
    let scene = this.gameService.game.scene.getScene('MainScene');
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

  openTrollopedia() {
    this.dialogService.open(
      TrollpediaComponent,
      {
        width: '300px',
        height: '400px'
      }
    );
  }

}
