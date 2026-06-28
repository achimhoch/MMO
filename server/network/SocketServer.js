const { Server } = require("socket.io");

const Player = require("../entity/Player");
const ChunkManager = require("../manager/ChunkManager");
const AOIManager = require("../manager/AOIManager");
const GameLoop = require("../manager/GameLoop");
const TiledChunkManager = require("../manager/TiledChunkManager");

//const { streamChunks, getChunkCoords, joinAOI, leaveAOI, sendInitialChunks} = require("../functions/serverFunctions"); 
const WorldConfig = require("../../shared/WorldConfig");

const players = new Map();
//const tiledChunkManager = new TiledChunkManager();
const chunkManager = new ChunkManager(new TiledChunkManager({chunkSize: WorldConfig, seed: 12345}));
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
            //console.log(player);
            players.set(player.id, player);
            player.worldX = 512;
            player.worldY = 512;
        
            socket.emit("init", {
                id: player.id,
                x: player.worldX,
                y: player.worldY
            });

            socket.on("input", (data) => {
                //console.log(input);
                const Player = players.get(socket.id);
                if (!Player) {
                    return;
                }
                Player.lastProcessedInput = data.sequence;
                Player.input = data.input;
               
            });

            

            socket.on("disconnect", () => {
                    for (const key of player.loadedChunks){
                        const [chunkX, chunkY] = key.split(":").map(Number);
                        chunkManager.unsubscribe(player, chunkX, chunkY);
                        chunkManager.removeReference(chunkX, chunkY);
                    }

                    if (gameLoop.systemManager.get("InterestSystem")) {
                        gameLoop.systemManager.get("InterestSystem").removePlayer(player);
                    }
                    players.delete(player.id)
                    console.log("Spieler " + socket.id + " getrennt");
            });

            
        });

        const gameLoop = new GameLoop(this.io, players, chunkManager);
        gameLoop.start();
    }

    
}

module.exports = SocketServer;
