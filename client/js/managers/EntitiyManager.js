import IsoMath from "../util/IsoMath.js";

export default class EntityManager {

    constructor(scene){

        this.scene = scene;
        this.players = new Map();
    }

    spawnPlayer(data){
        //console.log(data);
        //console.log(this.players.has(data.id));
        if(this.players.has(data.id)){
            return;
        }
        const pos = IsoMath.worldToIso(data.worldX, data.worldY);
        const sprite = this.scene.add.image(pos.x, pos.y, "player");
        //console.log(sprite);
        sprite.setOrigin(0.5, 1);
        sprite.depth = pos.y + 1;
        sprite.worldX = data.worldX;
        sprite.worldY = data.worldY;
        sprite.targetX = data.worldX;
        sprite.targetY = data.worldY;
        //this.scene.cameras.main.startFollow(sprite);
        this.scene.cameras.main.centerOn(pos.x, pos.y);
        this.players.set(data.id, sprite);
       //console.log(this.players);
    }

    updatePlayer(data){
        //console.log(data);
        let player = this.players.get(data.id);
        if(!player){
            this.spawnPlayer(data);
            player = this.players.get(data.id);
        }
        const pos = IsoMath.worldToIso(data.worldX, data.worldY);
        //player.setPosition(pos.x, pos.y);
        player.depth = pos.y + 1;
        player.worldX = data.worldX;
        player.worldY = data.worldY;
        player.targetX = data.worldX;
        player.targetY = data.worldY;
        this.scene.cameras.main.centerOn(pos.x, pos.y);
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

    getPlayers() {
        return this.players;
    }

    update() {

    }

    applyDelta(delta) {
        delta.added.forEach((entity) => {
            this.spawnPlayer(entity);
        });

        delta.updated.forEach((entity) => {
            this.updatePlayer(entity);
        });

        delta.removed.forEach((id) => {
            this.removePlayer(id);
        });
    }
}