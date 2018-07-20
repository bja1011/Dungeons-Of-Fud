import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public open(component, config?) {
    return this.dialog.open(component, {...defaultDialogConfig, config});
  }
}

const defaultDialogConfig: any = {
  height: '400px',
  width: '300px',
};
