import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayGameComponent } from './components/play-game/play-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PlayGameComponent,
  ],
  declarations: [PlayGameComponent]
})
export class GameModule { }
