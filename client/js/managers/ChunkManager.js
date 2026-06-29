import ChunkRenderer from "../rendering/ChunkRenderer.js";

export default class ChunkManager {

    constructor(scene){

        this.scene = scene;
        this.renderer = new ChunkRenderer(scene); 
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
        //console.log(container);
        this.chunks.set(key, container);
        //console.log(this.chunks);
    }

    unloadChunk(x, y) {
        const key = this.key(x, y);
        const container = this.chunks.get(key);
        if(!container) {
            return;
        }

        container.destroy(true);
        const chunk = this.chunks.get(key);
        this.chunks.delete(key);
    }

    updateChunk(diff) {
        this.unloadChunk(diff);
        this.loadChunk(diff);
    }

    

    
}