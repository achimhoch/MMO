import registerSocketEvents from "../network/SocketEvents.js";

export default class NetworkManager {

    constructor(context) {

        this.socket = io();
        this.connected = false;
        this.context = context;
        context.socket = this.socket;
      
        this.socket.on("connect", () => {
            this.connected = true;
        })

        this.socket.on("disconnect", () => {
            this.connected = false;
        });

          registerSocketEvents(context);
    }

    isConnected() {
        return this.connected;
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

    emit(event, data) {
        this.socket.emit(event, data);
    }
}