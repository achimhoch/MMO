const Maploader = require("./MapLoader");
const ChunkManager = require("./ChunkManager");

class MapInstance {
    constructor(name) {
        this.name = name;
        this.players = [];
        this.mapData = Maploader.load(name);
        this.chunkManager = new ChunkManager(this.mapData);
    }

    /*addPlayer(player) {
        this.players.push(player.id);
    }

    removePlayer(id) {
        this.players = this.players.filter(p => p !== id);
    }*/

    getChunksForPlayer(player) {
        return this.chunkManager.getVisibleChunks(player.x, player.y);
    }

    serialize() {
        return {
            name: this.name,
            width: this.mapData.width,
            height: this.mapData.height,
            tilewidth: this.mapData.tilewidth,
            tileheight: this.mapData.tileheight,
            tilesets: this.mapData.tilesets
        };
    }


}

module.exports = MapInstance;