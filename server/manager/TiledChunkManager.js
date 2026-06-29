const fs = require("fs");
const path = require("path");
//const Test = "../../client/assets/maps/continents/grassland.json";

class TiledChunkManager {

    constructor(option = {}) {

        this.chunkSize = option.chunkSize || 16;
        this.seed = option.seed || 0
        this.map = null; 
        this.width = 0;
        this.height = 0;
        this.layers = [];
        //console.log(this.map);
        
    }

    load(file) {
        const json = fs.readFileSync(path.join(__dirname, "../../client/assets/maps/continents/grassland2.json"));
        this.map = JSON.parse(json);

        this.width = this.map.width;
        this.height = this.map.height;
        this.layers = {};
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

    extractLayers(chunkX, chunkY) {
        const result = {};
        for (const layer of this.layers) {
            if (layer.type !== "tilelayer") {
                continue;
            }

            result[layer.name] = this.extractLayer(layer.data, chunkX, chunkY);
        }
        return result;
    }

    extractLayer(data, chunkX, chunkY) {
       
        const tiles = [];
        const startX = chunkX * this.chunkSize;
        const startY = chunkY * this.chunkSize;

        for (let y = 0; y < this.chunkSize; y++) {
            for (let x = 0; x < this.chunkSize; x++) {
                const worldX = startX + x;
                const worldY = startY + y;

                if (worldX < 0 || worldY < 0 || worldX >= this.width || worldY >= this.height) {
                    tiles.push(0);
                    continue;
                }
                const index = worldY * this.width + worldX;
                tiles.push(data[index]);
            }
        }
        //console.log(tiles);
        return tiles;
    }

    getTile(layerName, x, y) {
        const layer = this.layers.find(l => l.name === layerName);
        if (!layer) {
            return 0;
        }

        if (x < 0 || y < 0 || x >= this.width || y >= this.height ) {
            return 0;
        }

        return layer.data[y * this.width + x];
    }

    setTile(layerName, x, y, gid) {
        const layer = this.layers.find(l => l.name === layerName);
        if (!layer) {
            return;
        }

        const index = y * this.width + x;
        layer.data[index] = gid;
    }

    rebuildChunk(chunkX, chunkY) {
        return this.loadChunk(chunkX, chunkY);
    }
}

module.exports = TiledChunkManager;