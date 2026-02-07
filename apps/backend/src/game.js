import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from './messages.js';

export class Game{

    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moveCount = 0;

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

        if(this.moveCount % 2 === 0 && socket !== this.player1){
            return;
        }
        if(this.moveCount % 2 === 1 && socket !== this.player2){
            return;
        }
        
        let result;

        try{
            result = this.board.move(move);
        }catch(e){
            console.log("Invalid move", e.message);
            return;
        };

        if(!result) return;

        if(this.board.isGameOver()){
            const winner = this.board.turn() === "w" ? "black" : "white";

            const payload = JSON.stringify({
                type: GAME_OVER,
                payload: { 
                    winner
                }
            })

            this.player1.send(payload);

            this.player2.send(payload);

            return;
        }

        const opponent = socket === this.player1 ? this.player2 : this.player1;

        opponent.send(
            JSON.stringify({
                type: MOVE,
                payload: move
            })
        );
        
        this.moveCount++;
    };
};