import registerSocketEvents from "../network/SocketEvents.js";

export default class NetworkManager {

    constructor(context) {

        context.socket = io();
        registerSocketEvents(context)
    }

    sendInput(input){

        const sequence = this.scene.inputManager.nextSequence();

        this.scene.inputManager.pendingInputs.push({
                sequence,
                input
        });

        this.socket.emit("input", {
            input,
            sequence
        }); 
    }
}