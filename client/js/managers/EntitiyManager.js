import PlayerEntity from "../entity/PlayerEntity";

export default class EntityManager {

    constructor(scene){

        this.scene = scene;
        this.players = new Map();
        this.localPlayerId = null;
    }

    setLocalPlayer(id) {
        this.localPlayerId = id;
    }

    isLocalPlayer(id) {
        return id === this.localPlayerId;
    }

    spawnPlayer(data){
        //console.log(data);
        //console.log(this.players.has(data.id));
        if(this.players.has(data.id)){
            return this.players.get(data.id);
        }
        const player = new PlayerEntity(this.scene, data);
        player.isLocalPlayer = this.isLocalPlayer(data.id);
        this.players.set(data.id, player);
       //console.log(this.players);
    }

    updatePlayer(data){
        //console.log(data);
        let player = this.players.get(data.id);
        if(!player){
            player = this.spawnPlayer(data);
        }
        
        if (player.islocalPlayer) {
            player.setServerState(data);
            return;
        }
        player.setServerState(data);
        player.resetToServer();

        
    }

    applyDelta(delta) {
       for (const entity of delta.added) {
            this.spawnPlayer(entity);
        } 

        for (const entity of delta.updated) {
            this.updatePlayer(entity);
        }

       for (const id of delta.removed) {

            this.removePlayer(id);
        }
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