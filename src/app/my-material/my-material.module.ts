import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule, MatGridListModule,
  MatIconModule,
  MatListModule, MatSnackBarModule,
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
  MatSnackBarModule,
];

@NgModule({
  imports: usedModules,
  exports: usedModules,
})
export class MyMaterialModule {
}

