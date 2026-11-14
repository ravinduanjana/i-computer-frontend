import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState (""); // me line eka gehuwe user gahana email eka wenas wena enm static value ekak nisa hooks use kra(suestate) ekta adlawa onChange kiyla e mail input eke wenas krno. wenne user gahana e mail eka copyak arn eka backend ekt geniynnata.
    const [password, setPassword] = useState ("");// ehath  e mail eke wena process ekamai
    const navigate = useNavigate(); //me hook eke eka page ekakata ekak gehuwm ati ona page ekakat navigate wenna puluwan.

        
      /*  
      mema comment krala thiyena code tiken wena wedema pahala asyc function ekenuth krnna puluwan.
      function login(){//me function eka heduwe login btn eka click krma email ekai pw ekai print krgnna. login btn eke onClick kiyl thiyenne eke me hdpu functio eka call kra.
            
            axios.post("http://localhost:3000/users/login", //axios install krla import krgthata passe login req eka ynna ona path eka denna, itpasse email ekai pw ekai pahtha paridi yawala validation msg denna.
            {

                email : email,
                password : password

            } ).then (
                ()=>{
                    console.log("Login successful");          
                }
            ).catch(
                ()=>{
                    console.log("Login failed");
                }
            )
        }   */
        
            async function login(){
                try{
                    const response = await axios.post( import.meta.env.VITE_API_URL + "/users/login",  // ("http://localhost:3000/users/login" OYA KELLA AIN WELA ( import.meta.env.VITE_API_URL + "/users/login", oka awe front end ekata .env import krnna oya lime eka gehuwma athi backend ekata wada wenas
                   { email : email,
                    password : password }
                   );    
                
            
            console.log(response)
            toast.success("login successful")
            if (response.data.role == "admin"){
                //window.location.href = "/admin/" me line ekenuth navigta wenna puliwn but not professional, uda logo eka refresh wela wage yano penne ekanisa use navigate hook eka use krai, function ekt phalin useNavigate hook eka liuwa, methana use navigate eka call kra ( navigate("/admin/") ), meken ona thenakta yanna puluwan.
              navigate("/admin/")          
            } else {
               navigate("//") //send to home page
            }

            } catch(error){
                console.log(error)
                toast.error("login failed")
            }
        }

    return(
        <div className="w-full h-full bg-[url('/R.jpg')] bg-cover bg-no-repeat bg-center flex "> {/* public wala thiyena image ekak dgnna widiya , bg-cover eken image eka ganata set weno screen ekta, bg-cover dala ehema nounoth bg-center gahnna, no-repeat kiuwe web page eka pahlta loku weddi bg-image eka repeat wena eka nawthanna */}
           
            <div className="w-[50%] h-full flex justify-center items-center flex-col">
                <img src="logo.png" className="w-[800px] object-cover "/>
                <h1 className="text-4xl font-bold mt-5 text-acc">Ravindu computers</h1>
            </div>
           
            <div className="w-[50%] h-full flex justify-center items-center">
           
                <div className="w-[450px] h-[600px] backdrop-blur-sm shadow-2xs rounded-3xl flex flex-col justify-center"> {/* backdrop-blur-sm oken wenne me div eka blur wena eka loku div ekt bg imge ekak dlanm witrai blur wena eka penne. shado eken hewanellak eno wateta onama deka kon raun kranne rounded walin */}
                
                <input type="email" placeholder="email" 
                onChange={// e kiuwe event user krna event e mail eka type kirima 
                    (e)=>{
                        setEmail(e.target.value);//oya line eken wenne user krna hema change ekakma email usestate empty string eke track kragnna eka (save)
                    }
                }
                
                className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/> {/* m=margine p=padding outline-none = text box eka click krma text box eka highlight wena eka nawathanna */}
           



                <input type="password" placeholder="password" 
                
                onChange={
                    (e)=>{
                            setPassword(e.target.value);
                    }
                }
                
                className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/> {/* m=margine p=padding outline-none = text box eka click krma text box eka highlight wena eka nawathanna */}
           
           
           
           
           
           
           
                <p className="w-full text-right pr-5">Frogot password?<Link to="/frogot-passwod" className="text-accent font-bold">Reset</Link></p>
           
                <button onClick={login} className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-accent text-white font-bold  hover:bg-blue-500">Login</button>
           
                <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-accent text-black font-bold">Login with google</button>
           
                <p className="w-full text-black font-bold text-center">Don't have an account  <Link to="/register" className="text-accent">Register</Link></p>
           
             </div>
        
        
            </div>
            


        </div>
    )
}