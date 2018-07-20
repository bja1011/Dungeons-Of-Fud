import {Component, OnInit} from '@angular/core';
import {DialogService} from '../../../providers/dialog.service';
import {TrollpediaComponent} from '../trollpedia/trollpedia.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private dialogService: DialogService,) {
  }

  ngOnInit() {
  }

  openTrollopedia() {
    this.dialogService.open(TrollpediaComponent);
  }

}
