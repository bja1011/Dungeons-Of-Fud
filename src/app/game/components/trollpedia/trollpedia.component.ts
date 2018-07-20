import {Component, OnInit} from '@angular/core';
import {trolls} from '../../constants/data';
import {AssetsService} from '../../../providers/assets.service';

@Component({
  selector: 'app-trollpedia',
  templateUrl: './trollpedia.component.html',
  styleUrls: ['./trollpedia.component.scss']
})
export class TrollpediaComponent implements OnInit {

  trolls: any[] = trolls;

  constructor(public assetsService: AssetsService,) {
  }

  ngOnInit() {
  }

}
