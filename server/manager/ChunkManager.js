const Chunk = require("../manager/Chunk");
//const TiledImporter = require("./TiledImporter");
//const test = require("../../client/assets/maps/continents/grassland.json")

class ChunkManager {

    constructor(tiledChunkManager) {
        this.tiledChunkManager = tiledChunkManager;
        this.chunks = new Map();
        //this.chunkSize = 16;
        //this.importer = new TiledImporter("../../client/assets/maps/continents/grassland.json");
    }

    key(chunkX, chunkY){
        return `${chunkX}:${chunkY}`;
    }

    hasChunk(chunkX, chunkY){
        return this.chunks.has(this.key(chunkX, chunkY));
    }

    getChunk(chunkX, chunkY){
        const key = this.key(chunkX, chunkY);
        if(!this.chunks.has(key)){
            const chunk = this.createChunk(chunkX, chunkY);
            this.chunks.set( key, chunk);
        }

        return this.chunks.get(key);
    }

    createChunk(chunkX, chunkY){
        const chunk = new Chunk(chunkX, chunkY); 
        const tiledChunk = this.tiledChunkManager.loadChunk(chunkX, chunkY);
        chunk.layers.ground = tiledChunk.layers.ground;
        chunk.layers.object = tiledChunk.layers.object;
        chunk.layers.collision = tiledChunk.layers.collision;
        return chunk;
    }

    unloadChunk(chunkX, chunkY){
        const key = this.key(chunkX, chunkY);
        this.chunks.delete(key);
    }

    setTile(chunkX, chunkY, layer, index, value){
        const chunk = this.getChunk(chunkX, chunkY);
        chunk.layers[layer][index] = value;
        chunk.markDirty();
    }

    getTile(chunkX, chunkY, layerName, tileIndex){
        const chunk = this.getChunk(chunkX, chunkY);
        return chunk.layers[layer][tileIndex];
    }

    getDirtyChunks(){
        const dirtyChunks = [];
        for(const chunk of this.chunks.values()){
            if (chunk.dirty){
                dirty.push(chunk);
            }
        }
        return dirtyChunks;
    }

    clearDirtyChunks(chunkX, chunkY){
        for(const chunk of this.chunks.values()){
            chunk.clearDirty();
        }
    }

    getChunkData(chunkX, chunkY){
        return this.getChunk(chunkX, chunkY).getData();
    }

    getVisibleChunks(centerChunkX, centerChunkY, radius) {
        const visible = [];   
        for (let cy = centerChunkX - radius; cy <= centerChunkX + radius; cy++) { 
            for (let cx = centerChunkY - radius; cx <= centerChunkY + radius; cx++) {
                visible.push(this.getChunk(cx, cy));   
            }   
        }
        return visible;
    }

    getLoadedChunkKeys() {
        return Array.from(this.chunks.keys());
    }

    addReference(chunkX, chunkY){
        const chunk = this.getChunk(chunkX, chunkY);
        chunk.addReference();
    }

    removeReference(chunkX, chunkY){
        const key = this.key(chunkX, chunkY);
        if (this.chunks.has(key)){
            return;        
        }
        const chunk = this.chunks.get(key);
        chunk.removeReference();
        if (!chunk.hasReferences()){
            this.chunks.delete(key);
        }
    }

    chunkKey(x, y){
        return `${x}:${y}`;
    }
}

module.exports = ChunkManager;