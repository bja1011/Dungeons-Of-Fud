import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GameModule} from './game/game.module';
import {PlayGameComponent} from './game/components/play-game/play-game.component';
import {MyMaterialModule} from './my-material/my-material.module';

const appRoutes: Routes = [
  {path: '', component: PlayGameComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameModule,
    RouterModule.forRoot(appRoutes),
    MyMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

