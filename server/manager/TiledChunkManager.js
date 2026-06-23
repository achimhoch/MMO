const fs = require("fs");
//const Test = require("../../client/assets/maps/continents/grassland.json");

class TiledChunkManager {

    constructor() {

        this.chunkSize = 16;
        this.map = JSON.parse(fs.readFileSync("../../client/assets/maps/continents/grassland2.json"));
        this.width = this.map.width;
        this.height = this.map.height;
        this.layers = {};

        for (const layer of this.layers) {
            this.layers[layer.name] = layer.data
        }
    }

    loadChunk(chunkX, chunkY) {

        return {
            x: chunkX,
            y: chunkY,
            layers: {
                ground: this.extractLayer("Ground", chunkX, chunkY),
                objects: this.extractLayer("Objects", chunkX, chunkY),
                collision: this.extractLayer("Collision", chunkX, chunkY)
            }
        };
    }

    extractLayer(layerName, chunkX, chunkY) {
        const layer = this.layers[layerName];
        if (!layer) {
            return [];
        }
        const tiles = [];
        const startX = chunkX * this.chunkSize;
        const startY = chunkY * this.chunkSize;

        for (let y = 0; y < this.chunkSize; y++) {
            for (x = 0; x < this.chunkSize; x++) {
                const worldX = startX + x;
                const worldY = startY + y;

                if (worldX < 0 || worldY < 0 || worldX >= this.width || worldY >= this.height) {
                    tiles.push(0);
                    continue;
                }
                const index = worldY * this.width + worldX;
                tiles.push(layer[index]);
            }
        }

        return tiles;
    }
}

module.exports = TiledChunkManager;