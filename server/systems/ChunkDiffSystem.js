class ChunkDiffSystem {

    constructor() {

        
    }

    update(context) {

        const dirtyChunks = context.chunkManager.getDirtyChunks();
        if (dirtyChunks.length === 0) {
            return;
        }

        for (const chunk of dirtyChunks) {

            const subscribers = context.chunkManager.getSubscribers(chunk.x, chunk.y);

            for (const player of subscribers) {
                player.socket.emit("chunkDiff", chunk.getData());
            }

            chunk.clearDirty();
        }
    }
}

module.exports = ChunkDiffSystem;