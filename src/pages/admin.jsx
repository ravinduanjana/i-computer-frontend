import { Route, Routes } from "react-router-dom";

export default function AdminPage(){

    return(
        <div className="h-full w-full border-4 border-blue-400 flex" >
            <div className="h-full w-[400px] bg-green-400">

            </div>

            <div className="w-[calc(100%-400px)] h-full bg-pink-400">
                <Routes>
                    <Route path="/" element={<h1>orders page</h1>}/>
                    
                </Routes>
            </div>
        </div>
    )
}
//instead of w-[calc(100%-400px)] you can use flex-1