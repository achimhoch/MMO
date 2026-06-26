export default class ReconciliationManager {

    constructor(scene){

        this.scene = scene;
    }

    reconcile(state){

        const player = this.scene.entityManager.getPlayer(state.id);

        if(!player){
            return;
        }

        player.worldX = state.x;

        player.worldY = state.y;

        const pending = this.scene.inputManager.pendingInputs;

        while(pending.length && pending[0].sequence <= state.lastProcessedInput) {
            pending.shift();
        }

        for(const cmd of pending) {
            this.scene.predictionManager.applyLocalInput(player, cmd.input);
        }
    }
}