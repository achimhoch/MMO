import NetworkManager from "../network/NetworkManager.js";
import ChunkManager from "../rendering/ChunkManager.js";
import EntityManager from "../entity/EntitiyManager.js";


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
        this.chunkManager = new ChunkManager(this);
        this.entityManager = new EntityManager(this);
        this.network = new NetworkManager(this);
        this.network.connect();
        this.cursors = this.input.keyboard.createCursorKeys(); 
        this.cameras.main.setZoom(1.5);
        this.currentChunkX = 0;
        this.currentChunkY = 0;
    }

    update() {

        if(!this.network.playerId){
            return;
        }

        const input = {

            left: this.cursors.left.isDown,
            right: this.cursors.right.isDown,
            up: this.cursors.up.isDown,
            down: this.cursors.down.isDown
        };
        this.network.sendInput(input);
        const player = this.entityManager.getPlayer(this.network.playerId);
        if (!player){ return; }
        this.cameras.main.centerOn(player.x, player.y);

           


    }

}