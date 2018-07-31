import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayGameComponent} from './components/play-game/play-game.component';
import {TrollpediaComponent} from './components/trollpedia/trollpedia.component';
import {MyMaterialModule} from '../my-material/my-material.module';
import {MenuComponent} from './components/menu/menu.component';
import {ConversationComponent} from './components/conversation/conversation.component';
import {SafePipe} from '../safe.pipe';
import {FudViewComponent} from './components/fud-view/fud-view.component';
import {FormsModule} from '@angular/forms';
import { DemoEndComponent } from './components/demo-end/demo-end.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
  ],
  exports: [
    PlayGameComponent,
  ],
  entryComponents: [
    TrollpediaComponent,
    MenuComponent,
    ConversationComponent,
    FudViewComponent,
    DemoEndComponent,
  ],
  declarations: [
    PlayGameComponent,
    TrollpediaComponent,
    MenuComponent,
    ConversationComponent,
    SafePipe,
    FudViewComponent,
    DemoEndComponent,
  ]
})
export class GameModule {
}
