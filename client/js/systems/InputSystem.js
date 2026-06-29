export default class InputSystem {

    update(context) {

        const inputManager = context.inputManager;

        inputManager.update();

        //---------------------------------------
        // Nur Änderungen senden
        //---------------------------------------

        if (!inputManager.hasChanged()) {
            return;
        }

        context.network.sendInput(

            inputManager.getInput()

        );

        inputManager.commit();
    }

}