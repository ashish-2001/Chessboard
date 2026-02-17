import { useState } from "react"
import { MOVE } from "../../../backend1/src/messages";

function Chessboard({ board, socket }){

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    return(
        <div className="text-white-200">
            {board.map((row, i) => {
                return <div key={i} className="flex ">
                    {row.map((square, j) => {
                        return <div key={j} onClick={() => {
                            if(!from){
                                setFrom(square?.square ?? null);
                            } else {
                                
                                socket.send(JSON.stringify({
                                    type: MOVE,
                                    payload: {
                                        from,
                                        to: square?.square
                                    }
                                }));
                                setFrom(null)
                                console.log({ from, to: square?.square });
                            }
                        }} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-500' : 'bg-white'}`}> 
                            <div className="w-full justify-center flex h-full">
                                <div className="h-full justify-center flex flex-col">
                                    {square ? square.type : ""}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}

export {
    Chessboard
}