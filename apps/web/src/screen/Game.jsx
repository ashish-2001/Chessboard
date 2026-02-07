import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { GAME_OVER, INIT_GAME, MOVE } from "../../../backend/src/messages";
import { Chess } from "chess.js";


function Game(){
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(null);

    useEffect(() => {
        if(!socket){
            return;
        }

        const handleMessage = (event) => {
            const message = JSON.parse(event.data);

            switch(message.type){
                case INIT_GAME: {
                    const newChess = new Chess();
                    setChess(newChess)
                    setBoard(newChess.board())
                    console.log("Game Initiator");
                    break;
                }
                case MOVE:
                    setChess((prevChess) => {
                        const newChess = new Chess(prevChess.fen());
                        newChess.move(message.payload);
                        setBoard(newChess.board())
                        return newChess;
                    });
                    break;
                case GAME_OVER:
                    break;
            }
        }

        socket.addEventlistener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket]);

    if(!socket) {
        return <div>Connecting...</div>
    };

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-3xl w-full">
                <div className="grid grid-cols-6 gap-4 md:grid-cols-2">
                    <div className="cols-span-4 bg-red-200 p-4">
                        <Chessboard board={board}/>
                    </div>
                    <div className="col-span-2 bg-green-200 p-4 flex items-start">
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