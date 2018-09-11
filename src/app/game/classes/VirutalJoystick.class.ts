import Graphics = Phaser.GameObjects.Graphics;

export default class VJoystick extends Phaser.GameObjects.Graphics {

  isOn: boolean;
  lineGraphic: Graphics;

  constructor(params: IVJoystick) {
    super(params.scene, params.options);
    this.scene.add.existing(this);
    this.setScrollFactor(0);

    this.strokeCircleShape(new Phaser.Geom.Circle(0, 0, 50));
    this.lineGraphic = this.scene.add.graphics();
    this.lineGraphic.setScrollFactor(0);
    this.setDepth(1000000);
    this.hide();
  }

  show(x: number, y: number) {
    this.isOn = true;
    this.visible = true;
    this.x = x;
    this.y = y;
  }

  calculate(x: number, y: number) {

    const vector = {
      x: x - this.x,
      y: y - this.y
    };

    const vectorLen = Phaser.Math.Distance.Between(this.x, this.y, x, y);
    const vectorLen2 = Phaser.Math.Clamp(Phaser.Math.Distance.Between(this.x, this.y, x, y), 0, 20);

    const result = {
      x: vector.x / vectorLen,
      y: vector.y / vectorLen
    };

    this.lineGraphic.clear();

    const circle = new Phaser.Geom.Circle(this.x + result.x * vectorLen2, this.y + result.y * vectorLen2, 30);
    this.lineGraphic.fillStyle(0xaaaaaa);
    this.lineGraphic.alpha = 0.5;
    this.lineGraphic.fillCircleShape(circle);
    this.lineGraphic.setDepth(1000000);


    return result;
  }

  hide() {
    this.isOn = false;
    this.lineGraphic.clear();
    this.visible = false;
  }

}

export interface IVJoystick {
  scene: Phaser.Scene;
  options;
}
