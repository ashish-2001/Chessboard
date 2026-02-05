import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from './messages.js';

export class Game{

    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    };

    makeMove(socket, move){

        if(this.board.moves.length % 2 === 0 && socket !== this.player1){
            return;
        }
        if(this.board.move.length % 2 === 1 && socket !== this.player2){
            return;
        }
        console.log("Did not early return")
        try{
            this.board.move(move)
        }catch(e){
            console.log(e.message);
            return;
        }
        console.log("move succeeded")

        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
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