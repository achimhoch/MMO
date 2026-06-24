import IsoMath from "../util/IsoMath.js";

export default class ChunkRenderer {
    constructor(scene) {
        this.scene = scene;
    }

    renderChunk(chunk) {
        //console.log(chunk);
        const container = this.scene.add.container();
        const size = 16;
        chunk.layers.ground.forEach((tile, index) => {
            if (tile !== 0) {
                const x = index % size;
                const y = Math.floor(index / size);
                const worldX = chunk.x * size + x;
                const worldY = chunk.y * size + y;
                const pos = IsoMath.worldToIso(worldX * 64, worldY * 32); 
                const sprite = this.scene.add.sprite(pos.x, pos.y, 'tiles', tile);
                sprite.depth = pos.y;
                container.add(sprite);
            }
        });
        //console.log(container);
        return container;
    }   
}
