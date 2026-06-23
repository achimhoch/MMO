class Player {

    constructor(id, socket){
        this.id = id;
        this.socket = socket
        this.x = 0;
        this.y = 0;
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

    move(data){
        this.x = data.x;
        this.y = data.y;
    }

    getData(){
        return {
            id:this.id,
            x:this.x,
            y:this.y
        };
    }
}

module.exports = Player;