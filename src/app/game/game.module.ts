import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayGameComponent} from './components/play-game/play-game.component';
import {TrollpediaComponent} from './components/trollpedia/trollpedia.component';
import {MyMaterialModule} from '../my-material/my-material.module';
import {MenuComponent} from './components/menu/menu.component';
import {ConversationComponent} from './components/conversation/conversation.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
  ],
  exports: [
    PlayGameComponent,
  ],
  entryComponents: [
    TrollpediaComponent,
    MenuComponent,
    ConversationComponent,
  ],
  declarations: [
    PlayGameComponent,
    TrollpediaComponent,
    MenuComponent,
    ConversationComponent,
  ]
})
export class GameModule {
}
