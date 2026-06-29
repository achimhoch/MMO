export default class ClientContext {

    constructor(scene) {

        this.scene = scene;

        this.socket = null;

        this.entityManager = null;

        this.chunkManager = null;

        this.cameraManager = null;

        this.tick = 0;
    }

}