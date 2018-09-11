import 'phaser';
import {MyGameObject, MyGameObjectConfig} from './MyGameObject.class';
import {configDef} from '../constants/data';

export class Player extends MyGameObject {

  name: string;
  type: string;
  level: number;
  data: any;

  constructor(params: MyGameObjectConfig) {
    super(params);
    params.scene.physics.add.existing(this);

    this.setSize(5, 3);
    this.setOrigin(0.5, 1);

    this.createAnims();
  }

  createAnims() {
    const animWalkDownCfg = {
      ...configDef,
      key: 'walk-down',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {start: 0, end: 5}),
    };

    const animWalkLeftCfg = {
      ...configDef,
      key: 'walk-left',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {start: 6, end: 11}),
    };

    const animWalkRightCfg = {
      ...configDef,
      key: 'walk-right',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {start: 12, end: 17}),
    };

    const animWalkUpCfg = {
      ...configDef,
      key: 'walk-up',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {start: 18, end: 23}),
    };

    const idleWalkUpCfg = {
      ...configDef,
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('player-atlas', {start: 0, end: 0}),
    };

    this.scene.anims.create(animWalkDownCfg);
    this.scene.anims.create(animWalkLeftCfg);
    this.scene.anims.create(animWalkUpCfg);
    this.scene.anims.create(animWalkRightCfg);
    this.scene.anims.create(idleWalkUpCfg);
  }
}

