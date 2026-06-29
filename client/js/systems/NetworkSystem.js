export default class NetworkSystem {

    update(context) {

        const network = context.network;

        //------------------------------------------
        // Noch nicht verbunden?
        //------------------------------------------

        if (!network.isConnected()) {
            return;
        }

        //------------------------------------------
        // Eingaben senden
        //------------------------------------------

        const inputManager = context.inputManager;

        if (inputManager.hasChanged()) {

            network.sendInput(

                inputManager.getCommand()

            );

            inputManager.commit();
        }

        //------------------------------------------
        // Weitere Nachrichten könnten hier folgen
        //------------------------------------------

        // Ping

        // Chat

        // Inventory

        // Interaction

        // Crafting

        // RPC

    }

}