import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom"
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import { addToCart, GetCart } from "../utils/cart";
import { Checkout } from "./checkout";


export default function OverView(){
    const params = useParams();
    const [products, setProducts] = useState(null);
   
   //fetch product details using params. productid and display here. overview page ekat update krpu widiyta unth products gnna puluwn habi eka url eka wena browser ekakin gehuwt weda krn ne eknisa me ulr ekta prodid eka dala ena widiyt hdnne
   
useEffect(
    ()=>{
        axios.get(import.meta.env.VITE_API_URL + "/products/" + params.productId).then(
            (response)=>{
                    console.log("Product response:", response.data);
                setProducts(response.data);
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error("failed to fetch product details");
            }
        )
    } , [] )

   return(

        <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center ">
        {
            products === null?<LoadingAnimation/>:<div className="w-full h-full flex items-center justify-center">

                <div className="w-[50%] h-full flex justify-center items-center">
                    <ImageSlideShow images={products.images}/>
                </div>


                <div className="w-[50%] h-full p-5 flex justify-center flex-col">
                    <h1 className="text-3xl font-bold mb-4">{products.name}

                        {
                            products.AltName.map(
                                (AltName , index)=>{
                                    return(
                                        <span key={index} className="text-gray-400 font-medium"> | {AltName}</span>
                                    )
                                }

                            )
                        }
                    </h1>
                    {
                        (products.brand || products.model)&&
                        <p className="text-lg font-medium mb-2">
                            {products.brand && <span>{products.brand}</span>}
                            {products.brand && products.model && <span></span>}
                            {products.model && <span>{products.model}</span>}

                        </p>
                        
                    
                    }

                    <p className="text-sm text-gray-500 mb-4">{products.productId}</p>
                    <p className="text-2xl font-bold mb-4 ">Rs: {Number(products.price).toLocaleString()}.00</p>

                    {
                        products.labelledPrice &&
                        <p className="text-lg text-gray-500 line-through mb-4">Rs: {products.labelledPrice.toFixed(2)}</p>

                    }

                    <p className="text-md mb-4 ">{products.description}</p>


                    <div className="w-full h-[100px] flex justify-start items-center text-white font-bold text-xl">

                        <button className="px-4 py-2 bg-green-400 text-black rounded hover:bg-green-500 cursor-pointer hover:text-white m-4 " onClick={
                            ()=>{
                                addToCart(products , 1)
                                toast.success(products.name + " product added to cart")
                            }
                        } >Add To Cart</button>
                                              {/* state eken wenne state ekt dana deta tika argene link krpu anith page ekt yano, apit ona data tikak state ekakata dala wena page ekakat geniynna puluwan. */}
                        <Link to="/checkout" state = {
                            [
                                {
                                    products: {
                                        name : products.name,
                                        price : products.price,
                                        labelledPrice : products.labelledPrice,
                                        image : products.images[0],
                                        productId : products.productId,
                                    } ,
                                    qty: 1
                                }
                            ]
                        } className="px-4 py-2 text-black bg-blue-400 rounded hover:bg-blue-600 cursor-pointer m-4 hover:text-white">Buy Now</Link>


                    </div>



                </div>
            </div>
        }
        </div>
    )
}