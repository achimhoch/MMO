export default class ClientSystemManager {

    constructor() {

        this.systems = [];
    }

    add(system, priority = 0) {

        this.systems.push({

            priority,

            system
        });

        this.systems.sort(

            (a, b) =>

                a.priority -

                b.priority
        );
    }

    update(context) {

        for (const entry of this.systems) {

            if (entry.system.update) {

                entry.system.update(context);
            }
        }
    }

}