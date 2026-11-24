import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../components/productCard"
import LoadingAnimation from "../components/loadingAnimation"


export default function ProductPage(){


const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)


useEffect(
    ()=>{
        if(loading){
            axios.get(import.meta.env.VITE_API_URL + "/products")
            .then(
                (response)=>{
                    setProducts(response.data)
                    setLoading(false)
                }
            ).catch(
                ()=>{
                    toast.error("Error fetching products. please tyr again")
                    setLoading(false)
                }
            )
        }
    },[loading]
)
    return(
        <div className="flex justify-center items-center flex-wrap"> {/* flex wrap mean card wame idan dakunta pirila wedi tika yatata yano */}
            {
                loading && <LoadingAnimation/>
            }
            {
                products.map(
                    (item)=>{
                        return(
                            <ProductCard product={item} key={item.productId}/>
                        )
                    }

                )
            }
        </div>
    )
}