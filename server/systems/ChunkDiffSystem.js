class ChunkDiffSystem {

    constructor(players, chunkManager) {

        this.players = players;
        this.chunkManager = chunkManager;
    }

    update(context) {

        const dirtyChunks = this.chunkManager.getDirtyChunks();
        if (dirtyChunks.length === 0) {
            return;
        }

        for (const chunk of dirtyChunks) {

            const key = `${chunk.x}:${chunk.y}`;
            const packet = {
                x: chunk.x,
                y: chunk.y,
                layers: chunk.layers
            };

            for (const player of context.players.values()) {

                if (!player.loadedChunks.has(key)) {
                    continue;
                }    
                player.socket.emit("chunkDiff", packet);
            }

            chunk.clearDirty();
        }
    }
}

module.exports = ChunkDiffSystem;