import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  public open(component, config?: MatDialogConfig) {
    return this.dialog.open(component, config);
  }

  showSnackBar(message: string, action: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }

  closeAll() {
    this.dialog.closeAll();
  }
}

