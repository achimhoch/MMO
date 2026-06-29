export default class IsoMath {


    static worldToIso(x, y) {

        return {

            x: x - y,
            y: (x + y) / 2

            /*x:
                (x - y) *
                (64 / 2),

            y:
                (x + y) *
                (32 / 2)*/
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