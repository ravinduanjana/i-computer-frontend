import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";

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

                <div className="w-[50%] h-full">
                    <ImageSlideShow images={products.images}/>
                </div>


                <div className="w-[50%] h-full">

                </div>
            </div>
        }
        </div>
    )
}