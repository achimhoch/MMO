const fs = require('fs');
const path = require('path');

class TeleportSystem {
    constructor() {
        const file = path.join(__dirname, "../../client/assets/map/teleporters.json");
        this.teleporters = JSON.parse(fs.readFileSync(file));
    }

    update(player) {
        for (const tp of this.teleporters) {
            if (tp.map !== player.map) continue;

            if (
                player.x >= tp.x &&
                player.y >= tp.y &&
                player.x <= tp.x + tp.width &&
                player.y <= tp.y + tp.height
            ) {
                player.map = tp.targetMap;
                player.x = tp.targetX;
                player.y = tp.targetY;

                return;
            }
        }
    }
}

module.exports = TeleportSystem;