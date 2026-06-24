class Chunk {

    constructor(x, y){

        this.x = x;
        this.y = y;
        this.layers = {
            ground: [],
            objects: [],
            collision: []
        };
        this.dirty = false;
        this.refCount = 0;
    }

    addReference(){
        this.refCount++;
    }

    removeReference(){
        this.refCount--;
        if (this.refCount <= 0){
            this.refCount = 0;
        }
    }

    hasReferences(){
        return this.refCount > 0;
    }


    markDirty(){

        this.dirty = true;
    }
    
    clearDirty(){

        this.dirty = false;
    }

    /*setTile(index, value){

        this.tiles[index] = value;
        this.dirtyTiles.add(index);
    }

    getDiff(){

        const diff = [];

        for(const index of this.dirtyTiles){

            diff.push({index, value: this.tiles[index]});
        }

        this.dirtyTiles.clear();

        return diff;
    }*/

    getData(){

        return {
            x: this.x,
            y: this.y,
            layers: this.layers  
        };
    }
}

module.exports = Chunk;