const SystemManager = require("./SystemManager");
const MovementSystem = require("../systems/MovementSystem");
const AOISystem = require("../systems/AOISystem");
const ChunkSystem = require("../systems/ChunkSystem");
const EntityDeltaSystem = require("../systems/EntityDeltaSystem");
const ChunkDiffSystem = require("../systems/ChunkDiffSystem");
const InterestSystem = require("../systems/InterestSystem");
const WorldConfig = require("../../shared/WorldConfig");



require('dotenv').config();


class GameLoop {

    constructor(io, players, chunkManager){
        this.tick = 0;
        this.io = io;
        this.players = players;
         this.chunkManager = chunkManager;
        this.context = {
            io, 
            players,
            chunkManager,
            tick: 0
        };
        this.systemManager = new SystemManager();
        const interestSystem = new InterestSystem();
        this.systemManager.add("MovementSystem", new MovementSystem(), 100);
        this.systemManager.add("AOISystem", new AOISystem(), 200);
        this.systemManager.add("ChunkSystem", new ChunkSystem(), 300);
        this.systemManager.add("InterestSystem", new InterestSystem(), 400);
        this.systemManager.add("EntityDeltaSystem", new EntityDeltaSystem(interestSystem), 500);
        this.systemManager.add("ChunkDiffSystem", new ChunkDiffSystem(), 600);

        
        
    }

    start(){

        setInterval(() => {
            this.update()
        }, 1000 / WorldConfig.TICK_RATE);
    }

    update(){
        this.tick++;
        this.context.tick = this.tick;
        this.systemManager.update(this.context);
    }

    

   
   

   

    

    
}

module.exports = GameLoop;