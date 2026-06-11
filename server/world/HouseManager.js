const fs = require('fs');
const path = require('path');

class HouseManager {
    constructor() {
        const file = path.join(__dirname, "../../client/assets/map/houses.json");
        this.houses = JSON.parse(fs.readFileSync(file));
    }

    getVisibleHouses(map) {
        return this.houses.filter(h => h.map === map );
    }
}

module.exports = HouseManager;