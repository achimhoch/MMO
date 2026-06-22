import IsoMath from "../util/IsoMath.js";

export default class ChunkRenderer {

    static render(scene, chunk){

        const container = scene.add.container();

        chunk.tiles.forEach((tileId, index) =>{
            const x = index % 16;
            const y = Math.floor(index / 16);
            const worldX = chunk.x * 16 + x;
            const worldY = chunk.y * 16 + y;
            const iso = IsoMath.worldToIso(worldX, worldY);

            const sprite = scene.add.sprite(
                iso.x,
                iso.y,
                "tiles",
                tileId
            );

           sprite.depth = IsoMath.depth(worldX, worldX);

            container.add(sprite);
        });

        return container;
    }
}