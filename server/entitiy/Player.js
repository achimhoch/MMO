class Player {

    constructor(id){
        this.id = id;
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