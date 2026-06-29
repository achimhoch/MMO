export default function registerSocketEvents(context) {

    const socket = context.socket;

    socket.on("playerInit", data => {

        context.playerId = data.id;

    });

    socket.on("entityDelta", delta => {

        context.lastServerSequence = delta.sequence;
        context.entityManager.applyDelta(delta);

    });

    socket.on("chunkLoad", chunk => {

        context.chunkManager.loadChunk(chunk);

    });

    socket.on("chunkUnload", chunk => {

        context.chunkManager.unloadChunk(chunk); 

    });

    socket.on("chunkDiff", diff => {

        context.chunkManager.updateChunk(diff);

    });

    socket.on("aoiChanged", data => {

        context.currentAOI = data;

    });

}