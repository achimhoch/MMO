export default class InputManager {

    constructor(scene) {

        this.scene = scene;
        this.sequence = 0;
        this.pendingInputs = [];
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