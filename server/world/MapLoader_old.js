const fs = require('fs');
const path = require('path');

class MapLoader {

    static load(mapName) {
        const file = path.join(__dirname, "../../client/assets/map/continents", `${mapName}.json`);

        const raw = fs.readFileSync(file);
        const json = JSON.parse(raw);
        const layers = {};
        for (const layer of json.layers) {

            if(layer.type === "tilelayer") continue;
            layers[layer.name] ={
                width: layer.width,
                height: layer.height,
                data: layer.data
            }
        }

        return {
            name: mapName,
            width: json.width,
            height: json.height,
            tilewidth: json.tilewidth,
            tileheight: json.tileheight,
            tilesets: json.tilesets,
            layers
        };
    }
}

module.exports = MapLoader;