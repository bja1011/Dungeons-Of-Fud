import 'phaser';
import { MyGameObject, MyGameObjectConfig } from './MyGameObject.class';
import { configDef } from '../constants/data';
import Sprite = Phaser.GameObjects.Sprite;
import { MyScene } from './MyScene';

export class Player extends MyGameObject {
  name: string;
  type: string;
  level: number;
  data: any;
  stopped = false;
  aura: Sprite;
  exp = 0;

  constructor(params: MyGameObjectConfig) {
    super(params);
    this.gameService = (<MyScene>this.scene).gameService;
    params.scene.physics.add.existing(this);

    this.setSize(5, 3);
    this.setOrigin(0.5, 1);

    this.createAnims();

    this.gameService.eventEmitter.subscribe((event) => {
      switch (event.type) {
        case 'exp':
          this.addExp(event.value);

          break;
      }
    });
  }

  createAnims() {
    const animWalkDownCfg = {
      ...configDef,
      key: 'walk-down',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {
        start: 0,
        end: 5,
      }),
    };

    const animWalkLeftCfg = {
      ...configDef,
      key: 'walk-left',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {
        start: 6,
        end: 11,
      }),
    };

    const animWalkRightCfg = {
      ...configDef,
      key: 'walk-right',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {
        start: 12,
        end: 17,
      }),
    };

    const animWalkUpCfg = {
      ...configDef,
      key: 'walk-up',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {
        start: 18,
        end: 23,
      }),
    };

    const idleWalkUpCfg = {
      ...configDef,
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {
        start: 0,
        end: 0,
      }),
    };

    const auraCfg = {
      ...configDef,
      key: 'aura',
      frames: this.scene.anims.generateFrameNumbers('aura-anim', {
        start: 0,
        end: 31,
      }),
    };

    this.scene.anims.create(animWalkDownCfg);
    this.scene.anims.create(animWalkLeftCfg);
    this.scene.anims.create(animWalkUpCfg);
    this.scene.anims.create(animWalkRightCfg);
    this.scene.anims.create(idleWalkUpCfg);
    this.scene.anims.create(auraCfg);

    this.aura = this.scene.add.sprite(this.x, this.y, 'aura-anim');
    this.aura.setOrigin(0.5, 0.8);
    this.aura.anims.play('aura');
    this.aura.setAlpha(0);
  }

  addExp(value: number) {
    this.exp += value;
    this.createTooltip('+100 XRPr');

    // (<MyScene>this.scene).gameService.exp
  }

  createTooltip(text: string) {
    const tooltip = this.scene.add.text(this.x, this.y - 50, `${text}`, {
      fontSize: 17,
      fontFamily: 'Connection',
      align: 'center',
    });
    tooltip.setOrigin(0.5, 1);
    tooltip.setStroke('#000', 5);
    tooltip.setDepth(this.y + 999);

    this.scene.tweens.add({
      targets: tooltip,
      y: tooltip.y - 100,
      duration: 5000,
      alpha: 0,
      ease: 'Quad.easeOut',
      scaleX: 2,
      scaleY: 2,
    });
    // tooltip.setAlpha(0);
  }

  update() {
    this.aura.x = this.x;
    this.aura.y = this.y;
  }
}
