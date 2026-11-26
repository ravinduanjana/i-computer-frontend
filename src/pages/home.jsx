import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "../pages/productPage"
import OverView from "./overView";
import { Cart } from "./cart";
import Checkout from "./checkout";


export default function HomePage(){
    return(
        
            
         <div className="w-full min-h-screen"> {/* min-h-screen kiynne aduma usa sceen eke size eka */}
            <Header/>
            <Routes>
                <Route path="/" element={<div>Home Page Content</div>}/>
                <Route path="/about" element={<div>About Page Content</div>}/>
                <Route path="/contact" element={<div>Contact Page Content</div>}/>
                <Route path="/product" element={<ProductPage/>}/>
                <Route path="/overview/:productId" element={<OverView/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/*" element={<div>404 Not found</div>}/>

            </Routes>

            
        </div>
        
    )
}


