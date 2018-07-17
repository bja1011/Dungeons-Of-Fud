import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const usedModules = [
  BrowserAnimationsModule,
  MatButtonModule,
];

@NgModule({
  imports: usedModules,
  exports: usedModules,
})
export class MyMaterialModule {
}
