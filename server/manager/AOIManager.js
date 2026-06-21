class AOIManager {

    static SIZE = 4;

    static getAOI(chunkX, chunkY){

        return {
            x: Math.floor(chunkX / this.SIZE),
            y: Math.floor(chunkY / this.SIZE)
        };
    }

    static roomName(aoiX, aoiY){
        return `aoi:${aoiX}:${aoiY}`;
    }
}

module.exports = AOIManager;