import 'phaser';

export class PreloadScene extends Phaser.Scene {

  preload() {

  }

  create() {
    this.add.sprite(100, 100, 'test');
  }

}
