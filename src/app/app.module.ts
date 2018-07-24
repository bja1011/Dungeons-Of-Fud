import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GameModule} from './game/game.module';
import {PlayGameComponent} from './game/components/play-game/play-game.component';
import {MyMaterialModule} from './my-material/my-material.module';
import {AssetsService} from './providers/assets.service';
import { SafePipe } from './safe.pipe';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: PlayGameComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GameModule,
    RouterModule.forRoot(appRoutes),
    MyMaterialModule,
  ],
  providers: [
    AssetsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

