
export default class NetworkManager {

    constructor(scene) {

        this.scene = scene;
        this.socket = io();
        this.playerId = null;
    }

    connect() {

        this.socket.on("init", (data) => {
            //console.log(data);
            this.playerId = data.id;
                //this.scene.entityManager.spawnPlayer(data); 
        });

        this.socket.on("chunkLoad", (chunk) => {
        console.log(chunk);
            this.scene.chunkManager.loadChunk(chunk);
        });

        this.socket.on("chunkUnload", (chunk) => {
            this.scene.chunkManager.unloadChunk(chunk.x, chunk.y);
        });

        this.socket.on("chunkDiff", (chunk) => {
            this.scene.chunkManager.updateChunk(chunk);
        });
        
       /*this.socket.on("aoiChanged", (data) => {
                console.log("AOI geändert:", data);
            }
        );*/

        this.socket.on("entityDelta", (delta) => {
            //console.log(delta);
           delta.added.forEach((entity) => {
                this.scene.entityManager.spawnPlayer(entity);
           });

           delta.updated.forEach((entity) => {
                this.scene.entityManager.updatePlayer(entity);
           });

           delta.removed.forEach((id) => {
                this.scene.entityManager.removePlayer(id)
           });
            
        });
        
        

    }

    sendInput(input){

        this.socket.emit("input", input); 
    }
}