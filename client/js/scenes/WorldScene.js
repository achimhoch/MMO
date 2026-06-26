import NetworkManager from "../managers/NetworkManager.js";
import ChunkManager from "../managers/ChunkManager.js";
import EntityManager from "../managers/EntitiyManager.js";
import InputManager from "../managers/InputManager.js";
import PredictionManager from "../managers/PredictionManager.js";
import InterpolationManager from "../managers/InterpolationManager.js";


const socket = io();
const TILE_W = 64;
const TILE_H = 32;
const CHUNK_SIZE = 16;
const VIEW_DISTANCE = 1;
let myId;
let players = {};

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super("WorldScene");
    }

    create() {
        this.cameras.main.setZoom(1.5);
        this.inputmanager = new InputManager(this);
        this.predictionManager = new PredictionManager(this);
        this.interpolationManager = new InterpolationManager(this);
        this.entityManager = new EntityManager(this);
        this.chunkManager = new ChunkManager(this);
        this.network = new NetworkManager(this);
        this.network.connect();
        this.cursors = this.input.keyboard.createCursorKeys(); 
       
    }

    update() {

        /*const input = {
            left: this.cursors.left.isDown,
            right: this.cursors.right.isDown,
            up: this.cursors.up.isDown,
            down: this.cursors.down.isDown,
        };*/

        const input = this.inputmanager.createInput();

        this.network.sendInput({
            input
        });

        const localPlayer = this.entityManager.getPlayer(socket.id);
        if (localPlayer) {
            this.predictionManager.applyLocalInput(
                localPlayer,
                input
            )
        }

        this.entityManager.update();

        this.interpolationManager.update();
       
    }

}