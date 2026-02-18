import { Game } from "./Game.js";
import { INIT_GAME, MOVE, WEBRCT_ANSWER, WEBRTC_ICE, WEBRTC_OFFER } from "./messages.js";

class GameManager {
    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket){
        this.users.filter(user => user !== socket)
    }

    addHandler(socket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            }

            if(message.type === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    game.makeMove(socket, message.payload.move);
                }
            }

            if(message.type === WEBRTC_OFFER || message.type === WEBRCT_ANSWER || message.type === WEBRTC_ICE){
                const game = this.games.find(g => g.player1 === socket || g.player2 === socket);

                if(!game){
                    return;
                }

                const opponent = game.player1 = socket ? game.player2 : game.player1;

                opponent.send(JSON.stringify(message));
            }
        })
    }
};

export {
    GameManager
};