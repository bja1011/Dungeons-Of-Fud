export default class Title extends Phaser.State {

  public create(): void {

    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.pageAlignVertically = true;

    const sprite = this.game.add.sprite(0, 0, 'building');
    sprite.anchor.setTo(0, 0);

    const bmd = this.game.add.bitmapData(sprite.width, sprite.height);
    bmd.draw(this.game.make.sprite(0, 0, 'building'));
    bmd.update();

    for (let y = 0; y < bmd.height; y++)
      for (let x = 0; x < bmd.width; x++) {
        const pix = bmd.getPixel(x, y);
        // console.log(x,y)
      }


    bmd.addToWorld(sprite.width + 10, 0);

    // this.game.camera.flash(0x000000, 1000);
  }
}

