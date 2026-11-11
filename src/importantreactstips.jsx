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














*/