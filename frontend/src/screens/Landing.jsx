import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

function Landing(){

    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-5xl">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-center">
                        <img src="/Chessboard.jpeg" className="max-w-96 "/>
                    </div>
                    <div className="pt-16">
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold text-white">
                                Play chess online on the #3 site.
                            </h1>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Button onClick={() => navigate("/game")} className="px-8 py-4 text-2xl bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                                Play Now
                            </Button>
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