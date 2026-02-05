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
        
    }
}