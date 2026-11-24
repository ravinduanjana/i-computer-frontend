import { Link } from "react-router-dom"

export default function ProductCard(props){
    const product = props.product
    return(
        <Link to ={"/overview/" + product.productId} className="w-[300px] h-[400px] m-4 rounded-lg shadow-lg bg-white overflow-hidden object-cover relative hover:[&_.main-image]:opacity-0"> {/* pahala mulinma thiyena div 2n wenne mouse eka imge ek udta arn giyma imge eka wens wenna hdn widiya. */}
        
            <div className="bg-white absolute top-0 left-0 w-full ">
                <img src={product.images[1]} alt={product.name} className="w-full h-[240px]"/> {/* object-cover mean div ekt gelpena widiyta hari size eka hadgnna eka overfiow-hidden mean div(div eke kona raun krla thiyeddi) eken eliyta paina ppoto wlala eliyta yana tika hide krno. alt name mean imge ekak dala nethan product eke nama pennawai */}
            </div>
            
            <div className="bg-white w-full main-image absolute transition-opacity duration-1000">
                <img src={product.images[0]} alt={product.name} className="w-full h-[240px]"/> {/* object-cover mean div ekt gelpena widiyta hari size eka hadgnna eka overfiow-hidden mean div(div eke kona raun krla thiyeddi) eken eliyta paina ppoto wlala eliyta yana tika hide krno. alt name mean imge ekak dala nethan product eke nama pennawai */}
            </div>

            <div className="h-[150px] w-full absolute flex justify-center bottom-0 flex-col p-2 ">
                <span className="text-xs opacity-50">{product.productId}</span>
                <h1 className="font-semibold text-lg ">{product.name}</h1>
                {
                    product.labelledPrice > product.price &&
                    <p className="text-red-500 text-sm line-through opacity-60 ">{product.labelledPrice.toFixed(2)}</p>
                }

                <p className="text-md font-bold">{product.price.toFixed(2)}</p>

            </div>
        


        </Link>


    )
}