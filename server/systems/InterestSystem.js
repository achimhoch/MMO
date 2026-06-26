class InterestSystem {

    getVisibleEntities(player, players) {

        const visible = [];

        for (const other of players.values()) {

            const key =
                `${other.chunkX}:${other.chunkY}`;

            if (!player.loadedChunks.has(key)) {
                continue;
            }

            visible.push(other);
        }

        return visible;
    }
}

module.exports = InterestSystem;