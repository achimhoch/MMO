export default class InputCommand {

    constructor(sequence, input) {

        this.sequence = sequence;

        this.input = {

            ...input

        };

        this.timestamp = performance.now();
    }

}