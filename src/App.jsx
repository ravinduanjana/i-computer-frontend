import OnSaleNow from "./components/onSaleNow"
import ProductCard from "./components/produtCard"
import UserData from "./components/userData"


export default function App() {
  

  return (
    <div className = "bg-blue-400 border-8 border-b-blue-900  "> {/* bg- type krla ctrl ekai space ekai gehuwma colors list ekak eno eken kemthi tika toragnna, index.css eke hadpu class me wage space thiya thiya dala me adala div eka customise krgnna puluwan */}
      <UserData/>
      <OnSaleNow/>
    
    </div>
  );
}

