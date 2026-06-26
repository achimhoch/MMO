class ChunkDiffSystem {

    constructor(players, chunkManager) {

        this.players = players;
        this.chunkManager = chunkManager;
    }

    send() {

        const dirty =
            this.chunkManager.getDirtyChunks();

        for (const chunk of dirty) {

            const key =
                `${chunk.x}:${chunk.y}`;

            for (const player of this.players.values()) {

                if (
                    player.loadedChunks.has(key)
                ) {

                    player.socket.emit(
                        "chunkDiff",
                        chunk.getData()
                    );
                }
            }

            chunk.clearDirty();
        }
    }
}

module.exports = ChunkDiffSystem;