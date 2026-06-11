//const LayerChunk = require("./LayerChunk");

class Chunk {
    constructor(cx, cy, size = 16) {
        this.cx = cx;
        this.cy = cy;
        this.size = size;
        this.layers = {};
        this.entities = [];
        //this.generate();
    }

    /*addLayer(name) {
        this.layers[name] = new LayerChunk(name);
    }*/

    /*generate() {
        for (let y = 0; y < 32; y++) {
            let row = [];
            for (let x = 0; x < 32; x++) {
                row.push(Math.random() > 0,9 ? 1 : 0);
            }

            this.tiles.push(row);
        }
    }*/
}

module.exports = Chunk;