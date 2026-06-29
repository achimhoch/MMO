import PlayerEntity from "../entity/PlayerEntity";

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
        const player = new PlayerEntity(this.scene, data);
        this.scene.cameras.main.centerOn(player.x, player.y);
        this.players.set(data.id, player);
       //console.log(this.players);
    }

    updatePlayer(data){
        //console.log(data);
        let player = this.players.get(data.id);
        if(!player){
            this.spawnPlayer(data);
            player = this.players.get(data.id);
        }
        
        if (data.id === this.localPlayerId) {
            player.setServerState(data);
            return;
        }
        player.x = data.x;
        player.y = data.y;

        player.serverX = data.x;
        player.serverY = data.y;
        this.scene.cameras.main.centerOn(player.x, player.y);
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