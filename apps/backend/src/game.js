import { Chess } from 'chess.js';
import { GAME_OVER, MOVE } from './messages';
export class Game{

    constructor(player1, player2, board, moves, startTime){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date()
    }

    makeMove(socket, move){

        if(this.board.moves.length % 2 === 0 && socket !== this.player1){
            return;
        }
        if(this.board.move.length % 2 === 1 && socket !== this.player2){
            return;
        }
        try{
            this.board.move(move)
        }catch(e){
            console.error(e.message);
            return;
        }

        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }

        if(this.board.move.length % 2 === 0){
            this.player2.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {
            this.player1.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
    }
}