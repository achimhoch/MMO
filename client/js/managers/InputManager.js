export default class InputManager {

    constructor(scene) {

        this.scene = scene;
        this.sequence = 0;
        this.pendingInputs = [];
        this.keys = scene.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

        this.input = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        this.lastInput = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    update() {
        this.input.up = this.keys.up.isDown;
        this.input.down = this.keys.down.isDown;
        this.input.left = this.keys.left.isDown;
        this.input.right = this.keys.right.isDown;
    }

    getInput(){

        return this.input;
    }

    hasChanged() {
         return (
            this.input.up !== this.lastInput.up ||
            this.input.down !== this.lastInput.down ||
            this.input.left !== this.lastInput.left ||
            this.input.right !== this.lastInput.right
        );
    }

    commit() {
        this.lastInput = {
            ...this.input
        };

        this.sequence++;
    }

    getCommand() {
        return {
            sequence: this.sequence,
            input: {...this.input}
        };
    }

    nextSequence(){

        this.sequence++;

        return this.sequence;
    }
}