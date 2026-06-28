const Chunk = require("../manager/Chunk");
//const TiledImporter = require("./TiledImporter");
//const test = require("../../client/assets/maps/continents/grassland.json")

class ChunkManager {

    constructor(tiledChunkManager) {
        this.generator = tiledChunkManager; 
        this.chunks = new Map();
        //this.chunkSize = 16;
        //this.importer = new TiledImporter("../../client/assets/maps/continents/grassland.json");
    }

    getKey(chunkX, chunkY){
        return `${chunkX}:${chunkY}`;
    }

    

    getChunk(chunkX, chunkY){
        const key = this.getKey(chunkX, chunkY);
        let chunk = this.chunks.get(key);
        if(chunk){
           return chunk;
        }
        
        const data = this.generator.loadChunk(chunkX, chunkY);
        chunk = new Chunk(chunkX, chunkY, data.layers);
        this.chunks.set(key, chunk);
        return chunk
    }

    getChunkData(chunkX, chunkY){
        //console.log(this.getChunk(chunkX, chunkY).getData());
        return this.getChunk(chunkX, chunkY).getData();
    }

    addReference(chunkX, chunkY){
        const chunk = this.getChunk(chunkX, chunkY);
        chunk.referenceCount++;
    }

    removeReference(chunkX, chunkY){
        const key = this.key(chunkX, chunkY);
        const chunk = this.chunks.get(key);
        if (!chunk) {
            return;
        }
        chunk.referenceCount--;
        if (chunk.referenceCount > 0){
            return;
        }

        this.chunks.delete(key);
    }

    setTile(layer, worldTileX, worldTileY, gid){
        this.generator.setTile(layer, worldTileX, worldTileY, gid);
        const chunkX = Math.floor(worldTileX / this.generator.chunkSize);
        const chunkY = Math.floor(worldTileY / this.generator.chunkSize);
        const chunk = this.getChunk(chunkX, chunkY);
        chunk.layers = this.generator.rebuildChunk(chunkX, chunkY).layers;
        chunk.markDirty();
    }

    getTile(layer, worldTileX, worldTileY) {
        return this.generator.getTile(layer, worldTileX, worldTileY);
    }

    getDirtyChunks(){
        const dirtyChunks = [];
        for(const chunk of this.chunks.values()){
            if (!chunk.dirty){
                continue;
            }

            dirtyChunks.push(chunk);
        }
        return dirtyChunks;
    }

    

    getLoadedChunks() {
        return this.chunks;
    }

    getStats() {
        let reference = 0;
        for (const chunk of this.chunks.values()) {
            reference += chunk.refCount;
        }

        return {
            loadedChunk: this.chunks.size,
            reference
        }
    }

    
}

module.exports = ChunkManager;