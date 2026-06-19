import ChunkRenderer from "./ChunkRenderer.js";

export default class ChunkManager {

    constructor(scene){

        this.scene = scene;
        this.chunks = new Map();
        this.radius = 1;
    }

    key(x,y){
        return `${x}:${y}`;
    }

    addChunk(key, container) {
        this.chunks.set(key, container);
    }

    removeChunks(key) {
        const chunk = this.chunks.get(key);

        if (chunk) {
            chunk.destroy(true);
            this.chunks.delete(key);
        }
    }

    loadChunk(chunk){

        const key = this.key(chunk.x, chunk.y);
        if(this.chunks.has(key)){
            return;
        }
        const container = ChunkRenderer.render(this.scene, chunk);
        this.chunks.set(key, container);
    }

    unloadFarChunks(currentChunkX, currentChunkY, radius = 1) {

        for (const [key, chunk] of this.chunks) {

            const [x, y] = key.split(":").map(Number);

            if (Math.abs(x - currentChunkX) <= radius && Math.abs(y - currentChunkY) <= radius) {
                continue;
            }

            chunk.destroy(true);

            this.chunks.delete(key);
        }
    }

    unloadChunk(x,y){

        const key = this.key(x,y);
        const container = this.chunks.get(key);
        if(!container) return;
        container.destroy(true);
        this.chunks.delete(key);
    }

    update(playerChunkX, playerChunkY){

        const needed = new Set();

        for(let y = playerChunkY - this.radius; y <= playerChunkY + this.radius; y++){
            for(let x = playerChunkX - this.radius; x <= playerChunkX + this.radius; x++){

                const key = this.key(x,y);
                needed.add(key);

                if(!this.loadedChunks.has(key)){

                    socket.emit("requestChunk", {chunkX:x, chunkY:y});
                }
            }
        }

        for(
            const key of this.loadedChunks.keys()){

            if(!needed.has(key)){

                this.unloadChunk(key);
            }
        }
    }

    
}