import { useState } from "react"

export default function Test(){
    const [count,setCount] = useState(0)
    const [isVisible,setIsvisible] = useState(true) 
    return(
       
    <div className="w-full h-full bg-yellow-300 flex justify-center items-center ">

      <button 
      onClick ={
        ()=>{
          setIsvisible(false)
        }
      } className="w-5 h-5 bg-accent"
      >X</button>

      <button 
      onClick ={
        ()=>{
          setIsvisible(true)
        }
      } className="w-15 h-5 bg-pink-600  m-3"
      >show</button>


      {isVisible && <div className="w-[400px] h-[400px] bg-white flex items-center justify-center flex-col">
        <h1 className="text-[55px] m-[100px]">{count}</h1>
        <div className="w-full h-[50px] flex items-center justify-center gap-10">
          <button onClick={
            ()=>{
              setCount(count -1)
            }
          } className="w-[100px] h-[45px] bg-red-600">
            Decrement
          </button>

          <button onClick = {
            ()=>{
                setCount(count +1)
            }
          } className="w-[100px] h-[45px] bg-pink-400">Increment
            </button>
        </div>
      </div>}

    </div>
    )
}