function Chessboard({ board }){

    return (
        <div>
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        return <div key={j} className={`w-8 h-8 ${(i+j) % 2 ? 'bg-green-200' : "bg-green-300"}`}>
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