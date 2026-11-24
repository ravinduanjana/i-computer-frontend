


//use for image uploading process
import { useState } from "react"
import uploadFile from "../utils/mediaUpload"



export default function Test(){
    const [file, setFile] = useState(null)
  
    async function upload(){
      try{
        const url = await uploadFile(file)
        console.log(url)

      }catch(err){ 
        console.log(err)

      }
    }
  
    return(
    <div className="w-full h-full bg-yellow-300 flex justify-center items-center ">
    
      <input type="file" onChange={
        (e)=>{
          setFile(e.target.files[0])
        }
      } />


      <button 
      onClick={upload} className="w-[70px] h-[30px] bg-accent rounded-lg hover:bg-pink-400 "> upload</button>
    
    </div>
    )
} 



