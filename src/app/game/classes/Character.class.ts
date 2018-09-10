import 'phaser';
import {MyGameObject, MyGameObjectConfig} from './MyGameObject.class';
import * as configs from '../constants/configs';
import {configDef} from '../constants/data';

export class Character extends MyGameObject {

  name: string;
  type: string;
  level: number;
  interactionRadius = 30;
  id: number;
  nameText: Phaser.GameObjects.Text;
  explored = false;
  converted: boolean;
  convertedFrameName: string;
  killed: boolean;
  convertAnimSprite: any;
  puffSound: any;
  talk = false;
  data: any;

  constructor(params: MyGameObjectConfig) {
    super(params);
    params.scene.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setDepth(this.y);

    this.data = params.data;

    this.name = params.data.name;
    this.type = params.data.type;

    // if (obj.properties && obj.properties.name) {
    //   name = obj.properties.name;
    // }

    // if (obj.properties && obj.properties.type) {
    //   name += ' \n ' + obj.properties.type;
    // }
    const characterNameText = this.scene.add.text(this.x, this.y - 50, `${this.name} \n ${this.data.typeName}`, {
      fontSize: 17,
      fontFamily: 'Connection',
      align: 'center',
    });
    characterNameText.setOrigin(0.5, 1);
    characterNameText.setStroke('#000', 5);
    characterNameText.setDepth(this.depth);
    characterNameText.setAlpha(0);

    this.nameText = characterNameText;

    if (this.type === 'troll') {
      const puff = this.scene.add.sprite(this.x, this.y, 'puff-anim', 0);
      puff.setOrigin(0.5, 0.7);
      //
      const characterPuff = {
        ...configDef,
        key: 'puff',
        duration: 3,
        frameRate: 9,
        repeat: 0,
        frames: this.scene.anims.generateFrameNumbers('puff-anim', {start: 0, end: 3}),
      };

      this.scene.anims.create(characterPuff);
      puff.alpha = 0;
      puff.on('animationcomplete', (animation, frame) => {
        puff.alpha = 0;
      });
      puff.depth = this.depth + 1;

      this.convertAnimSprite = puff;
      this.puffSound = this.scene.sound.add('heal', configs.heal);
    }

  }

  convert() {
    this.interactionRadius = 0;
    setTimeout(() => {
      this.nameText.setText(this.nameText.text.replace('XRP troll', 'Converted Supporter'));
    }, 2000);

    this.scene.tweens.add({
      targets: this,
      x: this.x + 7,
      duration: 50,
      yoyo: true,
      repeat: 15,
      onComplete: () => {
        this.convertAnimSprite.alpha = 1;
        this.convertAnimSprite.play('puff');
        this.puffSound.play();
        this.converted = true;
        this.setFrame(this.frame.name.replace('1', '1a'));
        this.setFrame(this.frame.name.replace('2', '2a'));
        this.setFrame(this.frame.name.replace('3', '3a'));
      }
    });
  }

  collide() {
  }

}

export interface CharacterConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | integer;
  data: any;
}

