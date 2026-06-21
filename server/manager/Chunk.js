class Chunk {

    constructor(x, y, tiles){

        this.x = x;
        this.y = y;
        this.tiles = tiles;
        this.entities = new Map();
        this.dirtyTiles = new Set();
    }

    setTile(index, value){

        this.tiles[index] = value;
        this.dirtyTiles.add(index);
    }

    getDiff(){

        const diff = [];

        for(const index of this.dirtyTiles){

            diff.push({index, value: this.tiles[index]});
        }

        this.dirtyTiles.clear();

        return diff;
    }

    getData(){

        return {
            x: this.x,
            y: this.y,
            tiles: this.tiles
        };
    }
}

module.exports = Chunk;