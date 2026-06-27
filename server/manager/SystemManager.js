class SystemManager {

    constructor() {

        this.systems = [];
    }

    add(system) {

        this.systems.push(system);
    }

    update(context) {

        for (const system of this.systems) {

            if (typeof system.update === "function") {

                system.update(context);
            }
        }
    }
}

module.exports = SystemManager;