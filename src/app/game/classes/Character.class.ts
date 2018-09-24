import 'phaser';
import {MyGameObject, MyGameObjectConfig} from './MyGameObject.class';
import * as configs from '../constants/configs';
import {configDef} from '../constants/data';
import {ConversationComponent} from '../components/conversation/conversation.component';
import {MyScene} from './MyScene';

export class Character extends MyGameObject {

  name: string;
  type: string;
  level: number;
  interactionRadius = 30;
  id: number;
  nameText: Phaser.GameObjects.Text;
  explored = false;
  converted = false;
  convertedFrameName: string;
  killed: boolean;
  convertAnimSprite: any;
  puffSound: any;
  talk = false;
  data: any;

  constructor(params: MyGameObjectConfig) {
    super(params);
    this.gameService = (<MyScene>this.scene).gameService;

    params.scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setDepth(this.y);

    this.data = params.data;
    this.convertedFrameName = this.data.convertedFrameName;

    this.name = params.data.name;
    this.type = params.data.type;

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

  convert(instant?: boolean) {
    this.interactionRadius = 0;

    setTimeout(() => {
      this.nameText.setText(this.nameText.text.replace('XRP troll', 'Converted Supporter'));
    }, instant ? 0 : 2000);

    if (instant) {
      this.setFrame(this.convertedFrameName);
      this.converted = true;
    } else {
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
          this.setFrame(this.convertedFrameName);
        }
      });
    }
  }

  isInteracting(playerX: number, playerY: number) {
    return Phaser.Math.Distance.Between(playerX, playerY, this.x, this.y) < this.interactionRadius;
  }

  isTroll() {
    return this.type === 'troll';
  }

  update() {

    const player = (<MyScene>this.scene).player;

    const distance = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);

    // Set troll to look at player direction
    if (player.x < this.x) {
      this.setScale(1, 1);
    } else {
      this.setScale(-1, 1);
    }

    this.nameText.setAlpha(1 - distance / 100);

    if (this.isTroll() && distance < 100) {
      this.scene['player'].aura.setAlpha(1 - distance / 100);
    }

    if (!this.converted) {

      if (!this.talk && distance <= this.interactionRadius) {

        this.explored = true;
        this.talk = true;

        this.scene['vj'].hide();

        const dialogRef = this.gameService.dialogService.open(
          ConversationComponent,
          {
            maxHeight: '500px',
            data: {
              characterId: this.id,
              confirmCallback: () => {
                this.gameService.eventEmitter.emit({
                  type: 'exp',
                  value: 500
                });
                this.convert();
              }
            }
          }
        );

        player.stopped = true;

        dialogRef.afterClosed().subscribe((result: Character) => {
          player.stopped = false;

          if (result && result.id === 99) {

            this.gameService.eventEmitter.emit({
              type: 'exp',
              value: 100
            });

            this.converted = true;
            this.gameService.dialogService.showSnackBar('Received The Manuscript of Truth!', 'Dismiss', {
              duration: 1500
            });
          }
        });
      }
    } else {
      // this.scene.physics.moveTo(this, player.x, player.y, 180);
    }

    if (
      this.talk && !this.isInteracting(player.x, player.y)
    ) {
      this.talk = false;
    }
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

