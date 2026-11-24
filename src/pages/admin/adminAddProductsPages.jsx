import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";





export default function AdminAddProductsPage(){
    const [name, setName] =useState(""); 
    const [productId, setProductId]=useState("");
    const [description, setDescription]=useState("");
    const [altName, setAltName]=useState("");
    const [price, setPrice]=useState("");
    const [labelledPrice, setLabelledPrice]=useState("");
    const [category, setCategory]=useState("");
    const [brand, setBrand]=useState("Generic");
    const [model, setModel]=useState("");
    const [isVisible, setIsVisible ]=useState("true");
    const [files, setFiles ] = useState([]); //images upload krnna empty array ekak demme images godk upload krnna  
    const navigate=useNavigate();
    
            //hema input and textarea panel ekakatama value eka dagnna one. usestate walin eka value eka name, productId

            async function handleAddProduct(){
                try{//me function eka heduwe product create krnna, url eka .env file eken ganne url eke mul tika, json ekak atule product eke details dala product eka bend ekt dala product create krno
                    
                    if(files.length > 5){
                        toast.error("you can upload maximum 5 images");
                        return;
                    }
                    if(productId == ""){
                        toast.error("product name cannot be empty");
                        return;
                    }

                
                    if(name == ""){
                        toast.error("product name cannot be empty");
                        return;
                    }

                    if(description == ""){
                        toast.error("product description cannot be empty");
                        return;
                    }

                   const token= localStorage.getItem("token"); // product createn krnna puluwan admint witrai adminta unth product kreate krnna token eka one, ape browser eke localstorage eke save wela thiyena token eka methanta argnna one eka nisa. 
                    if(token==null){
                        toast.error("you must be login to add product"); 
                        window.location.href="/login"; //token ekak nethn login page ekt ayawno
                        return;//function eka run wena eka nawathano
                    
                    
                    }   
                    const fileUploadPromises = [];
                    // for loop eken wenne i wala agya files ganata samana wenakn me loop eka run weno.
                    for(let i = 0 ; i< files.length ; i++){
                        
                        fileUploadPromises[i] = uploadFile(files[i])
                    }

                    const imageURLs = await Promise.all(fileUploadPromises); //ekapara promises godak run krganna widiya

                    
            
                
                await axios.post(import.meta.env.VITE_API_URL + "/products/add-product",{

                    productId: productId,
                    name: name,
                    description: description,
                    price: price,
                    labelledPrice: labelledPrice,
                    altName: altName.split(","), // altname coma eken wen kra kra gahanne api eth mekata e string value eka split krna one koma eken wen wena wachana (",") oya code kellen eka kiynne, coma eken wen wela thiyena wachana wena wenama dala array ekak hdala product eka hdano.
                    images: imageURLs,
                    category: category,
                    brand: brand,
                    model: model,
                    isVisible: isVisible === "true"
                    },{ //pahala code tiken wenne token eka bend ekt yawano. beare ekka space gehuwe token eka complete wenna ekath ona nisa, postman eke eka outo yno, 
                        headers :{
                            Authorization : "Bearer "+token
                        }
                    })
                    toast.success("product created successfully");
                    //product eka heduwt passe yanna one admin, product page ekt ekt navigate hook eka udun dagena eka methana cl kra.
                    navigate("/admin/products");
                }
                catch(err){
                    
                    toast.error(err?.response?.data?.message ||"fail to add product"); // ? lakunen kiywenne error ekak thiyenwnm eke response ekak thiyenam, response ekta data ekak thiyenam, data eke message eka error eka widiyt denna nethan fail to add product error eka pennanna. 
                    return;
                }
            }

    return(                                                                            //hide scrool track eken wenne tack eka ain wela thumb eka witrk ituru weno scrool bar eke, mekata adala anith code tika index.css file eke e code wlin scrool bar eka design krnna puluwan.
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track"> {/* overflow-scroll magin alut div ekak demmama eka page eken pitatata yanawanam eka nawthala scrool krla blanna puluwan wenna hadai ,flex-wrap can use diga wedi nam pahalata yano col ha row wlt wda wenas, ida madi unoth ilga line ekat yano */}
            {/* max-h-full mean adala div eke usata yanna puluwan ita eha yanna be next row ekata eno */}
            <h1 className="w-full text-3xl bg-primary font-bold mb-4 sticky top-0">Add New Products</h1> {/* add new products topic eka scrool down krddi pen nethiwela yano eka nwthanna me code eka gahai, sticky top-0  normal innakota inna thenama inno but scrool down krddi top eke 0 elaweno.  */}
            
            <div className="w-[50%] h-[100px] flex flex-col ">
                <label className="font-bold ml-2">Product ID</label>
                <input value={productId} 
                onChange ={(e)=>{setProductId(e.target.value)}}placeholder="EX: PROD0001" className="border-2 border-accent rounded-[10px] h-[30px] p-2 m-2 focus:outline-none "></input> {/* focus:outline-none = input box eka select unhma kalu border ekak eno eka nethi krgnna use this code */}
            </div>


            <div className="w-[50%] h-[100px] flex flex-col">
                <label className="font-bold ml-2">Product Name</label>
                <input value={name} onChange ={(e)=>{setName(e.target.value)}} placeholder="EX: Huawei y6p" className="border-2 border-accent rounded-[10px] h-[30px] p-2 m-2 focus:outline-none "></input> 
            </div>


            <div className="w-full h-[140px] flex flex-col">
                <label className="font-bold ml-2">Description</label>
                <textarea value={description} onChange ={(e)=>{setDescription(e.target.value)}} placeholder="Ex: Laptop" className="border-2 border-accent rounded-[10px] h-[100px] p-2 m-2 focus:outline-none "></textarea> {/* description wage godak liynna thiyena ewta input tag newei text area use krnna, enter gagaha word wage line break krnna puluwan ewa,  */}
            </div>
             

             <div className="w-[25%] h-[100px] flex flex-col">
                <label className="font-bold ml-2">Images</label>
                 <input multiple type="file" onChange ={(e)=>{setFiles(e.target.files)}} className="border-2 border-accent rounded-[10px] h-[35px] p-2 m-2 focus:outline-none "></input> 
            {/*multiple type kiyla deme file ekakata wada upload krn nisa*/}
             </div>


            
            <div className="w-full h-[100px] flex flex-col">
                <label className="font-bold ml-2">Alternative Names(comma separated)</label>
                <input value={altName} onChange ={(e)=>{setAltName(e.target.value)}} placeholder="Ex:Laptop, Note Book, Portable Computer" className="border-2 border-accent rounded-[10px] h-[30px] p-2 m-2 focus:outline-none "></input> {/* description wage godak liynna thiyena ewta input tag newei text area use krnna, enter gagaha word wage line break krnna puluwan ewa,  */}
            </div>
           
            <div className="w-[50%] h-[100px] flex flex-col">
                <label className="font-bold ml-2">Price</label>
                <input value={price} onChange ={(e)=>{setPrice(e.target.value)}} placeholder="Rs:50000" type="number" className="border-2 border-accent rounded-[10px] h-[30px] p-2 m-2 focus:outline-none "></input> {/* description wage godak liynna thiyena ewta input tag newei text area use krnna, enter gagaha word wage line break krnna puluwan ewa,  */}
            </div>
          
            <div className="w-[50%] h-[100px] flex flex-col">
                <label className="font-bold ml-2">Labelled Price</label>
                <input value={labelledPrice} onChange ={(e)=>{setLabelledPrice(e.target.value)}} type="number" placeholder="Rs:60000" className="border-2 border-accent rounded-[10px] h-[30px] p-2 m-2 focus:outline-none "></input> {/* description wage godak liynna thiyena ewta input tag newei text area use krnna, enter gagaha word wage line break krnna puluwan ewa,  */}
            </div>


            <div className="w-[25%] h-[100px] flex flex-col"> {/* me code section eka selection drop down menu ekak ekka dana one nam me widiyt dnna puluwan */}
                <label className="font-bold ml-2">Category</label>
                <select value={category} onChange ={(e)=>{setCategory(e.target.value)}} className="border-2 border-accent rounded-[10px] h-[40px] p-2 m-2 focus:outline-none ">
                    <option value="Other">Others</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Components">Components</option>
                    <option value="Accessories">Accessories</option>
                    <option value="peripherals">Peripherals</option>
                </select>
                </div>


                <div className="w-[25%] h-[100px] flex flex-col"> {/* me code section eka selection drop down menu ekak ekka dana one nam me widiyt dnna puluwan */}
                <label className="font-bold ml-2">Brand</label>
                <select value={brand} onChange ={(e)=>{setBrand(e.target.value)}} className="border-2 border-accent rounded-[10px] h-[40px] p-2 m-2 focus:outline-none ">
                    <option value="Generic">Generic</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                    <option value="MSI">MSI</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                </select>
                </div>


                <div className="w-[25%] h-[100px] flex flex-col"> {/* me code section eka selection drop down menu ekak ekka dana one nam me widiyt dnna puluwan */}
                <label className="font-bold ml-2">Model</label>
                <input value={model}onChange ={(e)=>{setModel(e.target.value)}} placeholder="Model" className="border-2 border-accent rounded-[10px] h-[40px] p-2 m-2 focus:outline-none "></input>
                </div>
        

                <div className="w-[25%] h-[100px] flex flex-col"> {/* me code section eka selection drop down menu ekak ekka dana one nam me widiyt dnna puluwan */}
                <label className="font-bold ml-2">Is Visible</label>
                <select value={isVisible} onChange ={(e)=>{setIsVisible(e.target.value)}} className="border-2 border-accent rounded-[10px] h-[40px] p-2 m-2 focus:outline-none ">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
            
                </select>
                </div>

                <div className="w-full h-[80px] bg-white sticky bottom-0  rounded-b-2xl flex justify-end items-center p-4 gap-4">
                    <button className="bg-accent text-white font-bold px-6 py-3 rounded-[10px] hover:bg-secondary">cancel</button>
                    <button onClick={handleAddProduct} className="bg-accent text-white font-bold px-6 py-3 rounded-[10px] hover:bg-secondary">Add product</button>
                    <button></button>



                </div>



        </div>
    )
} 