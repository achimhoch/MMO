import IsoMath from "../util/IsoMath.js";

export default class EntityManager {

    constructor(scene){

        this.scene = scene;
        this.players = new Map();
    }

    spawnPlayer(data){

        if(this.players.has(data.id)){
            return;
        }
        const pos = IsoMath.worldToIso(data.x, data.y);
        const sprite = this.scene.add.rectangle(pos.x, pos.y, 32, 48, 0x00ff00);
        sprite.setOrigin(0.5, 1);
        sprite.depth = IsoMath.depth(data.x, data.y);
        sprite.worldX = data.x;
        sprite.worldY = data.y
        this.players.set(data.id, sprite);
    }

    updatePlayer(data){

        let player = this.players.get(data.id);
        if(!player){
            this.spawnPlayer(data);
            player = this.players.get(data.id);
        }
        const pos = IsoMath.worldToIso(data.x, data.y);
        player.setPosition(pos.x, pos.y);
        player.depth = IsoMath.depth(data.x, data.y);
        player.worldX = data.x;
        player.worldY = data.y;
    }

    removePlayer(id){

        const player = this.players.get(id);
        if(!player) return;
        player.destroy();
        this.players.delete(id);
    }

    getPlayer(id){
        return this.players.get(id);
    }
}