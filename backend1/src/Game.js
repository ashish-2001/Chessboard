import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";

class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.moveCount = 0;
        this.videoPermission = new Map();
        this.videoPermission.set(player1, false);
        this.videoPermission.set(player2, false);

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

    setVideoPermission(socket, allowed){
        this.videoPermission.set(socket, allowed);

        const bothAllowed = this.videoPermission.get(this.player1) && this.videoPermission.get(this.player2);

        if(bothAllowed){
            this.player1.send(JSON.stringify({ type: "start_video" }));
            this.player2.send(JSON.stringify({ type: "start_video" }));
        }
    }

    makeMove(socket, { from, to }){
    
        if(this.moveCount % 2 === 0 && socket !== this.player1){
            return;
        }

        if(this.moveCount % 2 === 1 && socket !== this.player2){
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
        if(this.moveCount % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moveCount++;
    };
}; 

export {
    Game
}