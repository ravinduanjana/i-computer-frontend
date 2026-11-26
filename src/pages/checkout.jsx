import { useState } from "react"
import {  getCartTotal } from "../utils/cart"
import { BiMinus, BiPlus } from "react-icons/bi"
import getFormattedPrice from "../utils/getFormattedPrice"
import { useLocation, useNavigate } from "react-router-dom"
import CheckoutDetailsModal from "../components/checkoutDetailsModal.jsx";

export default function Checkout(){
    const location = useLocation();
    const [cart , setCart] = useState(location.state || [])
    const navigate = useNavigate();

    if(location.state == null){
        navigate("/products")
    }


    

    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
                {
                cart.map(
                    (cartItem , index)=>{
                        return(
                            <div key={index} className="w-[600px] h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden">
                                <img className="h-[150px] aspect-square object-cover" src = {cartItem.products.image} alt={cartItem.name}/>
                                <div className="h-full w-[270px] p-4 flex flex-col overflow-hidden justify-between">
                                    <p className="text-xs text-gray-500">{cartItem.products.productId}</p>
                                    <h1 className="text-xl font-bold">{cartItem.products.name}</h1>
                                    <div className="w-[210px] h-[50px] border border-accent rounded-full overflow-hidden flex">
                                    <button onClick={
                                        ()=>{
                                            const newCart = [...cart]
                                            newCart[index].qty = newCart[index].qty - 1
                                            if(newCart[index].qty <= 0){
                                                newCart.splice(index, 1)
                                            }
                                            setCart(newCart)
                                        }
                                    } className="w-[70px] h-full flex justify-center items-center border-r text-2xl font-bold text-gray-700 hover:bg-accent">
                                        <BiMinus/>
                                    </button>
                                    <span className="w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                        {cartItem.qty}
                                    </span>
                                    <button onClick={
                                        ()=>{
                                            const newCart = [...cart]//
                                            newCart[index].qty = newCart[index].qty + 1
                                            setCart(newCart)
                                        }
                                    } className="w-[70px] h-full flex justify-center items-center border-l text-2xl font-bold text-gray-700 hover:bg-accent">
                                        <BiPlus/>
                                    </button>
                                    
                                    </div>
                                </div>

                                <div className="w-[180px] h-full flex flex-col justify-center items-end">
                                
                                    {
                                        cartItem.products.labelledPrice > cartItem.products.price && (
                                            <span className="text-sm text-gray-500 line-through mr-2 ">{getFormattedPrice(cartItem.products.labelledPrice)}</span>
                                        )
                                    }
                                    <span className="text-md font-semibold mr-2 text-accent">{getFormattedPrice(cartItem.products.price)}</span>
                                
                                    <span className="text-lg font-bold text-secondary mr-2">{getFormattedPrice(cartItem.products.price * cartItem.qty)}</span>
                                </div>

                            </div>
                        )
                    })
            }
            <div className="bg-white w-[600px] h-[40px] sticky bottom-0 rounded-xl shadow flex items-center">
                <CheckoutDetailsModal cart={cart}/>
            {/* <button className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80 " onClick={placeOrder} >buy now</button> */}
                <span className="text-lg font-bold text-secondary absolute right-5 border-b-4 border-double">{getFormattedPrice(getCartTotal(cart))}</span>
            
            </div>
            </div>
        
        </div>
    )
}



