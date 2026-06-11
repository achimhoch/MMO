const { Server } = require('socket.io');

const Worldmanager = require("../world/WorldManager");
const Player = require("../entities/Player");

class SocketServer {
    constructor(httpServer) {
        this.io = new Server(httpServer);
        this.world = new Worldmanager();
        this.start();
    }

    start() {
        this.io.on("connection", (socket) => {
           console.log("Spieler " + socket.id + " verbunden");
           
           const player = new Player(socket.id);
           this.world.addPlayer(player);

           socket.emit("init", {
            id: player.id,
            world: this.world.serializePlayer(player)
           });

           socket.on("input", (input) => {
                player.input = input;
           });

           socket.on("disconnect", () => {
                this.world.removePlayer(player.id);
                console.log("Spieler " + socket.id + " getrennt");
           });
        });

        setInterval(() => {
            this.world.update();

            for (const id in this.world.players) {
                const player = this.world.players[id];
                //console.log(player);
                const state = this.world.serializePlayer(player)

                this.io.to(id).emit("worldState", state);
            }

            
        }, 1000 / 20);
    }
}

module.exports = SocketServer;