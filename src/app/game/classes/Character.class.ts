import 'phaser';
import {MyGameObject, MyGameObjectConfig} from './MyGameObject.class';

export class Character extends MyGameObject {

  name: string;
  type: string;
  level: number;

  constructor(params: MyGameObjectConfig) {
    super(params);
    params.scene.add.existing(this);
  }
}

export interface CharacterConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | integer;
}

