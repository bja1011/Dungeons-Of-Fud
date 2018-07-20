import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule, MatGridListModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const usedModules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatListModule,
  MatGridListModule,
];

@NgModule({
  imports: usedModules,
  exports: usedModules,
})
export class MyMaterialModule {
}

