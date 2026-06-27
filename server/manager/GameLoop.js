const SystemManager = require("./SystemManager");
const MovementSystem = require("../systems/MovementSystem");
const AOISystem = require("../systems/AOISystem");
const ChunkSystem = require("../systems/ChunkSystem");
const EntityDeltaSystem = require("../systems/EntityDeltaSystem");
const ChunkDiffSystem = require("../systems/ChunkDiffSystem");
const InterestSystem = require("../systems/InterestSystem");
const WorldConfig = require("../../shared/WorldConfig");



require('dotenv').config();


class GameLoop {

    constructor(io, players, chunkManager){
        this.tick = 0;
        this.io = io;
        this.players = players;
         this.chunkManager = chunkManager;
        this.context = {
            io, 
            players,
            chunkManager,
            tick: 0
        };
        this.systemManager = new SystemManager();
        this.systemManager.add(new MovementSystem());
        this.systemManager.add(new AOISystem());
        this.systemManager.add(new ChunkSystem());
        this.systemManager.add(new InterestSystem());
        this.systemManager.add(new EntityDeltaSystem(this.InterestSystem));
        this.systemManager.add(new ChunkDiffSystem());

        
        
    }

    start(){

        setInterval(() => {
            this.update()
        }, 1000 / WorldConfig.TICK_RATE);
    }

    update(){
        this.tick++;
        this.context.tick = this.tick;
        this.systemManager.update(this.context);
    }

    /*updatePlayer(player){
        const oldChunkX = player.chunkX;
        const oldChunkY = player.chunkY;
        const oldAOIX = player.aoiX;
        const oldAOIY = player.aoiY;

        let vx = 0;
        let vy = 0;

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

        if (player.input.left) vx--;
        if (player.input.right) vx++;
        if (player.input.up) vy--;
        if (player.input.down) vy--;

        if (vx !== 0 || vy !== 0) {
            const len = Math.hypot(vx, vy);

            player.worldX += (vx / len) * player.speed;
            player.worldY += (vy / len) * player.speed;
        }

        player.tileX = Math.floor(player.worldX / WorldConfig.TILE_WIDTH);
        player.tileY = Math.floor(player.worldY / WorldConfig.TILE_HEIGHT);

        player.chunkX = Math.floor(player.tileX / WorldConfig.CHUNK_SIZE);
        player.chunkY = Math.floor(player.tileY / WorldConfig.CHUNK_SIZE);

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
        for (let cy = player.chunkY - WorldConfig.VIEW_RADIUS; cy <= player.chunkY + WorldConfig.VIEW_RADIUS; cy++) {
            for (let cx = player.chunkX - WorldConfig.VIEW_RADIUS; cx <= player.chunkX + WorldConfig.VIEW_RADIUS; cx++) {
                visible.add(`${cx}:${cy}`);
            }
        }
        return visible;
    }

    updateChunkVisibility(player){
        //console.log(player);
        const visibleChunks = this.getVisibleChunkKeys(player);
        //console.log(Array.from(visibleChunks));
        for (const key of visibleChunks) {
            //console.log(key);

            if (player.loadedChunks.has(key)){
                continue;
            }
            player.loadedChunks.add(key);
            //console.log(player.id, Array.from(player.loadedChunks));
            const [chunkX, chunkY] = key.split(":").map(Number);
            //console.log(chunkX, chunkY);
            this.chunkManager.addReference(chunkX, chunkY);
            player.socket.emit("chunkLoad", this.chunkManager.getChunkData(chunkX, chunkY)); 

        }

        for (const key of Array.from(player.loadedChunks)) {
            if (visibleChunks.has(key)) {
                continue;
            }
            player.loadedChunks.delete(key);
            const [chunkX, chunkY] = key.split(":").map(Number);
            this.chunkManager.removeReference(chunkX, chunkY);
            player.socket.emit("chunkUnload", {chunkX, chunkY});
        }
    }

    getVisibleEntities(player) {
        //console.log(Array.from(player.loadedChunks));

        const visible = [];
        for (const other of this.players.values()) {
            //console.log(other);
            if ( other.chunkX === undefined || other.chunkY === undefined) {
                continue;
            }
            const key = `${other.chunkX}:${other.chunkY}`;
            if (player.loadedChunks.has(key)) {
                visible.push(other);
            }
            
        }
       /*console.log(
            "loadedChunks",
            Array.from(player.loadedChunks)
        );

        console.log(
            "visibleEntities",
            visible.map(
                e => e.id
            )
        );

        return visible;
    }

    buildDelta(player) {
        //console.log(player);
        const added = [];
        const updated = [];
        const removed = [];
        const current = new Set();
        const entities = this.getVisibleEntities(player);
        //console.log(entities);
        //added + updated
        for (const entity of entities) {
            current.add(entity.id);
            //console.log(current);
            if (!player.visibleEntities.has(entity.id)) {
                added.push({
                    id: entity.id,
                    x: entity.worldX,
                    y: entity.worldY,
                    lastProcessedInput: entity.lastProcessedInput
                });
            } else {
                updated.push({
                    id: entity.id,
                    x: entity.worldX,
                    y: entity.worldY,
                    lastProcessedInput: entity.lastProcessedInput
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

        player.visibleEntities = current;

        //console.log("visibleEntities", player.id, current);
        //console.log(added, updated, removed);

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
            //console.log(delta);
            player.socket.emit("entityDelta", delta);
        }
    }

    sendChunkDiffs(){
        const dirtyChunks = this.chunkManager.getDirtyChunks();
        for (const chunk of dirtyChunks) {
            const key = `${chunk.x}:${chunk.y}`;
            for (const player of this.players.values()) {
                if (!player.loadedChunks.has(key)) {
                    continue;
                }
                 player.socket.emit("chunkDiff", chunk.getData());
            }
           
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