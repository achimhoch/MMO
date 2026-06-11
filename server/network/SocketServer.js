const { Server } = require('socket.io');
const WorldManager = require("../world/WorldManager");

class SocketServer {
    constructor(httpServer) {
        this.io = new Server(httpServer);
        this.world = new WorldManager();
        this.setup();
        this.startLoop();
    }

    setup() {
        this.io.on("connection", (socket) => {
            console.log("Spieler " + socket.id + " verbunden");
            const player = this.world.addPlayer(socket.id);

            socket.on("input", (input) => {
                //console.log(input);
                player.input = input;
            });

            socket.on("disconnect", () => {
                this.world.removePlayer(socket.id);
            });
        });
    }

    startLoop() {
        setInterval(() => {
            this.world.update();
            for (const id in this.world.players) {
                const player = this.world.players[id];
                 this.io.emit("worldState", this.world.serializePlayer(player));
            }
            //this.io.emit("worldState", this.world.serialize());
        }, 50);
    }
}

module.exports = SocketServer;
