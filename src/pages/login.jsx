import { Link } from "react-router-dom";

export default function LoginPage(){
    return(
        <div className="w-full h-full bg-[url('/bg-img.jpg')] bg-cover bg-no-repeat bg-center flex "> {/* public wala thiyena image ekak dgnna widiya , bg-cover eken image eka ganata set weno screen ekta, bg-cover dala ehema nounoth bg-center gahnna, no-repeat kiuwe web page eka pahlta loku weddi bg-image eka repeat wena eka nawthanna */}
            <div className="w-[50%] h-full flex justify-center items-center flex-col">
                <img src="logo.png" className="w-[800px] object-cover "/>
                <h1 className="text-4xl font-bold mt-5 text-white">Ravindu computers</h1>
            </div>
            <div className="w-[50%] h- full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-sm shadow-2xs rounded-3xl flex flex-col justify-center"> {/* backdrop-blur-sm oken wenne me div eka blur wena eka loku div ekt bg imge ekak dlanm witrai blur wena eka penne. shado eken hewanellak eno wateta onama deka kon raun kranne rounded walin */}
                
                <input type="email" placeholder="email" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/> {/* m=margine p=padding outline-none = text box eka click krma text box eka highlight wena eka nawathanna */}
                <input type="password" placeholder="password" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/> {/* m=margine p=padding outline-none = text box eka click krma text box eka highlight wena eka nawathanna */}
                <p className="w-full text-right pr-5">Frogot password?<Link to="/frogot-passwod" className="text-accent font-bold">Reset</Link></p>
                <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-accent text-white font-bold">Login</button>
                <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-accent text-white font-bold">Login with google</button>
                <p className="w-full text-black font-bold text-center">Don't have an account  <Link to="/register" className="text-accent">Register</Link></p>
                </div>
            </div>
            


        </div>
    )
}