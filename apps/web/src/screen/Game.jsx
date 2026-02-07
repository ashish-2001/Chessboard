import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { GAME_OVER, INIT_GAME, MOVE } from "../../../backend/src/messages";
import Chess from "chess.js";


function Game(){
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState();
    
    useEffect(() => {
        if(!socket){
            return;
        }

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    setBoard(new Chess())
                    console.log("Game Initiator");
                    break;

                case MOVE:
                    const move = message.payload;
                    console.log("Move made");
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
                        <Chessboard/>
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">
                        <Button onClick={() => { navigate("/game")}} children={"Play"}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export {
    Game
}