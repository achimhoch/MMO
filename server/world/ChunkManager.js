const Chunk = require("./Chunk");

class ChunkManager {
    constructor(mapData) {
        this.mapData = mapData;
        this.chunkSize = 16;
        this.chunks = {};
        this.build();
    }

    build() {
        const chunksX = Math.ceil(this.mapData.width / this.chunkSize);
        const chunksY = Math.ceil(this.mapData.height / this.chunkSize);
        for (let cy = 0; cy < chunksY; cy++) {
            for (let cx = 0; cx < chunksX; cx++) {
                const chunk = new Chunk(cx, cy);
                for (const layerName in this.mapData.layers) {
                    const layerData = this.mapData.layers[layerName];
                    chunk.layers[layerName] = [];
                    for (let y = 0; y < this.chunkSize; y++) {
                        const row = [];
                        for (let x = 0; x < this.chunkSize; x++) {
                            const wx = cx * this.chunkSize + x;
                            const wy = cy + this.chunkSize + y;
                            const index = wy * this.mapData.width + wx;
                            row.push(layerData[index] || 0);
                        }
                        chunk.layers[layerName].push(row);
                    }
                }
                this.chunks[`${cx},${cy}`] = chunk;
            }
        }
    }

    getVisibleChunks(x, y, radius = 1) {
        const cx = Math.floor(x / this.chunkSize);
        const cy = Math.floor(y / this.chunkSize);
        const visible = [];
        for (let oy =- radius; oy <= radius; oy++) {
            for (let ox =- radius; ox <= radius; ox++) {
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