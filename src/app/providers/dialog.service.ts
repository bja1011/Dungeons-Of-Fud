import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public open(component: any) {
    return this.dialog.open(component);
  }
}
