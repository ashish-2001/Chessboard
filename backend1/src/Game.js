import { Chess } from "chess.js";

class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
    }

    makeMove(socket, move){
        if(socket === this.player1 || socket === this.player2){
            
        }
    }
}; 