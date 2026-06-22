function getChunkCoords(x, y){

    return {
        x: Math.floor(x / CHUNK_SIZE),
        y: Math.floor(y / CHUNK_SIZE)
    };
}

function streamChunks(socket, chunkX, chunkY, chunkManager){
    for(let y = chunkY - VIEW_RADIUS; y <= chunkY + VIEW_RADIUS; y++){
        for(let x = chunkX - VIEW_RADIUS; x <= chunkX + VIEW_RADIUS; x++){
            socket.emit("chunkData", chunkManager.getChunk(x, y).getData());
        }
    }
}

function joinAOI(socket, aoiX, aoiY, AOIMananger) {
    socket.join(
        AOIManager.roomName(aoiX, aoiY)
    );
}

function leaveAOI(socket, aoiX, aoiY, AOIManager) {

    socket.leave(
        AOIManager.roomName( aoiX, aoiY)
    );
}

function sendInitialChunks(player, chunkManager){

    const VIEW_RADIUS = 1;

    for(let cy = player.chunkY - VIEW_RADIUS; cy <= player.chunkY + VIEW_RADIUS; cy++){
        for(let cx = player.chunkX - VIEW_RADIUS; cx <= player.chunkX + VIEW_RADIUS; cx++){
            const chunk = chunkManager.getChunk(cx, cy);
            player.socket.emit("chunkData", chunk.getData());
        }
    }
}

 module.exports = {
    getChunkCoords,
    streamChunks,
    joinAOI,
    leaveAOI,
    sendInitialChunks
 }
