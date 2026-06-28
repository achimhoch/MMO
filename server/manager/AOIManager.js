const WorldConfig = require("../../shared/WorldConfig");

class AOIManager {

    static getAOI(chunkX, chunkY){

        return {
            x: Math.floor(chunkX / WorldConfig.AOI_SIZE),
            y: Math.floor(chunkY / WorldConfig.AOI_SIZE)
        };
    }
    static key(aoiX, aoiY) {
        return `${aoiX}:${aoiY}`;
    }

    static roomName(aoiX, aoiY){
        return `aoi:${aoiX}:${aoiY}`;
    }

    static getNeighbourKeys(aoiX, aoiY) {
        const keys = [];
        for (let y = aoiY - 1; y <= aoiY + 1; y++) {
            for (let x = aoiX - 1; x <= aoiX + 1; x++) {
                keys.push(AOIManager.key(x, y))
            }
        }

        return keys;
    }

    static getNeighbours(aoiX, aoiY) {
        const neighbours = [];
        for (let y = aoiY - 1; y <= aoiY + 1; y++) {
            for (let x = aoiX - 1; x <= aoiX + 1; x++) {
                neighbours.push({x, y});
            }
        }
        return neighbours;
    }
}

module.exports = AOIManager;