import { Chess } from "chess.js";
import { GAME_OVER, MOVE } from "./messages";

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

        let move;
        try{

            move = this.board.move({ from, to });
        } catch(e){
            return;
        }

        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }

        if(this.board.moves.length % 2 === 0){
            this.player2.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            this.player1.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
    }
}; 