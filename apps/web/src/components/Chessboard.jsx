function Chessboard({ board }){

    if(!board) return null;

    return (
        <div>
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        return <div key={j} className={`w-12 h-12 flex items-center justify-center text-xl ${(i+j) % 2 ? 'bg-green-300' : "bg-green-200"}`}>
                            {square ? square.type : ""}
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