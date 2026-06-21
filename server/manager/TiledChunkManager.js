const fs = require("fs");

class TiledChunkManager {

    constructor() {

        this.map =JSON.parse(fs.readFileSync("../../client/assets/maps/continents/grassland.json", "utf8"));
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