import IsoMath from "../util/IsoMath.js";
import WorldConfig from "../../../shared/config.js";

export default class ChunkRenderer {
    constructor(scene) {
        this.scene = scene;
    }

    renderChunk(chunk) {
        //console.log(chunk.layers.ground);
        //console.log(this.scene.textures.get("tiles").getFrameNames());
        const container = this.scene.add.container();
        chunk.layers.ground.forEach((tile, index) => {
           //console.log(tile, index);
            if (tile !== 0) {
                const x = index % WorldConfig.CHUNK_SIZE;
                const y = Math.floor(index / WorldConfig.CHUNK_SIZE);
                const tileX = chunk.x * WorldConfig.CHUNK_SIZE + x;
                const tileY = chunk.y * WorldConfig.CHUNK_SIZE + y;
                const worldX = tileX * WorldConfig.TILE_WIDTH;
                const worldY = tileY * WorldConfig.TILE_HEIGHT;
                const pos = IsoMath.worldToIso(worldX , worldY); 
                //console.log(pos);
                const ground = this.scene.add.sprite(pos.x, pos.y, 'tiles', tile - 1);
                //sprite.depth = IsoMath.depth(pos.x, pos.y);
                ground.depth = pos.y;
                container.add(ground);
                //this.scene.add.existing(sprite);
            }
        });

        chunk.layers.objects.forEach((obTile, obIndex) => {
            if (tile !== 0) {
                const x = obIndex % WorldConfig.CHUNK_SIZE;
                const y = Math.floor(obIndex / WorldConfig.CHUNK_SIZE);
                const obTileX = chunk.x * WorldConfig.CHUNK_SIZE + x;
                const obTileY = chunk.y * WorldConfig.CHUNK_SIZE + y;
                const worldX = obTileX * WorldConfig.TILE_WIDTH;
                const worldY = obTileY * WorldConfig.TILE_HEIGHT;
                const obPos = IsoMath.worldToIso(worldX, worldY);
                const objects = this.scene.add.sprite(obPos.x, obPos.y, 'tiles', tile - 1);
                objects.depth = obPos.y + 150 + obPos.x;
                container.add(objects);
            }
        })
        //console.log(container);
        return container;
    }   
}
