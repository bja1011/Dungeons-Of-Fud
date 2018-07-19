import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const usedModules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  imports: usedModules,
  exports: usedModules,
})
export class MyMaterialModule {
}

