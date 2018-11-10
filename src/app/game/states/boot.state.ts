
export default class Boot extends Phaser.State {
  public preload(): void {
  }

  public create(): void {

    this.game.state.start('preloader');
  }
}
