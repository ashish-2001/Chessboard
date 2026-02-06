import { Chessboard } from "../components/Chessboard"

function Game(){
    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-3xl">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Chessboard/>
                    </div>
                    <div>
                        <button>Play</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export {
    Game
}