import LayerData = Phaser.Tilemaps.LayerData;
import VJoystick from '../classes/VirutalJoystick.class';
import Tile = Phaser.Tilemaps.Tile;
import * as dat from 'dat.gui';
import {MyGame} from '../components/play-game/play-game.component';
import {MyScene} from '../classes/MyScene';
import * as Utils from './../utils/utils';
import {configDef, getCharacter} from '../constants/data';
import * as configs from '../constants/configs';
import {ConversationComponent} from '../components/conversation/conversation.component';
import {Character} from '../classes/Character.class';
import {Player} from '../classes/Player.class';

const SPEED = 180;
let splash;

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

  trolls: any[] = [];
  characters: Character[] = [];

  areas: any[] = [];
  disableSave = true;
  walkSound: Phaser.Sound.BaseSound;

  vj: VJoystick;

  shadowExploreData = [];

  preload(): void {
    splash = this.add.image(innerWidth / 2, innerHeight / 2, 'splash');
    if (innerHeight < splash.height) {
      splash.setScale(innerHeight / splash.height);
    }
    const preloadValue = this.add.text(innerWidth / 2, 50, `test`, {
      fontSize: 20,
      fontFamily: 'Connection',
      align: 'center',
      weight: 'bold'
    });
    preloadValue.setOrigin(0.5, 1);

    this.gameService = (<MyGame>this.sys.game).gameService;

    this.load.atlas(
      'characters',
      this.gameService.assetsService.getAsset('atlas/atlas.png'),
      this.gameService.assetsService.getAsset('atlas/atlas.json')
    );

    this.load.spritesheet('puff-anim', this.gameService.assetsService.getAsset('anims/puff.png'), {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet(
      'tiles',
      this.gameService.assetsService.getAsset('tilemap/tiles-extruded-big.png'),
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
    this.load.tilemapTiledJSON('map', this.gameService.assetsService.getAsset('tilemap/map.json'));
    this.load.scenePlugin(
      'AnimatedTiles',
      this.gameService.assetsService.getAsset('plugins/animTiles.js'),
      'animatedTiles',
      'animatedTiles'
    );
    this.load.audio('bg-music', this.gameService.assetsService.getAsset('sounds/bg-music.mp3'));
    this.load.audio('walk', this.gameService.assetsService.getAsset('sounds/walk.mp3'));
    this.load.audio('heal', this.gameService.assetsService.getAsset('sounds/healspell1.mp3'));
    this.load.spritesheet('player-atlas', this.gameService.assetsService.getAsset('hero-atlas.png'), {frameWidth: 32, frameHeight: 32});

    this.load.on('progress', (progress) => {
      preloadValue.setText(Math.round(100 * progress) + '%');
    });
  }

  create(): void {
    splash.destroy();

    this.events.on('resize', this.resize, this);
    this.animatedTiles = this['animatedTiles'];

    const music = this.sound.add('bg-music', configs.music);
    music.play();

    this.walkSound = this.sound.add('walk', configs.walkSound);
    this.walkSound.play();
    this.walkSound.pause();

    const map = this.make.tilemap({key: 'map'});
    this.map = map;

    const tiles = map.addTilesetImage('tiles', 'tiles', 32, 32, 1, 2);

    const layers = [];

    map.layers.forEach((l: LayerData, index) => {
      layers[index] = map.createDynamicLayer(index, tiles, 0, 0);

      if (l.name === 'shadow') {
        layers[index].setDepth(100000);
      }

      if (index === 7) {

        map.objects.forEach(objLayer => {
          if (objLayer.name === 'characters') {

            objLayer.objects.forEach((obj: any) => {

              const characterData = getCharacter(obj.properties.id);

              const character = new Character({
                scene: this,
                x: obj.x,
                y: obj.y,
                texture: 'characters',
                frame: Utils.getObjectImage(obj.gid, this.map.imageCollections),
                data: characterData
              });

              character.id = obj.properties.id;

              if (obj.flippedVertical) {
                character.setScale(-1, 1);
              }

              this.characters.push(character);


              // Debug code
              if ((<MyGame>this.sys.game).debug) {
                const g = this.add.graphics();
                const circle = new Phaser.Geom.Circle(character.x, character.y, character.interactionRadius);
                g.fillStyle(0xFFff00);
                g.alpha = 0.5;
                g.fillCircleShape(circle);
              }
              // End debug code

            });
          }
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

    this.player = new Player({
      scene: this,
      x: 140,
      y: 190,
      texture: 'player-atlas',
    });

    let pathLayer;

    layers.forEach((l: Phaser.Tilemaps.DynamicTilemapLayer, i) => {
      if (l.layer.name === 'path') {
        pathLayer = l;
        l.alpha = 0;
        this.physics.add.collider(this.player, l, null, null, null);
      }
    });

    map.setCollisionByExclusion([1], true, true, pathLayer);

    this.animatedTiles.init(map);

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.controls = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor('#1c1117');
    this.cameras.main.roundPixels = true;

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

      // if (savedData.trolls) {
      //   console.log(savedData.trolls)
      //   this.trolls.map(trollSprite => {
      //     let trollData = trolls.find(troll => troll.id == trollSprite.trollDataRef.id);
      //   });
      // }
    }

    if ((<MyGame>this.sys.game).debug) {
      const gui = new dat.GUI();
      gui.closed = true;
      gui.add(this, 'resetGame');
      gui.add(this.sound, 'mute');
      gui.add(this, 'saveData');
    }
  }

  public resetGame() {
    this.disableSave = true;
    localStorage.removeItem('savedData');
    location.reload();
  }

  public saveData() {
    const data = {
      player: {
        x: this.player.x,
        y: this.player.y
      },
      shadow: [...this.shadowExploreData],
      characters: this.characters
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

    const overlappingTilesShape = this.map.getTilesWithinShape(
      new Phaser.Geom.Circle(this.player.x, this.player.y, 50),
      {isNotEmpty: true}
    );
    overlappingTilesShape.forEach((tile: Phaser.Tilemaps.Tile) => {
      this.exploreShadowTile(tile);
    });

    this.areas.map(area => {

      if (!area.explored) {
        const point = new Phaser.Geom.Point(this.player.x, this.player.y);

        if (Phaser.Geom.Rectangle.ContainsPoint(area, point)) {
          const overlappingTiles = this.map.getTilesWithinWorldXY(area.x, area.y, area.width, area.height);
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

    if ((this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) && this.walkSound.isPaused) {
      this.walkSound.play();
    } else if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.walkSound.pause();
    }

    if (this.movementValues.x < 0 && this.player.lastAnim !== 'walk-left') {
      this.player.anims.play('walk-left');
      this.player.lastAnim = 'walk-left';
    } else if (this.player.body.velocity.x > 0 && this.player.lastAnim !== 'walk-right') {
      this.player.anims.play('walk-right');
      this.player.lastAnim = 'walk-right';
    }

    if (this.movementValues.x === 0 && this.movementValues.y === 0) {
      this.player.anims.play('idle');
      this.player.lastAnim = 'idle';
    } else {
      this.characters.forEach((character: Character) => {
        character.update();
      });
    }

    this.player.setDepth(this.player.y);
  }

  getCharacterObject(characterId) {
    return this.characters.find(character => character.id === characterId);
  }
}

