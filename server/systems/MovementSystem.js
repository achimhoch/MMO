require('dotenv').config();

class MovementSystem {

    update(player) {

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

        player.tileX = Math.floor(player.worldX / process.env.TILE_WIDTH);
        player.tileY = Math.floor(player.worldY / process.env.TILE_HEIGHT);

        /*
        ----------------------------
        Chunk berechnen
        ----------------------------
        */

        player.chunkX = Math.floor(player.tileX / process.env.CHUNK_SIZE);
        player.chunkY = Math.floor(player.tileY / process.env.CHUNK_SIZE);

       /* return {
            oldChunkX: oldChunkX,
            oldChunkY: oldChunkY,
            oldAOIX: oldAOIX,
            oldAOIY: oldAOIY 
        };*/
    }
}

module.exports = MovementSystem;