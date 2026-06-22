const fs = require("fs");
//const Test = require("../../client/assets/maps/continents/grassland.json");

class TiledChunkManager {

    constructor() {

        this.map = JSON.parse(fs.readFileSync("../../client/assets/maps/continents/grassland.json"));
    }

    loadChunk(chunkX, chunkY) {

        return {
            x: chunkX,
            y: chunkY,
            layers: {
                ground: [],
                objects: [],
                collision: []
            }
        };
    }
}

module.exports = TiledChunkManager;