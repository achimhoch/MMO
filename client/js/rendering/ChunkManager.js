import ChunkRenderer from "./ChunkRenderer.js";

export default class ChunkManager {

    constructor(scene){

        this.scene = scene;
        this.renderer = new ChunkManager(scene); 
        this.chunks = new Map();
        this.radius = 1;
    }

    key(x, y){
        return `${x}:${y}`;
    }

    loadChunk(chunk) {
        const key = this.key(chunk.x, chunk.y);
        if (this.chunks.has(key)) {
            return;
        }
        const container = this.renderer.renderChunk(chunk);
        this.chunks.set(key, container);
    }

    unloadChunks(x, y) {
        const key = this.key(x, y);
        const container = this.chunks.get(key);
        if(!container) {
            return;
        }

        container.destroy(true);
        const chunk = this.chunks.get(key);
        this.chunks.delete(key);
    }

    updateChunk(chunk) {
        this.unloadChunk(chunk.x, chunk.y);
        this.loadChunk(chunk);
    }

    

    
}