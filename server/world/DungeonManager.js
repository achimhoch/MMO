class DungeonManager {
    constructor() {
        this.instances = {};
    }

    createInstance(id, mapName) {
        this.instances[id] = {
            id, 
            map: mapName,
            players: [] 
        }
    }

    addPlayer(instanceId, playerId) {
        const instance = this.instances[instanceId];

        if(!instance) return;

        instance.players.push(playerId);
    }

    removePlayer(instanceId, playerId) {
        const instance = this.instances[instanceId];

        if (!instance) return;

        instance.players = instance.players.filter(p => p !== playerId);
    }
}

module.exports = DungeonManager;