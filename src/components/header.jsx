import { BiShoppingBag } from "react-icons/bi"
import { LuUsers } from "react-icons/lu"
import { Link } from "react-router-dom"




export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent/35 flex justify-center items-center relative sticky top-0">


            

            <div className="absolute h-full flex items-center justify-center left-10">
                <img src="/logo.png" alt="Logo" className="h-[100px] w-[80px] "/>
                <h1 className="text-black text-2xl font-bold ml-2 ">i Computers</h1>

            </div>

            <div className="h-full flex items-center justify-center">
                <Link to ="/" className="text-lg font-bold text-black mx-4 hover:text-white border-b-2  ">Home</Link>
                <Link to ="/product" className="text-lg font-bold text-black mx-4 hover:text-white border-b-2 ">Product</Link>
                <Link to ="/about" className="text-lg font-bold text-black mx-4 hover:text-white border-b-2 ">About</Link>
                <Link to ="/contact" className="text-lg font-bold text-black mx-4 hover:text-white border-b-2 ">Contact</Link>
                <Link to ="/admin" className="flex w-[300px] p-[10px] gap-3 items-center mb-0.5 hover:bg-white hover:text-accent"> <LuUsers className="text-black-600 text-[25px]"/>admin </Link>
        

            </div>

            <Link to ="/cart"><BiShoppingBag size={35} className="absolute right-10 top-8 hover:text-white cursor-pointer"/></Link>
        </header>
    )
}