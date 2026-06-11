class MapTransitionSystem {
    constructor(teleportsystem) {
        this.teleportSystem = teleportsystem;
    }

    update(player) {
        this.teleportSystem.update(player);
    }
}

module.exports = MapTransitionSystem;