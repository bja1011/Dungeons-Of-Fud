import 'phaser';

export class MyGameObject extends Phaser.Physics.Arcade.Sprite {

  name: string;
  type: string;
  level: number;
  data: any;

  constructor(params: MyGameObjectConfig) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
    params.scene.add.existing(this);
  }
}

export interface MyGameObjectConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | integer;
  data: any;
}

