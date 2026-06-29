import IsoMath from "../util/IsoMath.js";

export default class PlayerEntity {

    constructor(scene, data) {

        this.id = data.id;

        //--------------------------------------------
        // Autoritative Serverposition
        //--------------------------------------------

        this.serverX = data.x;
        this.serverY = data.y;

        //--------------------------------------------
        // Vorhergesagte Position (Prediction)
        //--------------------------------------------

        this.x = data.x;
        this.y = data.y;

        //--------------------------------------------
        // Darstellung
        //--------------------------------------------

        const iso = IsoMath.worldToIso(
            this.x,
            this.y
        );

        this.sprite = scene.add.image(
            iso.x,
            iso.y,
            "player"
        );

        this.sprite.setOrigin(0.5, 1);
        this.sprite.depth = iso.y;

        //--------------------------------------------
        // Eigenschaften
        //--------------------------------------------

        this.speed = 4;

        this.visible = true;

        this.chunkX = 0;
        this.chunkY = 0;

        this.lastSequence = 0;
    }

    //------------------------------------------------
    // Serverzustand übernehmen
    //------------------------------------------------

    setServerState(data) {

        this.serverX = data.x;
        this.serverY = data.y;

        if (data.sequence !== undefined) {

            this.lastSequence = data.sequence;
        }
    }

    //------------------------------------------------
    // Prediction
    //------------------------------------------------

    applyInput(input) {

        if (input.left) {

            this.x -= this.speed;
        }

        if (input.right) {

            this.x += this.speed;
        }

        if (input.up) {

            this.y -= this.speed;
        }

        if (input.down) {

            this.y += this.speed;
        }
    }

    //------------------------------------------------
    // Reconciliation
    //------------------------------------------------

    resetToServer() {

        this.x = this.serverX;
        this.y = this.serverY;
    }

    //------------------------------------------------
    // Sprite aktualisieren
    //------------------------------------------------

    updateSprite() {

        const iso = IsoMath.worldToIso(
            this.x,
            this.y
        );

        this.sprite.setPosition(
            iso.x,
            iso.y
        );

        this.sprite.depth = iso.y;

        this.chunkX = Math.floor(
            this.x / 64
        );

        this.chunkY = Math.floor(
            this.y / 32
        );
    }

    //------------------------------------------------
    // Entfernen
    //------------------------------------------------

    destroy() {

        this.sprite.destroy();
    }

}