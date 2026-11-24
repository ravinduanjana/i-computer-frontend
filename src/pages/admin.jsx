import { Link, Route, Routes } from "react-router-dom";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductsPage from "./admin/adminAddProductsPages";
import AdminUpdateProductsPage from "./admin/adminUpdateProductsPage";




export default function AdminPage(){

    return(
        <div className="h-full w-full border-4 flex bg-accent fixed" >


            <div className="h-full w-[200px] flex flex-col bg-accent ">
                <h2 className="text-xl font-bold p-5 border-b-4 hover:bg-white hover:text-accent">Admin panel</h2>
                <Link to="/admin" className="flex w-[300px] p-[10px] gap-3 items-center mb-0.5 hover:bg-white hover:text-accent "> <GoListUnordered className="text-black-600 text-[25px] "/> Orders</Link>   {/* <GoListUnordered = oya kellen wenne react icon site eken copy krn apu import code eka uda paste krla impot krgena eka methanta component ekak widiyta liygena e icon eka methnt dgnna puluwan, me icon wla size color maru krnne text wala maru krna widiytmai,  */}
                <Link to="/admin/products" className="flex w-[300px] p-[10px] gap-3 items-center mb-0.5 hover:bg-white hover:text-accent">  <MdOutlineInventory2 className="text-black-600 text-[25px]"/>  Products</Link>  {/* gap = eka div ekeka thiyena components 2ka ekinekata thiygnna dura */}
                <Link to ="/admin/users" className="flex w-[300px] p-[10px] gap-3 items-center mb-0.5 hover:bg-white hover:text-accent"> <LuUsers className="text-black-600 text-[25px]"/> Users</Link>
                 <Link to ="/admin/update-product" className="flex w-[300px] p-[10px] gap-3 items-center mb-0.5 hover:bg-white hover:text-accent"> <LuUsers className="text-black-600 text-[25px]"/> update</Link>
            </div>



            <div className="w-[calc(100%-200px)] h-full border-8 border-accent rounded-[20px] bg-primary p-3">

                <Routes>
                    <Route path="/"  element={<h1>orders page</h1>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/users" element={<h1>users page</h1>}/>
                    <Route path="/add-product" element={<AdminAddProductsPage/>}/>
                    <Route path="/update-product" element={<AdminUpdateProductsPage/>}/>    
                </Routes>
            </div>
        
        
        </div>
    )
}
//instead of w-[calc(100%-00px)] you can use flex-1