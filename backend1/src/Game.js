import { Chess } from "chess.js";

class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
    }

    makeMove(socket, { from, to }){

        if(this.board.length % 2 === 0 && socket !== this.player1){
            return;
        }

        if(this.board.length % 2 === 1 && socket !== this.player2){
            return;
        }
        try{
            this.board.move(move)
        } catch(e){
            return;
        }

        if(this.board.isGameOver()){
            this.player1.emit({
                type: GAME_OVER
            })
        }
    }
}; 