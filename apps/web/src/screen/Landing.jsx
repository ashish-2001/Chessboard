import Chessboard from "../assets/Chessboard.jpeg";

function Landing(){
    return (
        <div>
            <div className="mt-2">
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className="flex justify-center">
                        <img src={Chessboard} className="max-w-96"/>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Play chess online on the Site!</h1>
                        <div className="mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Play Online
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