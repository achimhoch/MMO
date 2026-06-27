class EntityDeltaSystem {

    constructor(interestSystem) {

        this.players = players;
        this.interestSystem = interestSystem;
        this.tick = 0;
    }

    /*setTick(tick) {

        this.tick = tick;
    }*/
//Wird vom SystemManager einmal pro Tick aufgerufen
    update(context) {
        for (const player of context.players.values()) {
            const delta = this.buildDelta(player, context);
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

//Erstellt das delta einens Spieler
    buildDelta(player, context) {

        const current = new Set();

        const added = [];
        const updated = [];
        const removed = [];

        /**
         * InterestManagement
         */

        const visibleEntities =
            this.interestSystem.getVisibleEntities(
                player
            );
//Added + Update
        for (const entity of visibleEntities) {

            current.add(entity.id);

            const packet = {

                id: entity.id,

                worldX: entity.worldX,
                worldY: entity.worldY,
                chunkX: entity.chunkX,
                chunkY: entity.chunkY
            };

            if (
                player.visibleEntities.has(entity.id)
            ) {

                updated.push(packet);

            } else {

                added.push(packet);
            }
        }
//removed
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

    
}

module.exports = EntityDeltaSystem;