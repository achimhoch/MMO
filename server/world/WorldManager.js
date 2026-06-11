const Player = require("../entities/Player");
const MapInstance = require("./MapInstance");
const RegionManager = require("./RegionManager");
const TeleportSystem = require("../systems/TeleportSystem");
const MapTransitionSystem = require("../systems/MapTransitionSystem");

class WorldManager {
    constructor() {
        this.players = {};

        this.maps = {
           world: new MapInstance("grassland")
        };

        this.regionManager = new RegionManager();
        this.teleportSytem = new TeleportSystem();
        this.transitionSystem = new MapTransitionSystem(this.teleportSytem);
    }

    addPlayer(id) {
        const player = new Player(id);
        player.map = "world";
        this.players[id] = player;
        //this.maps.world.addPlayer(player);
        return player;
    }

    removePlayer(id) {
        delete this.players[id];
        //this.maps.world.removePlayer(id);
    }

    getPlayer(id) {
        return this.players[id];
    }

    update() {
        for (const id in this.players) {
            const player = this.players[id];
            player.update();
            this.transitionSystem.update(player);
            const region = this.regionManager.getRegion(player.map, player.x, player.y);
            if (region) {
                player.region = region;
            }
        }
    }

    serializePlayer(player) {
        const map = this.maps[player.map];
        return {
            //players: Object.values(this.players).map(p => p.serialize())
            player: player.serialize(),
            mapData: map.serialize(),
            chunks: map.getChunksForPlayer(player)
        };
    }
}

module.exports = WorldManager;