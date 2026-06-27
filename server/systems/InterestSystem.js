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
            const oldKey = `${player.lastAOIX}:${player.lastAOIY}`;
            const set = this.aoiIndex.get(oldKey);

            if (set) {
                set.delete(player);
                if (set.size === 0) {
                    this.aoiIndex.delete(oldKey);
                }
            }
        }

// neue AOI
        const newKey = `${player.aoiX}:${player.aoiY}`;
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


    getVisibleEntities(player) {

        const visible = [];
    //3x3 AOIs

        for (let ay = player.aoiY - 1; ay <= player.aoiY + 1; ay++) {
            for (let ax = player.aoiX - 1; ax <= player.aoiX + 1; ax++) {

            }
        }
        const key = `${ax}:${ay}`;
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

        return visible;
    }
}

module.exports = InterestSystem;