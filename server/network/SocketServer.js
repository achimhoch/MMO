const { Server } = require("socket.io");

const Player = require("../entitiy/Player");
const ChunkManager = require("../manager/ChunkManager");
const AOIManager = require("../manager/AOIManager");
const GameLoop = require("../manager/GameLoop");

const { streamChunks, getChunkCoords, joinAOI, leaveAOI, sendInitialChunks} = require("../functions/serverFunctions");

const players = new Map();
const chunkManager = new ChunkManager();
const CHUNK_SIZE = 16;
const VIEW_RADIUS = 1;

class SocketServer {

    constructor(httpServer) {

        this.io = new Server(httpServer);
        //this.world = new WorldManager();
        this.setup();
        
    }

    setup() {

        this.io.on("connection", (socket) => {
            console.log("Spieler " + socket.id + " verbunden");
            const player = new Player(socket.id, socket);
            players.set(player.id, player);
            socket.join(AOIManager.roomName(0, 0));
            socket.emit("init", player.getData());

            socket.on("input", (input) => {
                player.input = input;
                /*player.input = {
                    left: !!input.left,
                    right: !!input.right,
                    up: !!input.up,
                    down: !!input.down
                };*/
            });

            /*socket.on("move", (data) => {
                 player.move(data);
                const oldChunkX = player.chunkX;
                const oldChunkY = player.chunkY;
                const oldAOIX = player.aoiX;
                const oldAOIY = player.aoiY;
                const chunk = getChunkCoords(player.x, player.y);
                player.chunkX = chunk.x;
                player.chunkY = chunk.y;
                const aoi = AOIManager.getAOI(chunk.x, chunk.y);
                player.aoiX = aoi.x;
                player.aoiY = aoi.y;
                const chunkChanged = oldChunkX !== player.chunkX || oldChunkY !== player.chunkY;
                if (chunkChanged) {
                    streamChunks(socket, player.chunkX, player.chunkY);
                }
                const aoiChanged = oldAOIX !== player.aoiX || oldAOIY !== player.aoiY;
                if (aoiChanged) {
                    leaveAOI(socket, oldAOIX, oldAOIY,AOIManager);
                    joinAOI(socket, player.aoiX, player.aoiY, AOIManager);
                    socket.emit("aoiChanged", {
                        aoiX: player.aoiX,
                        aoiY: player.aoiY
                    });
                }

                const aoi = AOIManager.getAOI(0, 0);
                player.aoiX = aoi.x;
                player.aoiY = aoi.y;

                this.io.to(AOIManager.roomName(player.aoiX, player.aoiY)).emit("playerMove", {id: player.id, x: player.x, y: player.y});
            });*/

        socket.on(
            "disconnect", () => {
                players.delete(player.id);
                this.io.emit("playerLeft", player.id);
                console.log("Spieler " + socket.id + " getrennt");
            }
        );
            
        });

        const gameLoop = new GameLoop(this.io, players, chunkManager);
        gameLoop.start();
    }

    
}

module.exports = SocketServer;
