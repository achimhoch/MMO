export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
       this.load.spritesheet("tiles", "assets/tiles/grassland.png", { frameWidth: 64, frameHeight: 64 }); 
       this.load.image("player", "assets/images/ball.png");
    }

    create() {
        this.scene.start("WorldScene");
    }
}