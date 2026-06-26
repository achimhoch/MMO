class ChunkSystem {

    constructor(chunkManager, viewRadius = 1) {

        this.chunkManager = chunkManager;
        this.viewRadius = viewRadius;
    }

    /**
     * Liefert alle Chunks, die für den Spieler sichtbar sein sollen.
     */
    getVisibleChunkKeys(player) {

        const visible = new Set();

        for (let y = player.chunkY - this.viewRadius; y <= player.chunkY + this.viewRadius; y++) {
            for (let x = player.chunkX - this.viewRadius; x <= player.chunkX + this.viewRadius; x++) {
                visible.add(`${x}:${y}`);
            }
        }

        return visible;
    }

    /**
     * Synchronisiert die geladenen Chunks des Spielers.
     */
    update(player) {

        const visibleChunks = this.getVisibleChunkKeys(player);

        //-----------------------------------------
        // chunkLoad
        //-----------------------------------------

        for (const key of visibleChunks) {

            if (player.loadedChunks.has(key)) {
                continue;
            }
            player.loadedChunks.add(key);
            const [chunkX, chunkY] = key.split(":").map(Number);
            this.chunkManager.addReference(chunkX, chunkY);
            player.socket.emit("chunkLoad", this.chunkManager.getChunkData(
                    chunkX,
                    chunkY
                )
            );
        }

        //-----------------------------------------
        // chunkUnload
        //-----------------------------------------

        for (const key of [...player.loadedChunks]) {
            if (visibleChunks.has(key)) {
                continue;
            }
            player.loadedChunks.delete(key);
            const [chunkX, chunkY] = key.split(":").map(Number);
            this.chunkManager.removeReference(
                chunkX,
                chunkY
            );
            player.socket.emit("chunkUnload", {
                    chunkX,
                    chunkY
            });
        }
    }
}

module.exports = ChunkSystem;