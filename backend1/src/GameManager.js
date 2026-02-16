import { INIT_GAME } from "./messages";

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

            if(message.type === "move"){

            }
        })
    }
    handleMessage(){

    }
}

export {
    GameManager
}