import IsoMath from "../util/IsoMath.js";
import { TILE_WIDTH, TILE_HEIGHT, CHUNK_SIZE } from "../../shared/config.js";

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
                const x = index % CHUNK_SIZE;
                const y = Math.floor(index / CHUNK_SIZE);
                const tileX = chunk.x * CHUNK_SIZE + x;
                const tileY = chunk.y * CHUNK_SIZE + y;
                const worldX = tileX * TILE_WIDTH;
                const worldY = tileY * TILE_HEIGHT;
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
                const x = obIndex % CHUNK_SIZE;
                const y = Math.floor(obIndex / CHUNK_SIZE);
                const obTileX = chunk.x * CHUNK_SIZE + x;
                const obTileY = chunk.y * CHUNK_SIZE + y;
                const worldX = obTileX * TILE_WIDTH;
                const worldY = obTileY * TILE_HEIGHT;
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
