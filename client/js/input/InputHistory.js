export default class InputHistory {

    constructor() {

        this.commands = [];
    }

    add(command) {

        this.commands.push(command);
    }

    acknowledge(sequence) {

        this.commands = this.commands.filter(

            command => command.sequence > sequence

        );
    }

    getPending() {

        return this.commands;
    }

    clear() {

        this.commands.length = 0;
    }

}