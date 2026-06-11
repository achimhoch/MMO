//const ChunkManager = require("./ChunkManager");

//const MapLoader = require("./MapLoader");
const MapInstance = require("./MapInstance_old");
const RegionManager = require("./RegionManager");
const TeleportSystem = require("../systems/TeleportSystem");
const MapTransitionSystem = require("../systems/MapTransitionSystem");
const HouseManager = require("./HouseManager");
const DungeonManager = require("./DungeonManager");

class WorldManager {
    constructor() {
        //this.chunkManager = new ChunkManager();

        this.players = {};

        this.maps = {
            Grassland: new MapInstance("grassland")
        };

        this.regionManager = new RegionManager();
        this.teleportSystem = new TeleportSystem();
        this.mapTransitionSystem = new  MapTransitionSystem(this.teleportSystem);
        this.houseManager = new HouseManager();
        this.dungeonManager = new DungeonManager();
    }

    addPlayer(player) {
        console.log(player);
        this.players[player.id] = player;
        const map = this.maps[player.map];
        if (map) {
            map.addPlayer(player);
        }
    }

    removePlayer(id) {
        const player = this.players[id];
        if (!player) return;
        const map = this.maps[player.map];
        if (map) {
            map.removePlayer(id);
        }

        delete this.players[id];
    }

    handleMapChange(player, oldMap) {
        if (oldMap === player.map) return;

        const previousMap = this.maps[oldMap];
        const newMap = this.maps[player.map];

        if (previousMap) {
            previousMap.removePlayer(player.id);
        }

        if (newMap) {
            newMap.addPlayer(player);
        }
    }

    update(delta = 16) {
        for (const id in this.players) {
            const player = this.players[id];
            const oldMap = player.map;

            player.update(delta);

            this.mapTransitionSystem.update(player);

            this.handleMapChange(player, oldMap);

            const region = this.regionManager.getRegion(player.x,  player.y, player.map);
            if (region) {
                player.region = region.name;
            }
        }

        for (const mapName in this.maps) {
            this.maps[mapName].update(delta);
        }
    }

    serializePlayer(player) {
        //console.log(player);
        /*const players = [];

        for (const id in this.players) {
            const p = this.players[id];

            players.push({
                id: p.id,
                x: p.x,
                y: p.y,
                map: p.map,
                region: p.region,
                world: p.world
            });
        }*/
        const map = this.maps[player.map];
        //console.log(map);
        if (!map) return null;

        return {
            worldname: player.world,
            map: player.map,
            region: player.region,
            world: map.serialize(player)
        };
    }
}

module.exports = WorldManager;