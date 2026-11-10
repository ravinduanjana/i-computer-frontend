import ProductCard from "./produtCard";

export default function OnSaleNow(){
    return(

        <div> {/* java script wala class kiyla key word ekak thiyen nisa react waladi class wenuwta className kiyl ganna */}
                <h2>On sale now!</h2>
          
        <ProductCard
      name = "macbook air"
      image ="https://th.bing.com/th/id/OIP.Zu4UlfnziQSpd2a79GVQZAHaEK?w=303&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
      price="999$"
      />            {/*me widiyata liuwath werdi ne <ProductCard></ProductCard> = <ProductCard/>  */}  {/* shift+alt+a = use for comment */}
      <ProductCard
      name="iphone"
      image ="https://th.bing.com/th/id/OIP.b6yI5vO4G8QbUxvhsAYu-wHaHa?w=184&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
      price="659$"/>


      <ProductCard
      name="air pod"
      image ="https://th.bing.com/th/id/OIP.fZxWfg6zAfUS_CtNJBtYhAHaEK?w=296&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
      price="245$"
      />


        </div>
    )
}