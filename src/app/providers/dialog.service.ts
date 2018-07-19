import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {TrollpediaComponent} from '../game/components/trollpedia/trollpedia.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public open() {
    return this.dialog.open(TrollpediaComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
