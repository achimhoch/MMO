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

    createInput(){

        return {
            left: this.scene.cursors.left.isDown,
            right: this.scene.cursors.right.isDown,
            up: this.scene.cursors.up.isDown,
            down: this.scene.cursors.down.isDown
        };
    }

    nextSequence(){

        this.sequence++;

        return this.sequence;
    }
}