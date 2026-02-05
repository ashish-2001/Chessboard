import { Chess } from 'chess.js';
export class Game{

    constructor(player1, player2, board, moves, startTime){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date()
    }

    makeMove(socket, move){
        try{
            if(this.board.moves.length % 2 === 0 && socket !== this.player1){
                return;
            }
            if(this.board.move.length % 2 === 1 && socket !== this.player2){
                return;
            }
            this.board.move(move)
        }catch(e){
            console.error(e.message);
        }
    }
}