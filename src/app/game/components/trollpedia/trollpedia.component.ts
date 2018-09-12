import {Component, OnInit} from '@angular/core';
import {AssetsService} from '../../../providers/assets.service';
import {characters} from '../../constants/data';

@Component({
  selector: 'app-trollpedia',
  templateUrl: './trollpedia.component.html',
  styleUrls: ['./trollpedia.component.scss']
})
export class TrollpediaComponent implements OnInit {

  characters: any[] = characters;

  constructor(public assetsService: AssetsService,) {
  }

  ngOnInit() {
  }

}
