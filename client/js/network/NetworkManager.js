export default class NetworkManager {

    constructor(scene) {

        this.scene = scene;
        this.socket = io();
        this.playerId = null;
    }

    connect() {

        this.socket.on("init", (data) => {
            this.playerId = data.id;
            this.scene.entityManager.spawnPlayer(data); 
        });

        /*this.socket.on("playerMove", (data) => {
            this.scene.entityManager.updatePlayer(data);
        });*/

        this.socket.on("chunkData", (chunk) => {
            this.scene.chunkManager.loadChunk(chunk);
        });

        this.socket.on("playerLeft", (id) => {
            this.scene.entityManager.removePlayer(id);
        });
        this.socket.on("aoiChanged", (data) => {
                console.log("AOI geändert:", data);
            }
        );

        this.socket.on("worldSnapshot", (snapshot) => {
            snapshot.forEach((entity) => {
                this.scene.entityManager.updatePlayer(entity);
            });
        });
        
        

    }

    sendInput(input){

        this.socket.emit("input", input);
    }
}