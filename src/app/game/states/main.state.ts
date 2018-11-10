export default class Title extends Phaser.State {

  public create(): void {

    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.pageAlignVertically = true;

    const sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'building');
    sprite.anchor.setTo(1, 0.5);

    const bmd = this.game.add.bitmapData(sprite.width, sprite.height);
    bmd.addToWorld(this.game.world.centerX, this.game.world.centerY);
    bmd.draw(this.game.make.sprite(0, 0, 'building'));

    for (let y = 0; y < bmd.height; y++)
      for (let x = 0; x < bmd.width; x++) {
        const pix = bmd.getPixel(x, y);
        // console.log(x,y)
        pix.a && console.log(pix);
      }


    // this.game.camera.flash(0x000000, 1000);
  }
}
