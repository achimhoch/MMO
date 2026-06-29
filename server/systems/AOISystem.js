const AOIManager = require("../manager/AOIManager");

class AOISystem {

    update(context) {
        for (const player of context.players.values()) {
            this.updatePlayer(player);
        }
    }

    updatePlayer(player) {

       
            const oldAOIX = player.aoiX;
            const oldAOIY = player.aoiY;

            const aoi = AOIManager.getAOI(
                player.chunkX,
                player.chunkY
            );

            player.aoiX = aoi.x;
            player.aoiY = aoi.y;

            player.aoiChanged = oldAOIX === player.aoiX && oldAOIY === player.aoiY;

            if (!player.aoiChanged) {
                return;
            }

    /*
    --------------------------------
    alten Room verlassen
    --------------------------------
    */

            if (oldAOIX !== undefined && oldAOIY !== undefined && oldAOIX !== null & oldAOIY !== null) {
                player.socket.leave(
                    AOIManager.roomName(
                        oldAOIX,
                        oldAOIY
                ));
            }
    // neuen Room betreten
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

module.exports = AOISystem;