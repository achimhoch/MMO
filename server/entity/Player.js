class Player {

    constructor(id, socket){
        this.id = id;
        this.socket = socket
        this.worldX = 10;
        this.worldY = 10;
        this.speed = 4;
        this.tileX = 0;
        this.tileY = 0;
        this.chunkX = 0;
        this.chunkY = 0;
        this.aoiX = 0;
        this.aoiY = 0;
        this.lastAOIX = null;
        this.lastAOIY = null;
        this.aoiChanged = true;
        this.input = {
            left:false,
            right:false,
            up:false,
            down:false
        };
        this.loadedChunks = new Set();
        this.visibleEntities = new Set();
        this.connectedAt = Date.now();
        this.lastProcessedTick = 0;
        this.lastInputSequence = 0;
        this.ping = 0;
        this.lastProcessedInput = 0;
    }

    getData(){
        return {
            id:this.id,
            x:this.worldX,
            y:this.worldY
        };
    }

    getState() {
        return {
            id: this.id,
            x: this.worldX,
            y: this.worldY,
            tileX: this.tileX,
            tileY: this.tileY,
            chunkX: this.chunkX,
            chunkY: this.chunkY,
            aoiX: this.aoiX,
            aoiY: this.aoiY
        };
    }

    getChunkKey() {
        return `${this.chunkX}:${this.chunkY}`; 
    }
}

module.exports = Player;