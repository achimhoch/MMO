export default class IsoMath {


    static worldToIso(x, y) {

        return {

            x: x - y,
            y: (x + y) / 2

            /*x:
                (x - y) *
                (this.TILE_W / 2),

            y:
                (x + y) *
                (this.TILE_H / 2)*/
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