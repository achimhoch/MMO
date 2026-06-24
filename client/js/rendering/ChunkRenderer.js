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
                const sprite = this.scene.add.sprite(pos.x, pos.y, 'tiles', tile -1);
                //sprite.depth = IsoMath.depth(pos.x, pos.y);
                sprite.depth = worldY *100 + worldX;
                container.add(sprite);
                //this.scene.add.existing(sprite);
            }
        });
        //console.log(container);
        return container;
    }   
}
