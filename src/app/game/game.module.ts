import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { TrollpediaComponent } from './components/trollpedia/trollpedia.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PlayGameComponent,
  ],
  entryComponents: [
    TrollpediaComponent,
  ],
  declarations: [PlayGameComponent, TrollpediaComponent]
})
export class GameModule { }
