export default class PredictionManager {

    constructor(scene){

        this.scene = scene;
    }

    applyLocalInput(player, input){

        const speed=4;

        if(input.left){

            player.worldX -= speed;
        }

        if(input.right){

            player.worldX += speed;
        }

        if(input.up){

            player.worldY -= speed;
        }

        if(input.down){

            player.worldY += speed;
        }
    }
}