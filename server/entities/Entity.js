class Entity {
    constructor(id, x = 0, y = 0) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.map = "world";
    }

    serialize() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            map: this.map
        };
    }
}

module.exports = Entity;