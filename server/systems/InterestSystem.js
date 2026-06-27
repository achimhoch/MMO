class InterestSystem {
    constructor() {
        this.aoiIndex = new Map();
    }

    update(context) {
        this.buildAOIIndex(context.players);
    }

    buildAOIINdex() {
        this.aoiIndex.clear();

        for (const player of players.values()) {
            const key = `${player.aoiX}:${player.aoiY}`;
            if (!this.aoiIndex.has(key)) {
                this.aoiIndex.set(key, []);
            }
            this.aoiIndex.get(key).push(player);
        }
    }

    getVisibleEntities(player, players) {

        const visible = [];
    //eigene AOI
        const key = `${player.aoiX}:${player.aoiY}`;
        const list = this.aoiIndex.get(key);

        if (!list) {
            return visible;
        }

        for (const other of list) {

            const key = `${other.chunkX}:${other.chunkY}`;

            if (!player.loadedChunks.has(key)) {
                continue;
            }

            visible.push(other);
        }

        return visible;
    }
}

module.exports = InterestSystem;