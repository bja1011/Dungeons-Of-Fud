import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-fud-view',
  templateUrl: './fud-view.component.html',
  styleUrls: ['./fud-view.component.scss']
})
export class FudViewComponent implements OnInit, AfterViewInit {

  fudUrl: string;
  showButton = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FudViewComponent>) {
  }

  ngOnInit() {
    this.fudUrl = this.data.fudUrl;
  }

  onLoad(event) {
    setTimeout(() => {
      this.showButton = true;
    }, 10000);
  }

  ngAfterViewInit() {
    const iframe = document.querySelector('iframe');
    iframe.onload = (event) => {
      this.showButton = true;
    };
  }

}
