export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
       this.load.spritesheet("tiles", "assets/tiles/grassland.png", { frameWidth: 64, frameHeight: 64 }); 
    }

    create() {
        this.scene.start("WorldScene");
    }
}