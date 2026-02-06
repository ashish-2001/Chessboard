import { Chessboard } from "../components/Chessboard"

function Game(){
    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-3xl">
                <div className="grid grid-cols-6 gap-4 md:grid-cols-2 w-full">
                    <div className="cols-span-4 bg-red-200 w-full">
                        <Chessboard/>
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">
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