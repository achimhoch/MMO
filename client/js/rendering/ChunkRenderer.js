import IsoMath from "../util/IsoMath.js";

export default class ChunkRenderer {
    constructor(scene) {
        this.scene = scene;
    }

    renderChunk(chunk) {
        //console.log(chunk.layers.ground);
        //console.log(this.scene.textures.get("tiles").getFrameNames());
        const container = this.scene.add.container();
        const size = 16;
        chunk.layers.ground.forEach((tile, index) => {
           //console.log(tile, index);
            if (tile !== 0) {
                const x = index % size;
                const y = Math.floor(index / size);
                const worldX = chunk.x * size + x;
                const worldY = chunk.y * size + y;
                const pos = IsoMath.worldToIso(worldX , worldY); 
                //console.log(pos);
                const ground = this.scene.add.sprite(pos.x, pos.y, 'tiles', tile -1);
                //sprite.depth = IsoMath.depth(pos.x, pos.y);
                ground.depth = worldY * 200 + worldX;
                container.add(ground);
                //this.scene.add.existing(sprite);
            }
        });

        chunk.layers.objects.forEach((obTile, obIndex) => {
            const x = obIndex % size;
            const y = Math.floor(obIndex / size);
            const obTileX = chunk.x * size + x;
            const obTileY = chunk.y * size + y;
            const obPos = IsoMath.worldToIso(obTileX, obTileY);
            const objects = this.scene.add.sprite(obPos.x, obPos.y);
            objects.depth = obPos.y + 150 + obPos.x;
            container.add(objects);
        })
        //console.log(container);
        return container;
    }   
}
