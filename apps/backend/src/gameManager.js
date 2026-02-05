import { Game } from "./game.js";
import { INIT_GAME, MOVE } from "./messages.js";

export class GameManager {

    constructor(games, pendingUsers, users){
        this.games = [];
        this.pendingUsers = null;
        this.users = []
    }

    addUser(socket){
        this.users.push(socket)
        this.addHandler(socket);
    }

    removeUser(socket){
        this.users = this.users.filter(user => user !== socket);
        if(this.pendingUsers === socket){
            this.pendingUsers = null;
        }
    }

    addHandler(socket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
            if(this.pendingUsers){
                const game = new Game(this.pendingUsers, socket)
                this.games.push(game);
                this.pendingUsers = null;
            } else {
                    this.pendingUsers = socket;
                }
            }

            if(message.type === MOVE){
                const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
                if(game){
                    game.makeMove(socket, message.payload);
                }
            }
        })
    }
};