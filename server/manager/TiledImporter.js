const fs = require("fs");

class TiledImporter {

    constructor(path){
        this.map = JSON.parse(fs.readFileSync(path));
    }

    getChunk(chunkX, chunkY, chunkSize){
        const layer = this.map.layers[0];
        const tiles=[];
        for(let y = 0; y < chunkSize; y++){
            for(let x=0; x < chunkSize; x++){
                const worldX = chunkX * chunkSize + x;
                const worldY = chunkY * chunkSize + y;
                const index = worldY * this.map.width + worldX;
                tiles.push(layer.data[index]);
            }
        }
        return tiles;
    }
}

module.exports = TiledImporter;