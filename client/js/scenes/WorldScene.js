import NetworkManager from "../managers/NetworkManager.js";
import ChunkManager from "../managers/ChunkManager.js";
import EntityManager from "../managers/EntitiyManager.js";
import ClientSystemManager from "../core/ClientSystemManager.js";
import ClientContext from "../core/ClientContext.js";
import Inputsystem from "../systems/InputSystem.js";
import CameraSystem from "../systems/CameraSystem.js";
import NetworkSystem from "../systems/NetworkSystem.js";
import PredictionSystem from "../systems/PredictionSystem.js";
import ReconciliationSystem from "../systems/ReconciliationSystem.js";
import RenderSystem from "../systems/RenderSystem.js";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super("WorldScene");
    }

    create() {
       this.context = new ClientContext(this);
       this.context.entityManager = new EntityManager(this);
       this.context.chunkManager = new ChunkManager(this);
       this.context.network = new NetworkManager(this.context);
       this.systemManager = new ClientSystemManager(); 
       
       this.systemManager.add(new Inputsystem(), 100);
       this.systemManager.add(new PredictionSystem(), 200);
       this.systemManager.add(new NetworkSystem(), 300);
       this.systemManager.add(new ReconciliationSystem(), 400);
       this.systemManager.add(new RenderSystem(), 500);
    }

    update() {
        this.systemManager.update(this.context);
    }

}