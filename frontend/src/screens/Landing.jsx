function Landing(){

    return (
        <div>
            <div className="mt-2">
                <div className="grid grid-cols-1 gap-4">
                    <div >
                        <img src="/Chessboard.jpeg" className="max-w-96 "/>
                    </div>
                    <div className="flex justify-center">
                        <h1 className="text-4xl font-bold">
                            Play chess online on the #3 site.
                        </h1>
                        <div className="mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Play Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export {
    Landing
}