const AOIManager = require("../manager/AOIManager");

class AOISystem {

    update(context) {

        for (const player of context.players.values()) {
            const oldAOIX = player.aoiX;
            const oldAOIY = player.aoiY;

            const aoi = AOIManager.getAOI(
                player.chunkX,
                player.chunkY
            );

            player.aoiX = aoi.x;
            player.aoiY = aoi.y;

            if (oldAOIX === player.aoiX && oldAOIY === player.aoiY) {
                return false;
            }

            /*
            --------------------------------
            Room wechseln
            --------------------------------
            */

            if (oldAOIX !== undefined && oldAOIY !== undefined) {
                player.socket.leave(
                    AOIManager.roomName(
                        oldAOIX,
                        oldAOIY
                ));
            }

            player.socket.join(
                AOIManager.roomName(
                    player.aoiX,
                    player.aoiY
                ));

            player.socket.emit("aoiChanged", {
                    aoiX: player.aoiX,
                    aoiY: player.aoiY
                });

            return true;
        }
    }
}

module.exports = AOISystem;