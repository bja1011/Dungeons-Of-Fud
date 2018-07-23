import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {getFud, getTroll} from '../../constants/data';
import {DialogService} from '../../../providers/dialog.service';
import {FudViewComponent} from '../fud-view/fud-view.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  troll: any;
  fud: any;

  confirmCallback = () => {
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ConversationComponent>,
              public dialogService: DialogService,) {
  }

  ngOnInit() {
    this.troll = getTroll(this.data.trollId);
    this.fud = getFud(this.troll.fudIds[0]);

    if (this.data.confirmCallback) {
      this.confirmCallback = this.data.confirmCallback;
    }

    this.dialogRef.afterClosed()
      .subscribe((a) => {
      });
  }

  showFudUrl(fudUrl: string) {
    const fudDialogRef = this.dialogService.open(FudViewComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      panelClass: 'fud-view-dialog',
      data: {
        fudUrl
      }
    });

    fudDialogRef.afterClosed()
      .subscribe((response: string) => {
        this.dialogService.closeAll();

        if (response === 'confirmed' && this.confirmCallback) {
          this.confirmCallback();
        }
      });
  }

}
