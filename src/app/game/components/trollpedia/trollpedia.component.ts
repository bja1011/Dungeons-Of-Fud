import {Component, OnInit} from '@angular/core';
import {trolls} from '../../constants/data';

@Component({
  selector: 'app-trollpedia',
  templateUrl: './trollpedia.component.html',
  styleUrls: ['./trollpedia.component.scss']
})
export class TrollpediaComponent implements OnInit {

  trolls: any[] = trolls;

  ngOnInit() {
  }

}
