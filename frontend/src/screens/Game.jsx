import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { VideoCall } from "../components/VideoCall";


import {
    INIT_GAME,
    MOVE,
    GAME_OVER,
    VIDEO_PERMISSION,
    WEBRTC_OFFER,
    WEBRTC_ANSWER,
    WEBRTC_ICE
} from "../../../backend1/src/messages"


function Game(){
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [stared, setStarted] = useState(false) ;
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [role, setRole] = useState(null);
    const [signal, setSignal] = useState(null);

    useEffect(() => {
        if(!socket){
            return;
        }

        const handler = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type){
                case INIT_GAME: 
                    setStarted(true);
                    setBoard(chess.board());
                    socket.send(JSON.stringify({
                        type: VIDEO_PERMISSION,
                        payload: { allowed: true }
                    }))
                    break;

                case "start_video":
                    setVideoEnabled(true)
                    setRole(message.payload.role);
                    break;

                case WEBRTC_OFFER:
                case WEBRTC_ANSWER:
                case WEBRTC_ICE:
                    setSignal(message);
                    break;

                case MOVE: {
                    const move = message.payload
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                }
                case GAME_OVER:
                    break;
                
                default: 
                    break;
            }
        };

        socket.addEventListener("message", handler);

        return () => socket.removeEventListener("message", handler);
    }, [socket, chess]);

    if(!socket){
        return <div className="text-white">Connecting...</div>
    }
    return (
        <div className="flex justify-center">
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
                        
                        { videoEnabled && role && (
                            <VideoCall socket={socket} role={role} signal={signal}/>
                        )}
                    
                    </div>
                </div>
            </div>

        </div>
    )
};

export {
    Game
}