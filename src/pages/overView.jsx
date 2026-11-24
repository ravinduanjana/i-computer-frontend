import { useParams } from "react-router-dom"

export default function OverView(){
    const params = useParams();
    console.log(params)
   
   //fetch product details using params. productid and display here. overview page ekat update krpu widiyta unth products gnna puluwn habi eka url eka wena browser ekakin gehuwt weda krn ne eknisa me ulr ekta prodid eka dala ena widiyt hdnne
    return(

        <div className="bg-amber-500 border-8">
        <h1>product over view</h1>
        </div>
    )
}