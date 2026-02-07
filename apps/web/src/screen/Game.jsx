import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { GAME_OVER, INIT_GAME, MOVE } from "../../../backend/src/messages";
import { Chess } from "chess.js";


function Game(){
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState();

    useEffect(() => {
        if(!socket){
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch(message.type){
                case INIT_GAME:
                    setChess(new Chess())
                    setBoard(chess.board())
                    console.log("Game Initiator");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move)
                    setBoard(chess.board())
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        }
    }, [socket]);

    if(!socket) {
        return <div>Connecting...</div>
    }

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-3xl">
                <div className="grid grid-cols-6 gap-4 md:grid-cols-2 w-full">
                    <div className="cols-span-4 bg-red-200 w-full">
                        <Chessboard board={board}/>
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">
                        <Button onClick={() => { socket.send(JSON.stringify({
                            type: INIT_GAME
                        }))}}>Play</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export {
    Game
}