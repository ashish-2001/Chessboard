import { Navigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"

function Game(){

    return (
        <div  className="flex justify-center">
            <div className="pt-8 max-w-5xl w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="grid-cols-span-4 bg-red-200 w-full">
                        <Chessboard />
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">
                        <Button onClick={() => Navigate("/game")}>
                            Play
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export {
    Game
}