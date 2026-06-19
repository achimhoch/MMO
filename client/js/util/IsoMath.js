export default class IsoMath {

    static TILE_W = 64;
    static TILE_H = 32;

    static worldToIso(x, y) {

        return {

            x:
                (x - y) *
                (this.TILE_W / 2),

            y:
                (x + y) *
                (this.TILE_H / 2)
        };
    }

    static depth(x, y) {

        return (
            x + y
        ) * (
            this.TILE_H / 2
        );
    }
}