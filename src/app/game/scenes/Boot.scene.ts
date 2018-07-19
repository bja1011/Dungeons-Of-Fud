import 'phaser';
import {MyScene} from '../classes/MyScene';

export class BootScene extends MyScene {

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload() {
    let t = this.add.text(100, 100, `test`, {
      fontSize: 20,
      fontFamily: 'Connection',
      align: 'center',
      weight: 'bold'
    });
  }

  create() {
    this.scene.start('MainScene');
  }

}
