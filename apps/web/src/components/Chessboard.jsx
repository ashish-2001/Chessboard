function Chessboard({ board }){

    if(!board) return null;

    return (
        <div>
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        return <div key={j} className={`w-16 h-16 flex items-center justify-center text-xl ${(i + j) % 2 ? 'bg-green-600' : "bg-white"}`}>
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
};

export {
    Chessboard
}