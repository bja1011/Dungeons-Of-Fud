import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Phaser.Game;

  constructor() {
  }
}
