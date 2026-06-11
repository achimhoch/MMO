const Entity = require("./Entity");

class Player extends Entity {
    constructor(id) {
        super(id, 10, 10);
        //this.world = "Arkana";
        //this.map = "grassland";
        this.region = "unknown";
        this.speed = 0.15;
        this.input = {
            left: false,
            right: false,
            up: false,
            down: false
        };
    }

    update() {
        if (this.input.left) this.x -= this.speed;
        if (this.input.right) this.x += this.speed;
        if (this.input.up) this.y -= this.speed;
        if (this.input.down) this.y += this.speed;
    }
    
    serialize(){
        return {
            ...super.serialize(),
            region: this.region
        };
        
    }
    
}

module.exports = Player;