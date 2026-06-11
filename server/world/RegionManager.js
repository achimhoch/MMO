const fs = require('fs');
const path = require('path');

class RegionManager {
    constructor() {
        const file = path.join(__dirname, "../../client/assets/map/regions.json");
        this.regions = JSON.parse(fs.readFileSync(file));
    }

    getRegion(x, y, map) {
        for (const region of this.regions) {
            if (region.map !== map) continue;

            if (
                x >= region.x &&
                y >= region.y &&
                x < region.x + region.width &&
                y < region.y + region.height
            ) {
                return region;
            }
        }

        return null
    }
}

module.exports = RegionManager;