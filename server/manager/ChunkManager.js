const Chunk = require("../manager/Chunk");
const TiledImporter = require("./TiledImporter");
//const test = require("../../client/assets/maps/continents/grassland.json")

class ChunkManager {

    constructor(){
        this.chunks = new Map();
        this.chunkSize = 16;
        this.importer = new TiledImporter("../../client/assets/maps/continents/grassland.json");
    }

    key(x, y){
        return `${x}:${y}`;
    }

    getChunk(x,y){
        const key = this.key(x, y);
        if(!this.chunks.has(key)){
            const tiles = this.importer.getChunk(x, y, this.chunkSize);
            this.chunks.set( key, new Chunk(x, y, tiles));
        }

        return this.chunks.get(key);
    }
}

module.exports =
    ChunkManager;