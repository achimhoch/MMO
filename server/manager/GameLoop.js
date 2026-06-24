const AOIManager = require("../manager/AOIManager");

class GameLoop {

    constructor(io, players, chunkManager){
        this.io = io;
        this.players = players;
        this.chunkManager = chunkManager;
        this.tickRate = 20;
        this.tick = 0;
        this.chunkSize = 16;
        this.viewRadius = 1;
    }

    start(){

        setInterval(() => {
            this.update()
        }, 1000 / this.tickRate);
    }

    update(){
        this.tick++;
        const entities = [];
        for(const player of this.players.values()){
            this.updatePlayer(player);
            this.updateChunkVisibility(player);
        }
        this.sendEntityDeltas();
        this.sendChunkDiffs();
    }

    updatePlayer(player){
        /*const oldChunkX = player.chunkX;
        const oldChunkY = player.chunkY;*/
        const oldAOIX = player.aoiX;
        const oldAOIY = player.aoiY;

        if(player.input.left){

            player.x -= player.speed;
        }

        if(player.input.right){
            player.x += player.speed;
        }

        if(player.input.up){
            player.y -= player.speed;
        }

        if(player.input.down){
            player.y += player.speed;
        }

        player.chunkX = Math.floor(player.x / this.chunkSize);
        player.chunkY = Math.floor(player.y / this.chunkSize);
        const aoi = AOIManager.getAOI(player.chunkX, player.chunkY);
        player.aoiX = aoi.x;
        player.aoiY = aoi.y;
        this.handleAOIChange(player, oldAOIX, oldAOIY);
        //this.handleChunkChange(player, oldChunkX, oldChunkY);
    }

    handleAOIChange(player, oldAOIX, oldAOIY){
        const changed = oldAOIX !== player.aoiX || oldAOIY !== player.aoiY;
        if(!changed){
            return;
        }
        const oldRoom = AOIManager.roomName(oldAOIX, oldAOIY);
        const newRoom = AOIManager.roomName(player.aoiX, player.aoiY);
        player.socket.leave(oldRoom);
        player.socket.join(newRoom);
        player.socket.emit("aoiChanged", {
            aoiX: player.aoiX,
            aoiY: player.aoiY
        });
    }
    
    getVisibleChunkKeys(player) {
        const visible = new Set();
        for (let cy = player.chunkY - this.viewRadius; cy <= player.chunkY + this.viewRadius; cy++) {
            for (let cx = player.chunkX - this.viewRadius; cx <= player.chunkX + this.viewRadius; cx++) {
                visible.add(`${cx}:${cy}`);
            }
        }
        return visible;
    }

    updateChunkVisibility(player){
        //console.log(player);
        const visibleChunks = this.getVisibleChunkKeys(player);
        for (const key of visibleChunks) {
            if (player.loadedChunks.has(key)){
                continue;
            }
            player.loadedChunks.add(key);
            //console.log(player);
            const [chunkX, chunkY] = key.split(":").map(Number);
            this.chunkManager.addReference(chunkX, chunkY);
            player.socket.emit("chunkLoad", this.chunkManager.getChunkData(chunkX, chunkY)); 

        }

        for (const key of Array.from(player.loadedChunks)) {
            if (!visibleChunks.has(key)) {
                continue;
            }
            player.loadedChunks.delete(key);
            const [chunkX, chunkY] = key.split(":").map(Number);
            this.chunkManager.removeReference(chunkX, chunkY);
            player.socket.emit("chunkUnload", {chunkX, chunkY});
        }
    }

    getVisibleEntities(player) {
        const visible = [];
        for (const other of this.players.values()) {
            const key = `${other.chunkX},${other.chunkY}`;
            if (!player.loadedChunks.has(key)) {
                continue;
            }
            visible.push(other);
        }
        return visible;
    }

    buildDelta(player) {
        const added = [];
        const updated = [];
        const removed = [];
        const current = new Set();
        const entities = this.getVisibleEntities(player);
        //added + updated
        for (const entity of entities) {
            current.add(entity.id);
            if (!player.visibleEntities.has(entity.id)) {
                added.push({
                    id: entity.id,
                    x: entity.x,
                    y: entity.y
                });
            } else {
                updated.push({
                    id: entity.id,
                    x: entity.x,
                    y: entity.y
                });
            }
        }
        //removed
        for (const id of player.visibleEntities) {
            if (current.has(id)) {
                continue;
            }

            removed.push(id);
        }

        player.getVisibleEntities = current;

        return {
            tick: this.tick,
            added,
            updated,
            removed
        };
    }

    sendEntityDeltas(){
        for (const player of this.players.values()) {
            const delta = this.buildDelta(player);
            if (delta.added.length === 0 && delta.updated.length === 0 && delta.removed.length === 0) {
                continue;
            }

            player.socket.emit("entityDelta", delta);
        }
    }

    sendChunkDiffs(){
        const dirtyChunks = this.chunkManager.getDirtyChunks();
        for (const chunk of dirtyChunks) {
            this.io.emit("chunkDiff", chunk.getData());
            chunk.clearDirty();
        }
    }

    /*sendSnapshots(){
       //const rooms = new Map();

        for (const player of this.players.values()) {
           const entities = [];
           for (const other of this.players.values()) {
               const key = `${other.chunkX}:${other.chunkY}`;
               if (player.visibleChunks.has(key)){
                    continue;
                }
                entities.push({
                    id: other.id,
                    x: other.x,
                    y: other.y
                });
           }

           player.socket.emit("worldSnapshot", {
                tick: this.tick,
                entities
           });
        } 
    }*/

    
   
    /*handeleChunkChange(player, oldChunkX, oldChunkY){
        const changed = oldChunkX !== player.chunkX || oldChunkY !== player.chunkY;
        if(!changed){
            return;
        }
        this.startChunkStream(player);
    }  

    startChunkStream(player){
        for(let x = player.chunkX - this.viewRadius; x <= player.chunkX + this.viewRadius; x++) {
            for(let y = player.chunkY - this.viewRadius; y <= player.chunkY + this.viewRadius; y++) {
                const chunk = this.chunkManager.getChunk(x, y);
                player.socket.emit("chunkData", chunk.add());
            }
        }
    }*/

    /*sendAOISnapshots(){
        const rooms = new Map();
        for (const player of this.players.values()){
            const room = AOIManager.roomName(player.aoiX, player.aoiY);
            if (!rooms.has(room)){
                rooms.set(room, []);
            }
            rooms.get(room).push(player);
        }

        for (const [room, roomPlayers] of rooms) {
            const snapshot = {
                tick: this.tick,
                entities: roomPlayers.map(p => ({
                    id: p.id,
                    x: p.x,
                    y: p.y
                }))
            };
            this.io.to(room).emit("worldSnapshot", snapshot);
        }

    }*/

   
   

   

    

    
}

module.exports = GameLoop;