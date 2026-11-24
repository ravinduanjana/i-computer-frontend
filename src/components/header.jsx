import { Link } from "react-router-dom"




export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent/35 flex justify-center items-center relative">

            <div className="absolute h-full flex items-center justify-center left-10">
                <img src="logo.png" alt="Logo" className="h-[100px] w-[80px] "/>
                <h1 className="text-white text-2xl font-bold ml-2 ">i Computers</h1>

            </div>

            <div className="h-full flex items-center justify-center">
                <Link to ="/" className="text-white mx-4 hover:text-black border-b-2  ">Home</Link>
                <Link to ="/product" className="text-white mx-4 hover:text-black border-b-2 ">Product</Link>
                <Link to ="/about" className="text-white mx-4 hover:text-black border-b-2 ">About</Link>
                <Link to ="/contact" className="text-white mx-4 hover:text-black border-b-2 ">Contact</Link>
        

            </div>



        </header>
    )
}