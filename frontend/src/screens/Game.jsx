import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { VideoCall } from "../components/VideoCall";


const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";


function Game(){
    let socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [stared, setStarted] = useState(false) ;


    useEffect(() => {
        if(!socket){
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type){
                case INIT_GAME: 
                    setStarted(true);
                    setBoard(chess.board());
                    break;
                case MOVE: {
                    const move = message.payload
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                }
                case GAME_OVER:
                    break;
            }
        }
    }, [socket, board, chess]);


    if(!socket){
        return <div>Connecting...</div>
    }
    return (
        <div  className="flex justify-center">
            <div className="pt-8 max-w-5xl w-full">
                <div className="flex justify-center gap-4 w-full">
                    <div className="grid-cols-span-4 w-full flex justify-center">
                        <Chessboard setBoard={setBoard} chess={chess} socket={socket} board={board}/>
                    </div>
                    <div className="flex flex-col bg-slate-800 w-1/2 flex justify-center items-center">
                    
                        <div className="pt-8">
                            {!stared && <Button onClick={() => {
                                socket.send(JSON.stringify({
                                    type: INIT_GAME
                                }))
                            }}>
                                Play
                            </Button>}
                            
                        </div>
                        <VideoCall socket={socket}/>
                    </div>
                </div>
            </div>

        </div>
    )
};

export {
    INIT_GAME,
    MOVE,
    GAME_OVER,
    Game
}