export class GameManager {

    constructor(){
        this.game = [];
        this.pendingUsers = [];
        this.users = []
    }

    addUser(socket){
        this.users.push(socket)
        this.addHandler(socket);
    }

    removeUser(socket){
        this.users = this.users.filter(user => user !== socket)
    }

    addHandler(socket, message){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
        })
    }
}