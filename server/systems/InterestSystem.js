const AOIManager = require("../manager/AOIManager");

class InterestSystem {
    constructor() {
        this.aoiIndex = new Map();
    }

    update(context) {
        for (const player of context.players.values()) {
            this.updatePlayer(player);
        }
    }

    updatePlayer(player) {
        if (!player.aoiChanged) {
            return;
        }
//aus alter AOI entfernen
        if (player.lastAOIX !== null && player.lastAOIY !== null) {
            const oldKey = AOIManager.key(player.lastAOIX, player.lastAOIY);
            const set = this.aoiIndex.get(oldKey);

            if (set) {
                set.delete(player);
                if (set.size === 0) {
                    this.aoiIndex.delete(oldKey);
                }
            }
        }

// neue AOI
        const newKey = AOIManager.key(player.aoiX, player.aoiY);
        let set = this.aoiIndex.get(newKey);

        if (!set) {
            set = new Set();
            this.aoiIndex.set(newKey, set);
        }
        set.add(player);
        player.lastAOIX = player.aoiX;
        player.lastAOIY = player.aoiY;

        player.aoiChanged = false;
    }

    removePlayer(player) {
        const key = AOIManager.key(player.aoiX, player.aoiY);
        const set = this.aoiIndex.get(key);
        if (!set) {
            return;
        }
        set.delete(player);
        if (set.size === 0) {
            this.aoiIndex.delete(key);
        }
    }


    getVisibleEntities(player) {

        const visible = [];

        const neighbours = AOIManager.getNeighbourKeys(player.aoiX, player.aoiY);
        for (const key of neighbours) {
            const set = this.aoiIndex.get(key);
            if (!set) {
                continue;
            }

            for (const other of set) {

                const chunkKey = `${other.chunkX}:${other.chunkY}`;

                if (!player.loadedChunks.has(chunkKey)) {
                    continue;
                }

                visible.push(other);
            }
        }    
        return visible;
    }

    getAOICount() {
        return this.aoiIndex.size;
    }

    getPlayerCount(aoiX, aoiY) {
        const key = AOIManager.key(aoiX, aoiY);
        const set = this.aoiIndex.get(aoiX, aoiY);
        return set ? set.size : 0;
    }
}

module.exports = InterestSystem;