import { useState } from "react"
import { addToCart, GetCart, getCartTotal } from "../utils/cart"
import { BiMinus, BiPlanet, BiPlus } from "react-icons/bi"
import getFormattedPrice from "../utils/getFormattedPrice"
import { Link } from "react-router-dom"

export function Cart(){
    const [cart , setCart] = useState(GetCart())
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
                                            addToCart(cartItem.products , -1)
                                            setCart(GetCart())
                                        }
                                    } className="w-[70px] h-full flex justify-center items-center border-r text-2xl font-bold text-gray-700 hover:bg-accent">
                                        <BiMinus/>
                                    </button>
                                    <span className="w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                        {cartItem.qty}
                                    </span>
                                    <button onClick={
                                        ()=>{
                                            addToCart(cartItem.products , +1)
                                            setCart(GetCart()) //adu wena eka display krno qty ekee
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
                                
                                    <span className="text-lg font-bold mr-2 text-secondary">{getFormattedPrice(cartItem.products.price * cartItem.qty)}</span>
                                </div>

                            </div>
                        )
                    })
            }
            <div className="bg-white w-[600px] h-[40px] sticky bottom-0 rounded-xl shadow flex items-center">
                <Link state={cart} to="/checkout"  className="bg-blue-500 font-bold text-secondary px-4 py-1 rounded ml-3 hover:bg-accent/80 hover:text-white">Checkout</Link>
                 <spam className="text-lg font-bold text-secondary absolute right-5 border-b-4 border-double">{getFormattedPrice(getCartTotal(cart))}</spam>
               
            </div>
            </div>
           
        </div>
    )
}



