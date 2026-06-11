const MapLoader = require("./MapLoader");
const ChunkManager = require("./ChunkManager");

class MapInstance {
    constructor(name) {
        this.name = name;
        this.mapData = MapLoader.load(name);
        this.chunkManager = new ChunkManager(this.mapData); 
        this.players = {};
        this.npcs = {};
        this.entities = {};
        this.dynamicObjects = [];
        this.layers = {
            ground: this.mapData.layers["Ground"],
            walls: this.mapData.layers["Walls"],
            decoration: this.mapData.layers["Decoration"],
            collision: this.mapData.layers["Collision"],
            teleporters: this.mapData.layers["Teleporters"],
            objects: this.mapData.layers["Objects"]

        };
        this.tileSets = this.mapData.tilesets;
    }

    addPlayer(player) {
        this.players[player.id] = player;
        this.entities[player.id] = player;
    }

    removePlayer(id) {
        delete this.players[id];
        delete this.entities[id];
    }

    addEntity(entity) {
        this.entities[entity.id] = entity;
    }

    removeEntity(id) {
        delete this.entities[id];
    }

    update(delta) {
        for (const id in this.entities) {
            const entity = this.entities[id];
            if (entity && entity.update) {
                entity.update(delta);
            }
        } 
    }

    getVisibleEntities(player) {
        const range = 32;

        return Object.values(this.entities).filter(entity => {
            if (!entity) return false;

            return (
                Math.abs(entity.x - player.x) <= range &&
                Math.abs(entity.y - player.y) <= range
            );
        });
    }

    getVisibleChunks(player) {
        return this.chunkManager.getVisibleChunks(player.x, player.y);
    }

    serialize(player) {
        console.log(player)
        return {
            map: this.name,
            width: this.mapData.width,
            height: this.mapData.height,
            tilewidth: this.mapData.tilewidth,
            tileheight: this.mapData.tileheight,
            tilesets: this.mapData.tilesets,
            chunks: this.getVisibleChunks(player),
            entities: this.getVisibleEntities(player)
        };
    }
}

module.exports = MapInstance;