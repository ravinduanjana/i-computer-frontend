import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


const sampleProducts = [
    {
        productId: "PC001",
        name: "Dell Inspiron 15 Laptop",
        description: "Dell Inspiron laptop with Intel Core i5 processor, 8GB RAM and 512GB SSD.",
        AltName: ["Dell Laptop", "Inspiron 15", "Dell i5"],
        price: 185000,
        labledPrice: 200000,
        category: "Laptops",
        images: ["/images/dell-inspiron-1.png"],
        isVisible: true,
        brand: "Dell",
        model: "Inspiron 15"
    },

    {
        productId: "PC002",
        name: "HP Wireless Mouse",
        description: "Comfortable wireless mouse with USB receiver and adjustable DPI.",
        AltName: ["HP Mouse", "Wireless Mouse", "Computer Mouse"],
        price: 3500,
        labledPrice: 4500,
        category: "Accessories",
        images: ["/images/hp-mouse-1.png"],
        isVisible: true,
        brand: "HP",
        model: "X200"
    },

    {
        productId: "PC003",
        name: "Logitech Mechanical Keyboard",
        description: "Mechanical gaming keyboard with RGB lighting and durable keys.",
        AltName: ["Gaming Keyboard", "RGB Keyboard", "Logitech Keyboard"],
        price: 12500,
        labledPrice: 15000,
        category: "Accessories",
        images: ["/images/logitech-keyboard-1.png"],
        isVisible: true,
        brand: "Logitech",
        model: "G213"
    },

    {
        productId: "PC004",
        name: "Samsung 24 Inch Monitor",
        description: "Full HD LED monitor suitable for office work, studying and entertainment.",
        AltName: ["Samsung Monitor", "24 Inch Display", "LED Monitor"],
        price: 42000,
        labledPrice: 48000,
        category: "Monitors",
        images: ["/images/samsung-monitor-1.png"],
        isVisible: true,
        brand: "Samsung",
        model: "S24R350"
    },

    {
        productId: "PC005",
        name: "Kingston 16GB DDR4 RAM",
        description: "16GB DDR4 desktop memory module designed to improve computer performance.",
        AltName: ["Kingston RAM", "16GB RAM", "DDR4 Memory"],
        price: 14500,
        labledPrice: 17000,
        category: "Computer Components",
        images: ["/images/kingston-ram-1.png"],
        isVisible: true,
        brand: "Kingston",
        model: "DDR4 3200MHz"
    }
];

export default function AdminProductsPage(){
    
    const [products, setProducts]=useState(sampleProducts); //product page eka nithrma wenas weno eknisa useState ekak demma.
    
    
    return(
        <div className="w-full h-full overflow-y-scroll "> {/* page eken eliyta yana ewa scrool krla blanna puluwan wenne me opction eken x ho y walin scrool eka wetena pethe change krnne display eke*/}
            
            {/* oya phala code line walin wenne sampleProducts eken products wlt ganno product list eka map krno e kiynne product ganata ya code eka run wela products tika adminProductpage eke pennano */}
            {
                products.map(
                    (item , index)=>{
                        return <h1 key={item.productId} >{item.name}</h1>  //key ekak demme react waladi monwhri generate wenwnm ekat unique id ekak denna ona.
                    }
                )
                
            }
            
            
            
            
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-xl rounded-[20px] hover:rounded-full hover:bg-purple-500  fixed bottom-12 right-12 ">
            <FaPlus/>
            </Link>
        </div>
    )
} 