const WorldConfig = require("../../shared/WorldConfig");

class ChunkSystem {

    constructor() {

        this.viewRadius = WorldConfig.VIEW_RADIUS;
    }


    /**
     * Wird vom SystemManger einmal pro Tick audgerufen
     */
    update(context) {
        for (const plaver of context.players.values()) {
            this.updatePlayer(player, context.chunkManager);
        }
    }

    /**
     * Synchronisiert die geladenen Chunks des Spielers.
     */
    updatePlayer(player, chunkManager) {

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
            chunkManager.addReference(chunkX, chunkY);
            player.socket.emit("chunkLoad", chunkManager.getChunkData(
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
            chunkManager.removeReference(
                chunkX,
                chunkY
            );
            player.socket.emit("chunkUnload", {
                    chunkX,
                    chunkY
            });
        }
    }

    /**
     * Liefert alle Chunks, die für den Spieler sichtbar sein sollen.
     */
    getVisibleChunkKeys(player) {

        const visible = new Set();
        const minX = player.chunkX - this.viewRadius;
        const maxX = player.chunkX + this.viewRadius;
        const minY = player.chunkY - this.viewRadius;
        const maxY = player.chunkY + this.viewRadius;

        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                visible.add(`${x}:${y}`);
            }
        }

        return visible;
    }
}

module.exports = ChunkSystem;