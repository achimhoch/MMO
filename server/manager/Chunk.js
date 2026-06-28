class Chunk {

    constructor(x, y, layers){

        this.x = x;
        this.y = y;
        this.layers = layers
        this.dirty = false;
        this.referenceCount = 0;
    }

    markDirty(){

        this.dirty = true;
    }
    
    clearDirty(){

        this.dirty = false;
    }

    getData(){

        return {
            x: this.x,
            y: this.y,
            layers: this.layers  
        };
    }
}

module.exports = Chunk;