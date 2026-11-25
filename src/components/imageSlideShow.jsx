import { useState } from "react";

export default function ImageSlideShow(props){
    const images = props.images; 
    const [activeImage, setActiveImage] = useState(0);
    
    //getclasses function eka heduwe image eke border eke colour eka chnge wena ekat, active image eke border eke color eka change wena widiyt hdnna.
    function getClasses(index){
        if(index===activeImage){
        return "w-[100px] h-[100px] object-fill rounded-[10px] border-4 border-secondary cursor-pointer"
    } else {
        return "w-[100px] h-[100px] object-fill rounded-[10px] border-2 border-accent cursor-pointer"
    }
}

    return(
        <div className="w-[500px] h-[400px] flex flex-col m-2">
        <img src={images[activeImage]} className="h-[300px] w-full object-cover"/>

        <div className="w-full h-[100px] flex flex-row justify-center p-4 gap-2">
            {
                images.map(
                    (img , index) => {
                        return<img 
                        onClick={
                            ()=>{
                                setActiveImage(index)
                            }
                        }
                        key={index} src={img} className={getClasses(index)}/>
                    }
                )
            }

        </div>
        </div>
    )
}