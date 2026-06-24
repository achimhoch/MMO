class Player {

    constructor(id, socket){
        this.id = id;
        this.socket = socket
        this.x = 10;
        this.y = 10;
        this.speed = 4;
        this.chunkX = 0;
        this.chunkY = 0;
        this.aoiX = 0;
        this.aoiY = 0;
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
    }

    getData(){
        return {
            id:this.id,
            x:this.x,
            y:this.y
        };
    }

    getState() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
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