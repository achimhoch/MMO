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
                const pos = IsoMath.worldToIso(x + 64, y + 32);
                const sprite = this.scene.add.sprite(pos.x, pos.y, 'tiles', tile - 1);
                sprite.depth = pos.y;
                container.add(sprite);
            }
        });

        return container;
    }   
}
