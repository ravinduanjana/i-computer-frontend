/*  
*react wala function ekak hadaddi nama aniwren capital akurak wenna one.
*react wala product view krna krna parata adla code eka uda idn phalat run weno
*js athule html liyna eka aulak ne. html atule js liyaddi {}  dnna one.
*me file wala .jsx kiyla thiyenne java script and html(xml) dekama kawalame thiyena nisa.
*className="rounded-full h-20 w-21"/> , h-[33.5px]  oya widiyta denna puluwan px walin denawanam kotu warhana atule ghanna one normal 4 nam px 16, normal 5 nam px 20 nisa apit 18px denna onam [] wrhana atule gahanna one
*  <h2>{props.name}</h2> , <h2></h2> mewage tags html eka atule liyna js nisa html atule js liyaddi {}  yodai. js atule niknma html liuwata, html atule js liyanna nam {} dannama one.
* java script wala class kiyla key word ekak thiyen nisa react waladi class wenuwta className kiyl ganna
* me widiyata liuwath werdi ne <ProductCard></ProductCard> = <ProductCard/> ,shift+alt+a = use for comment
* div ekak heduwama eke color eka transparent eknisa apim bg color rkak dala blanna one div eka koheda thiyenne kiyala.
*flex- div eka flexible krgnna 
*flex-row - div tika thirswa hadanna
*flex-col - div tika siraswa hdnna 
*items-center - div tika hari medata ganna
*items-end - kotu tika pahalata eno
*items-start - kotu tika udata yano
*justify-center - div tika hri medata ganna
*justify-between - div tika samana durkin eth weno
*justify-evenly - div tika samana durakin eth weno udinui yatinuith balance weno samana durkin.
* <div className="w-[500px] h-[500px] border-4 bg-emerald-500 flex flex-row items-center justify-center">

*positioning
  1 fixed
* <div className="w-[75px] h-[75px] border-2 bg-[#c71887] fixed bottom-[10px] right-[10px]" > oken apita kemathi div eka (kotuwak) udata pahalata wamata dakunata ganna puluwan left-1 top-2 px wlin danwnm [] yodai
*fixed krgthu kotu ho div kemati thenakin thiygnna puluwan
 
  2 absolute
  <div className="w-[75px] h-[75px] border-2 bg-[#c71887] absolute bottom-[10px] right-[10px]" > oken apita kemathi div eka (kotuwak) udata pahalata wamata dakunata ganna puluwan left-1 top-2 px wlin danwnm [] yodai
*absolute krgthu kotu ho div kemati thenakin thiygnna puluwan, eth ema kotuwa inna loku div ekakata relative dunnama eka loku div ekata sapekshawa absolute dunna div eka move wenne loku div eka athule withrak, fixed wage screen eke hemthenma ynna be.
*
* z-1 
  z-2 
  div dekakkata oyawage z walue dunnama z value eka wedi kena udata eno adu kena yatata yano
  eka uda eka inna z akshaya osse.

- pahala code tika blanna, mulinma athi div ekta h-full kiuwata wenas wen ne e wage hight eka wenas wenne nethn screen kiyla screen size ekma denna.
export default function App() {
  

  return (
    <div className="w-full h-screen bg-amber-700">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>  admin ta /* demme url eke 5179/admin/product adminta passe wena monwahri awoth eth admin page ekma show wenna ona nisa /* demma.
      </Routes>
    </div>
  );
}


pahala code walin wenne eka div ekakata api kemathi size eka deno
anith dev ekat display eke 100% api plweni ekata dunna px gana adu krla ituru tika
auto adjust wenna dena eka.
export default function AdminPage(){

    return(
        <div className="h-full w-full border-4 border-blue-400 flex" >
            <div className="h-full w-[400px] bg-green-400">

            </div>

            <div className="w-[calc(100%-400px)] h-full bg-pink-400">

            </div>
        </div>
    )
}


* pixabay use this web site for download web sites, api professional web site ekak hdnwnm
images pay krla gnna nethan free dena site ekakin ganna nethan legal prashna eno

    <div className="w-[75px] h-[75px] border-2 bg-fuchsia-600 ml-[10px] mt-[20px] mb-[5px] mr-[5px] " >  margine hathra peththata values 4k dagnna nam mt , mb, ml, mr (left,top,bottom,right)  padding wlatath ehemai, pt,pl, pb, pr htara watete kemthi avalues denna puluwan

div className="w-[75px] h-[75px] border-2 bg-blue-50 m-[20px] p-[10px]"> {/* m= margine watema inna ayth ekka 20 px durak pwthwa genima  padding p-[20px] padin ekekn wenee thamange boundry eka athule samana durkin content eka pawthwa genima

 className="w-full h-[50px] border-4 flex items-center justify-center gap-10" gap-10 gap eken wenne div ekak atule thiyena dewal samana dukin align kirima


pahatha code eken wenne decrement button eka click krddi value eka adu weno mekata return ekt udin count = 10 kiyla variable ekak hdgnna one. button wlat dala thiyena function eka hodt blagnna 

export default function Test(){
    let count = 10
    return(
       
    <div className="w-full h-full bg-yellow-300 flex justify-center items-center ">
      <div className="w-[400px] h-[400px] bg-white flex items-center justify-center flex-col">
        <h1 className="text-[55px] m-[100px]">{count}</h1>
        <div className="w-full h-[50px] flex items-center justify-center gap-10">
          <button onClick={
            ()=>{
              count = count -1
              console.log(count)
            }
          } className="w-[100px] h-[45px] bg-red-600">
            Decrement
          </button>

          <button onClick = {
            ()=>{
              count = count +1 
              console.log(count)
            }
          } className="w-[100px] h-[45px] bg-pink-400">Increment
            </button>
        </div>
      </div>

    </div>
    )
}

types of hooks
-useState
-useEffect
-useNavigate
-useLocation
-useGoogleLogin
-useRef
-useContext

rules when useing hooks.
1.hook must be begining the function
ex- export default function App(){}
useState()

2.hook eka function ekakata 1kta wediyen danwnam okkoma eka piliwelat thiyenne ona
wena mukuth condition danna be, eka piliwelat okkoma run wenna ona

hook ekak dana widiya (useState import krgnna ona.)
function ekat pahalin const [a,b] = useState() a= variable ekak, b= function ekak
a varible ekat hema welema add venne useState() me warahan deka meda thiyena value eka

-serin sere wenas wena values thiyenm ewata useState ekak dla liygnne
ex- increment btn eka click krddi value eka wedi wenna ha decriment btn eka click krddi value eka aduwenna hadpu eka.



me code eken thamai increment decrement component eka heduwe analyse the code and understand
***const line ekai button 2i thamai hodtma blnna one thewa h1 ekai

import { useState } from "react"

export default function Test(){
    const [count,setCount] = useState(0) 
    return(
       
    <div className="w-full h-full bg-yellow-300 flex justify-center items-center ">
      <div className="w-[400px] h-[400px] bg-white flex items-center justify-center flex-col">
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
      </div>

    </div>
    )
}

pahatha code eken wenne sagala warahan deken ethule thiyena loku div eka x button eka click krama nethi wenna hdana eka. {isVisible && } meken ethule thiyena div kotasama
mektath useState use wenne, isVisible kiyla variable ekai setIsvisible kiyna function ekai x button ekei thiyena code hodta blanna

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

      {isVisible &&           <div className="w-[400px] h-[400px] bg-white flex items-center justify-center flex-col">
       
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
      </div>                }

    </div>
    )
}

okatama thawa button ekak (show) dala ekatath x button ekema settings dala false eka true krma
ara hide wena eka show krgn puluwan.


onClick = e btn eka ho link eka ho click krma wenna ona de kiyanna use krai.

*/