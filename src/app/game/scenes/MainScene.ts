import LayerData = Phaser.Tilemaps.LayerData;
import VJoystick from '../classes/VirutalJoystick.class';
import Tile = Phaser.Tilemaps.Tile;
import * as dat from 'dat.gui';
import {MyGame} from '../components/play-game/play-game.component';
import {MyScene} from '../classes/MyScene';
import * as Utils from './../utils/utils';
import {utils} from 'protractor';
import {Troll} from '../classes/Troll.class';

const SPEED = 90;

export class MainScene extends MyScene {

  constructor() {
    super({
      key: 'MainScene'
    });
  }

  controls;
  player;
  map;
  animatedTiles: any;
  movementValues = {x: 0, y: 0};

  charactersLayer;

  trolls: any[] = [];

  areas: any[] = [];
  disableSave = true;
  walkSound: Phaser.Sound.BaseSound;

  vj: VJoystick;

  shadowExploreData = [];

  preload(): void {


    let preloadValue = this.add.text(100, 100, `test`, {
      fontSize: 20,
      fontFamily: 'Connection',
      align: 'center',
      weight: 'bold'
    });

    this.gameService = (<MyGame>this.sys.game).gameService;

    this.load.atlas('characters', this.gameService.assetsService.getAsset('atlas/atlas.png'), this.gameService.assetsService.getAsset('atlas/atlas.json'));
    this.load.spritesheet('tiles', this.gameService.assetsService.getAsset('tilemap/tiles-extruded-big.png'), {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2
    });
    this.load.tilemapTiledJSON('map', this.gameService.assetsService.getAsset('tilemap/map.json'));
    this.load.scenePlugin(
      'AnimatedTiles',
      this.gameService.assetsService.getAsset('plugins/animTiles.js'),
      'animatedTiles',
      'animatedTiles'
    );
    this.load.audio('bg-music', this.gameService.assetsService.getAsset('sounds/bg-music.mp3'));
    this.load.audio('walk', this.gameService.assetsService.getAsset('sounds/walk.mp3'));
    this.load.spritesheet('player-atlas', this.gameService.assetsService.getAsset('hero-atlas.png'), {frameWidth: 32, frameHeight: 32});

    this.load.on('progress', (progress) => {
      preloadValue.setText(100 * progress + '%');
    });
    //
    // let totalFiles = this.load.totalToLoad;
    // this.load.loadEvent(function () {
    //   preloadValue.setText(Math.round(this.load.totalComplete / totalFiles * 100) + ' %');
    // }, this);
  }

  create(): void {

    this.events.on('resize', this.resize, this);
    this.animatedTiles = this['animatedTiles'];

    const music = this.sound.add('bg-music', {
      mute: true,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    });
    music.play();

    this.walkSound = this.sound.add('walk', {
      volume: 0.1,
      rate: 1,
      loop: true
    });
    this.walkSound.play();
    this.walkSound.pause();

    let map = this.make.tilemap({key: 'map'});
    this.map = map;
    console.log(this);

    let tiles = map.addTilesetImage('tiles', 'tiles', 32, 32, 1, 2);

    let layers = [];
    let characterObjects;

    map.layers.forEach((l: LayerData, index) => {
      layers[index] = map.createDynamicLayer(index, tiles, 0, 0);

      console.log(l.name === 'characters');
      {
        this.charactersLayer = layers[index];
        console.log(this.charactersLayer);
      }

      if (l.name === 'shadow') {
        layers[index].setDepth(100000);
      }

      if (index == 7) {

        map.objects.forEach(objLayer => {
          if (objLayer.name == 'characters') objLayer.objects.forEach((obj: any) => {

            // let troll = new Troll(this, obj.x, obj.y, 'characters', Utils.getObjectImage(obj.gid, this.map.imageCollections));
            const troll = this.add.sprite(obj.x, obj.y, 'characters', Utils.getObjectImage(obj.gid, this.map.imageCollections));
            troll.setOrigin(0.5, 1);
            troll.setDepth(troll.y);
            (<any>troll).interactionRadius = 30;

            if ((<MyGame>this.sys.game).debug) {
              const g = this.add.graphics();
              const circle = new Phaser.Geom.Circle(troll.x, troll.y, (<any>troll).interactionRadius);
              g.fillStyle(0xFFff00);
              g.alpha = 0.5;
              g.fillCircleShape(circle);
            }

            this.trolls.push(troll);
            // let name = obj.name;
            //
            // if (obj.properties && obj.properties.name) {
            //   name = obj.properties.name;
            // }
            //
            // if (obj.properties && obj.properties.type) {
            //   name += ' \n ' + obj.properties.type;
            // }
            // let t = this.add.text(character[0].x, character[0].y - 45, `${name}`, {
            //   fontSize: 20,
            //   fontFamily: 'Connection',
            //   align: 'center',
            //   weight: 'bold'
            // });
            // t.setOrigin(0.5, 1);
            // t.setStroke('#000', 5);
            // // t.setScale(0.5);
          });
        });
      }
    });

    map.objects.forEach(objLayer => {
      objLayer.objects.forEach((obj: any) => {
        if (objLayer.name === 'areas') {
          this.areas.push(new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height));
        }
      });
    });


    this.player = this.physics.add.sprite(240, 90, 'player-atlas');
    this.player.setSize(5, 3);
    this.player.setOrigin(0.5, 1);

    const configDef = {
      frameRate: 9,
      repeat: -1
    };

    const animWalkDownCfg = {
      ...configDef,
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player-atlas', {start: 0, end: 5}),
    };

    const animWalkLeftCfg = {
      ...configDef,
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player-atlas', {start: 6, end: 11}),
    };

    const animWalkRightCfg = {
      ...configDef,
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player-atlas', {start: 12, end: 17}),
    };

    const animWalkUpCfg = {
      ...configDef,
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player-atlas', {start: 18, end: 23}),
    };


    const idleWalkUpCfg = {
      ...configDef,
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player-atlas', {start: 0, end: 0}),
    };


    this.anims.create(animWalkDownCfg);
    this.anims.create(animWalkLeftCfg);
    this.anims.create(animWalkUpCfg);
    this.anims.create(animWalkRightCfg);
    this.anims.create(idleWalkUpCfg);


    let pathLayer;

    layers.forEach((l: Phaser.Tilemaps.DynamicTilemapLayer, i) => {
      if (l.layer.name == 'path') {
        pathLayer = l;
        l.alpha = 0;
        this.physics.add.collider(this.player, l, null, null, null);
      }
    });

    map.setCollisionByExclusion([1], true, true, pathLayer);

    this.animatedTiles.init(map);

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    // this.cameras.main.setZoom(0.5);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.controls = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor('#1c1117');
    this.cameras.main.roundPixels = false;

    this.vj = new VJoystick({
      scene: this,
      options: {
        lineStyle: {width: 3, color: 0xaaaaaa, alpha: 0.4},
        x: 0,
        y: 0,
      }
    });
    this.vj.setScrollFactor(0);


    this.input.on('pointerdown', (pointer) => {
      this.vj.show(pointer.downX, pointer.downY);
    });

    this.input.on('pointerup', (pointer) => {
      this.vj.hide();
      this.movementValues = {x: 0, y: 0};
    });

    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown && this.vj.isOn) {
        this.movementValues = this.vj.calculate(pointer.position.x, pointer.position.y);
      }
    });

    // Restore state from saved data
    const savedData = JSON.parse(localStorage.getItem('savedData'));
    if (savedData) {
      this.player.x = savedData.player.x;
      this.player.y = savedData.player.y;
      this.cameras.main.scrollX = this.player.x - innerWidth / 2;
      this.cameras.main.scrollY = this.player.y - innerHeight / 2;

      this.shadowExploreData = savedData.shadow;
      if (this.shadowExploreData) {
        this.shadowExploreData.forEach((y, yi) => {
          y && y.map((x, xi) => {
            const tile = this.map.getTileAt(yi, xi);
            if (tile) {
              tile.setVisible(false);
            }
          });
        });
      }
    }

    const gui = new dat.GUI();
    gui.closed = true;
    gui.add(this, 'resetGame');
    gui.add(this.sound, 'mute');
    gui.add(this, 'saveData');
  }

  resetGame() {
    this.disableSave = true;
    localStorage.removeItem('savedData');
    location.reload();
  }


  saveData() {
    let data = {
      player: {
        x: this.player.x,
        y: this.player.y
      },
      shadow: [...this.shadowExploreData]
    };

    localStorage.setItem('savedData', JSON.stringify(data));
  }

  exploreShadowTile(tile: Tile) {

    if (!this.shadowExploreData[tile.x]) {
      this.shadowExploreData[tile.x] = [];
    }
    this.shadowExploreData[tile.x][tile.y] = true;

    this.tweens.add({
      targets: tile,
      alpha: 0,
      ease: 'Power1',
      duration: 600,
    });

    setTimeout(() => {
      tile.setVisible(false);
    }, 620);
  }

  update(time, delta) {
    this.player.body.setVelocityX(0);
    this.player.body.setVelocityY(0);

    let pointer = this.input.activePointer;

    // let overlappingTiles = this.map.getTilesWithinShape(this.areas[0]);

    // let overlappingTiles = this.map.getTilesWithinWorldXY(this.player.x - 20, this.player.y - 20, 40, 40);
    let overlappingTiles = this.map.getTilesWithinShape(new Phaser.Geom.Circle(this.player.x, this.player.y, 50), {isNotEmpty: true});
    overlappingTiles.forEach((tile: Phaser.Tilemaps.Tile) => {

      this.exploreShadowTile(tile);
    });

    this.areas.map(area => {
      if (!area.explored) {
        let point = new Phaser.Geom.Point(this.player.x, this.player.y);
        if (Phaser.Geom.Rectangle.ContainsPoint(area, point)) {
          let overlappingTiles = this.map.getTilesWithinWorldXY(area.x, area.y, area.width, area.height);
          overlappingTiles.forEach((tile: Phaser.Tilemaps.Tile) => {
            area.explored = true;

            this.exploreShadowTile(tile);

          });
        }
      }
    });


    if (!this.vj.isOn) {
      this.movementValues = {x: 0, y: 0};
    }

    if (this.controls.left.isDown) {
      this.movementValues = {
        ...this.movementValues,
        x: -1
      };
    }

    if (this.controls.right.isDown) {
      this.movementValues = {
        ...this.movementValues,
        x: 1
      };
    }

    if (this.controls.up.isDown) {
      this.movementValues = {
        ...this.movementValues,
        y: -1
      };
    }

    if (this.controls.down.isDown) {
      this.movementValues = {
        ...this.movementValues,
        y: 1
      };
    }

    if (this.player.stopped) {
      this.movementValues = {x: 0, y: 0};
    }

    if (this.movementValues.x) {
      this.player.body.setVelocityX(this.movementValues.x * SPEED);
    }
    if (this.movementValues.y) {
      this.player.body.setVelocityY(this.movementValues.y * SPEED);
    }

    if ((this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) && this.walkSound.isPaused) {
      this.walkSound.play();
    } else if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
      this.walkSound.pause();
    }

    if (this.movementValues.x < 0 && this.player.lastAnim != 'walk-left') {
      this.player.anims.play('walk-left');
      this.player.lastAnim = 'walk-left';
    } else if (this.player.body.velocity.x > 0 && this.player.lastAnim != 'walk-right') {
      this.player.anims.play('walk-right');
      this.player.lastAnim = 'walk-right';
    }

    //
    // if (this.movementValues.y < 0 && this.player.lastAnim != 'walk-up') {
    //   this.player.anims.play('walk-up');
    //   this.player.lastAnim = 'walk-up'
    // } else if (this.player.body.velocity.y > 0 && this.player.lastAnim != 'walk-down') {
    //   this.player.anims.play('walk-down');
    //   this.player.lastAnim = 'walk-down'
    // }

    if (this.movementValues.x === 0 && this.movementValues.y === 0) {
      this.player.anims.play('idle');
      this.player.lastAnim = 'idle';
    } else {
      this.trolls.forEach(troll => {

        if (!troll.talk && Phaser.Math.Distance.Between(this.player.x, this.player.y, troll.x, troll.y) <= (<any>troll).interactionRadius) {

          troll.talk = true;
          this.vj.hide();
          const dialogRef = this.gameService.dialogService.open();
          this.player.stopped = true;

          dialogRef.afterClosed().subscribe(result => {
            this.player.stopped = false;
          });
        }

        if (troll.talk && Phaser.Math.Distance.Between(this.player.x, this.player.y, troll.x, troll.y) > (<any>troll).interactionRadius) {
          troll.talk = false;
        }

      });
    }

    this.player.setDepth(this.player.y);

  }

}

