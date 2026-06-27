const WorldConfig = require("../../shared/WorldConfig");

class MovementSystem {

    update(context) {
        for (const player of context.players.values()) {

            let vx = 0;
            let vy = 0;

            if (player.input.left) {
                vx--;
            }

            if (player.input.right) {
                vx++;
            }

            if (player.input.up) {
                vy--;
            }

            if (player.input.down) {
                vy++;
            }

            /*
            ----------------------------
            Diagonale normalisieren
            ----------------------------
            */

            if (vx !== 0 || vy !== 0) {

                const length = Math.hypot(vx, vy);

                vx /= length;
                vy /= length;

                player.worldX += vx * player.speed;
                player.worldY += vy * player.speed;
            }

            /*
            ----------------------------
            Tile berechnen
            ----------------------------
            */

            player.tileX = Math.floor(player.worldX / WorldConfig.TILE_WIDTH);
            player.tileY = Math.floor(player.worldY / WorldConfig.TILE_HEIGHT);

            /*
            ----------------------------
            Chunk berechnen
            ----------------------------
            */

            player.chunkX = Math.floor(player.tileX / WorldConfig.CHUNK_SIZE);
            player.chunkY = Math.floor(player.tileY / WorldConfig.CHUNK_SIZE);

        /* return {
                oldChunkX: oldChunkX,
                oldChunkY: oldChunkY,
                oldAOIX: oldAOIX,
                oldAOIY: oldAOIY 
            };*/
        }
    }
}

module.exports = MovementSystem;