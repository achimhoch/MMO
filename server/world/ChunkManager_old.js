const Chunk = require("./Chunk");


class ChunkManager {
    constructor(mapData) {
        this.mapData = mapData;
        this.chunkSize = 32;
        this.chunks = {};
        this.buildChunks();
    }

    /*getChunk(cx, cy) {
        const key = `${cx},${cy}`;

        if (!this.chunks[key]) {
            this.chunks[key] = new Chunk(cx, cy);
        }

        return this.chunks[key];
    }*/

    buildChunks() {
        //console.log(this.mapData);
        const chunksX = Math.ceil(this.mapData.width / this.chunkSize);
        const chunksY = Math.ceil(this.mapData.height / this.chunkSize);

        for (let cy = 0; cy < chunksY; cy++) {
            for (let cx = 0; cx < chunksX; cx++) {
                const chunk = new Chunk(cx, cy);
                for (const layerName in this.mapData.layers) {
                    chunk.addLayer(layerName);
                    const layer = this.mapData.layers[layerName];
                    //console.log(layer);
                    const chunkTiles = [];
                    for (let y = 0; y < this.chunkSize; y++) {
                        const row = [];     
                        for (let x = 0; x < this.chunkSize; x++) {
                            const worldX = cx * this.chunkSize + x;
                            const worldY = cy * this.chunkSize + y;
                            const index = worldY * this.mapData.width + worldX;
                            //console.log(index);
                            row.push(layer.data[index] || 0);
                        }

                        chunkTiles.push(row);
                    }

                    chunk.layers[layerName].tiles = chunkTiles;
                }

                this.chunks[`${cx},${cy}`] = chunk;
            }
        }
    }

    getVisibleChunks(px, py, radius = 1) {
        const cx = Math.floor(px / this.chunkSize);
        const cy = Math.floor(py / this.chunkSize);

        const visible = [];

        for (let oy = -radius; oy <= radius; oy++) {
            for (let ox = -radius; ox <= radius; ox++) {
                const key = `${cx + ox},${cy + oy}`; 
                if (this.chunks[key]) {
                    visible.push(this.chunks[key]);
                }
            }
        }

        return visible;
    }
}

module.exports = ChunkManager;