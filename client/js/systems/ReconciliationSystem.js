export default class ReconciliationSystem {

    update(context) {

        const player = context.entityManager.getPlayer(context.playerId);

        if (!player)
            return;

        //---------------------------------------
        // auf Serverposition zurücksetzen
        //---------------------------------------

        player.x = player.serverX;
        player.y = player.serverY;

        //---------------------------------------
        // alle offenen Inputs erneut anwenden
        //---------------------------------------

        const pending = context.inputManager.getPendingCommands();

        for (const command of pending) {

            if (command.input.left)
                player.x -= player.speed;

            if (command.input.right)
                player.x += player.speed;

            if (command.input.up)
                player.y -= player.speed;

            if (command.input.down)
                player.y += player.speed;
        }

    }

}