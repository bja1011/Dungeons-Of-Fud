import 'phaser';
import { Character, CharacterConfig } from './Character.class';

export class Troll extends Character {
  converted: boolean;
  convertedFrameName: string;
  killed: boolean;
  convertAnimSprite: any;
  puffSound: any;

  constructor(params: CharacterConfig) {
    super(params);
  }
}
