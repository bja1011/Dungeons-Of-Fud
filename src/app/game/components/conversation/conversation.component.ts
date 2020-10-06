import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { getCharacter, getFud } from '../../constants/data';
import { DialogService } from '../../../providers/dialog.service';
import { FudViewComponent } from '../fud-view/fud-view.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  character: any;
  fud: any;

  confirmCallback = () => {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConversationComponent>,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.character = getCharacter(this.data.characterId);
    this.fud = getFud(this.character.fudIds[0]);

    if (this.data.confirmCallback) {
      this.confirmCallback = this.data.confirmCallback;
    }

    // this.dialogRef.afterClosed()
    //   .subscribe((a) => {
    //   });
  }

  showFudUrl(fudUrl: string) {
    const fudDialogRef = this.dialogService.open(FudViewComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      panelClass: 'fud-view-dialog',
      data: {
        fudUrl,
      },
    });

    fudDialogRef.afterClosed().subscribe((response: string) => {
      this.dialogService.closeAll();

      if (response === 'confirmed' && this.confirmCallback) {
        this.confirmCallback();
      }
    });
  }
}
