class EntityDeltaSystem {

    constructor(players, interestSystem) {

        this.players = players;
        this.interestSystem = interestSystem;
        this.tick = 0;
    }

    setTick(tick) {

        this.tick = tick;
    }

    build(player) {

        const current = new Set();

        const added = [];
        const updated = [];
        const removed = [];

        const visible =
            this.interestSystem.getVisibleEntities(
                player,
                this.players
            );

        for (const entity of visible) {

            current.add(entity.id);

            const packet = {

                id: entity.id,

                worldX: entity.worldX,
                worldY: entity.worldY
            };

            if (
                player.visibleEntities.has(entity.id)
            ) {

                updated.push(packet);

            } else {

                added.push(packet);
            }
        }

        for (const id of player.visibleEntities) {

            if (!current.has(id)) {

                removed.push(id);
            }
        }

        player.visibleEntities = current;

        return {

            tick: this.tick,

            added,
            updated,
            removed
        };
    }

    send() {

        for (const player of this.players.values()) {

            const delta =
                this.build(player);

            if (

                delta.added.length === 0 &&
                delta.updated.length === 0 &&
                delta.removed.length === 0

            ) {
                continue;
            }

            player.socket.emit(
                "entityDelta",
                delta
            );
        }
    }
}

module.exports = EntityDeltaSystem;