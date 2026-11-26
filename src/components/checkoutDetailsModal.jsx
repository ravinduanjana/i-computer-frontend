import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutDetailsModal(props){

    const [isVisible, setIsVisible] = useState(false); 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const cart = props.cart;
    

    async function placeOrder() {

        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("you must be logged in to place an order ");
            window.location.href = "/login";
            return;
        }
    
        const order = {
            firstName : firstName,
            lastName : lastName,
            addressLine1 : addressLine1,
            addressLine2: addressLine2,
            city : city,
            postalCode : postalCode,
            phone : phone,
            country : "Sri Lanka",
            items : []
        };
    
        cart.forEach((item) => {
    
            order.items.push({
                productId: item.products.productId,
                qty: item.qty
            });
    
        });
    
    
        try {
                await axios.post(
                import.meta.env.VITE_API_URL + "/orders", order,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order placed successfully");
            setTimeout(() => {navigate("/");}, 1500);

return;
            
        } catch (err) {
    
            toast.error(err?.response?.data?.message || "failed to place an order, try again");
            return;
        }
    }


        return (
        <>
            <button className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80"
            onClick={()=>{
                setIsVisible(true);
            }}>

                Buy Now
            </button>
            {/* isVisible&& kiuwe isvisible true nm witrak me div eka pennanna kiyala */}
            {isVisible&&<div className="w-full h-full bg-black/50 fixed z-50 top-0 left-0 flex justify-center items-center">

            <div className="w-[400px] h-auto bg-white rounded-lg p-5 relative">

                <button onClick={()=>{setIsVisible(false)}} className="w-[35px] h-[35px] font-bold bg-accent/30 rounded-2xl text-2xl text-red-600 absolute right-2 top-2 hover:bg-accent ">
                        X
                </button>

                <h1 className="text-lg font-semibold text-secondary mb-5">Please, Enter your details</h1>

                <div className="flex flex-col gap-3">

                    
                    <input required placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />

                                <input required placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />

                                <input required placeholder="Address Line 1"
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />

                                <input placeholder="Address Line 2 (Optional)"
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />

                                <input required placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />

                                <input required placeholder="Postal Code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />

                                <input required type="tel" placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                    <button onClick={placeOrder} className="bg-accent text-black font-bold px-4 py-2 rounded hover:bg-accent/80 mt-3 ">
                        Confirm
                    </button>
                    
                </div>

            </div>


            
            
            </div>}
        </>
    );
}