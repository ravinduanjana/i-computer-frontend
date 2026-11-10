//product tika pennanna card ekak hadagenima mehidi function eka capital akurakinma ptangnna ona.

export default function ProductCard(props){
console.log(props);
    return(
//div eka atule hadana me card apita awshya thenadi function eka call krala show krnna puluwan.
        <div>
            <h2>{props.name}</h2> {/* <h2></h2> mewage tags html eka atule liyna props.name js. html atule js liyaddi {}  yodai. js atule niknma html liuwata, html atule js liyanna nam {} dannama one */}
            <img src= {props.image} className="border-4 "/>
            <p>price:{props.price}</p>
            <button>buy now</button>
        </div>
    ) 
    
}