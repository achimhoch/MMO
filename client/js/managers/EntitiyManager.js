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
        const pos = IsoMath.worldToIso(data.x, data.y);
        const sprite = this.scene.add.image(pos.x, pos.y, "player");
        //console.log(sprite);
        sprite.setOrigin(0.5, 1);
        sprite.depth = IsoMath.depth(pos.x, pos.y);
        sprite.worldX = data.x;
        sprite.worldY = data.y
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
        const pos = IsoMath.worldToIso(data.x, data.y);
        player.setPosition(pos.x, pos.y);
        player.depth = pos.y + 10000;
        player.worldX = data.x;
        player.worldY = data.y;
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
}