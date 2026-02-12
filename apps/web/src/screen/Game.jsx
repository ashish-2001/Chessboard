import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { GAME_OVER, INIT_GAME, MOVE } from "../../../backend/src/messages";
import { Chess } from "chess.js";


function Game(){
    const socket = useSocket(onmessage);
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if(!socket){
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch(message.type){
                case INIT_GAME: {
                    const newChess = new Chess()
                    setChess(newChess);
                    setBoard(newChess.board());
                    setStarted(true);
                    break;
                }

                case MOVE: {
                    const move = message.payload

                    setChess(prev => {
                        const updated = new Chess(prev.fen());
                        try{
                            const appliedMove = updated.move(move);
                            if(!appliedMove){
                                console.warn("Invalid move received from server:", move);
                                return prev;
                            }
                        }catch(e){
                            console.warn("Caught invalid move:", move, e)
                            return prev;
                        }

                        setBoard(updated.board());
                        return updated;
                    })
                    break;
                }

                case GAME_OVER: 
                    break;
            }
        }
    }, [socket]);

    if(!socket) {
        return <div>Connecting...</div>
    };

    return (
        <div className="flex justify-center h-full">
            <div className="pt-8 max-w-3xl w-full flex justify-center h-full">
                <div className="grid grid-cols-6 gap-4 w-full justify-center items-center">
                    <div className="col-span-4 w-full flex justify-center">
                        <Chessboard chess={chess} setBoard={setBoard} board={board} socket={socket}/>
                    </div>
                    <div className="col-span-2 bg-slate-800 w-full h-100 ">
                        <div className="mt-10">
                            { !started && <Button onClick={() => { 
                                    socket.send(JSON.stringify({
                                    type: INIT_GAME
                                }
                            ))}}>Play</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export {
    Game
}