export default class PredictionSystem {

    update(context) {

        const player = context.entityManager.getPlayer(
            context.playerId
        );

        if (!player)
            return;

        const input = context.inputManager.getInput();

        if (input.left)
            player.x -= player.speed;

        if (input.right)
            player.x += player.speed;

        if (input.up)
            player.y -= player.speed;

        if (input.down)
            player.y += player.speed;
    }

}