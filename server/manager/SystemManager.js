class SystemManager {

    constructor() {

        this.systems = [];
        this.registry = new Map();
    }

    add(name, system, priority = 0) {

        if (this.registry.has(name)) {
            console.log(`System '${name}' existiert schon`);
        }
        const entry = {
            name,
            priority,
            enabled: true,
            system
        };
        this.systems.push(entry);
        this.registry.set(name, system);
        this.systems.sort((a, b) => a.priority - b.priority);
    }

    remove(name) {
        this.registry.delete(name);
        this.systems = this.systems.filter(entry => entry.name !== name);
    }

    get(name) {
        return this.registry.get(name);
    }

    enable(name) {
        const entry = this.systems.find(s => s.name === name);
        if (entry) {
            entry.enabled = false;
        }
    }

    has(name) {
        return this.registry.has(name);
    }

    update(context) {

        for (const entry of this.systems) {

            if (!entry.enabled) {
                continue;
            }

            if (typeof entry.system.update !== "function") {
                continue;
            }
            entry.system.update(context);
        }
    }

    getSystems() {
        return this.systems;
    }
}

module.exports = SystemManager;