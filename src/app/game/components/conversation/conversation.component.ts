import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {getFud, getTroll, trolls} from '../../constants/data';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  troll: any;
  fud: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.troll = getTroll(this.data.trollId);
    this.fud = getFud(this.troll.fudIds[0]);
  }

}
