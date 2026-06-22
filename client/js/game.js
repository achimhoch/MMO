//import Phaser from 'phaser';
import BootScene from "./scenes/BootScene.js";
import WorldScene from "./scenes/WorldScene.js";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#222",
    scene: [
        BootScene,
        WorldScene
    ]
};

const game = new Phaser.Game(config);
