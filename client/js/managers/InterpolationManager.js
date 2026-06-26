import IsoMath
from "../util/IsoMath.js";

export default class InterpolationManager {

    constructor(scene){

        this.scene = scene;
    }

    update(){

        for(const player of this.scene.entityManager.getPlayers().values()) {
            player.worldX += (player.targetX - player.worldX) * 0.15;
            player.worldY += (player.targetY - player.worldY) * 0.15;
            const iso = IsoMath.worldToIso(player.worldX, player.worldY);
            player.setPosition(iso.x, iso.y);
            player.depth = iso.y + 1;
        }
    }
}