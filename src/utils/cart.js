export  function GetCart(){
    const cartString = localStorage.getItem("cart") //local storage ekethiyena cart data load krgtha.

    if(cartString == null){
        localStorage.getItem("cart", "[]") //local storage eke cart data nethan empty array ekak string wlt covert krpu return krgnno
        return[]
    }else{
        const cart = JSON.parse(cartString) //string eka json array ekakata convert krgta
        return cart;
    
    }
}


const sampleCart = [
    {
        products : {
        productId :"12345",
        name :"Product 01",
        labelledPrice : 1000,
        price: 8000,
        image : "https://vis.placeholder.com/150" ,},
        qty: 2
    },

    {
       products : { 
        productId :"12345",
        name : "Product 01",
        labelledPrice : 1000,
        price: 8000,
        image : "https://via.placeholder.com/150",},

        qty: 2
    }
];

export function addToCart(products, qty){
    const cart = GetCart();
    const existingProductIndex = cart.findIndex(
        (item)=>{
            return item.products.productId == products.productId //item eke thiyena prod id eka me thebili pata products eken ena prod id ekt samana da blano

        }
    );
    if(existingProductIndex == -1){
        if(qty <=0){
            console.error("Quantity must be greater than 0")
            return;
        }
        cart.push({
            products : {
                productId : products.productId,
                name : products.name,
                labelledPrice : products.labelledPrice,
                price : products.price,
                image : products.images[0]

            } , qty : qty
        })
    } else {
        const newQty = cart[existingProductIndex].qty + qty
        if(newQty <=0){
            cart.splice(existingProductIndex, 1) //remove products from cart 1 demme array eken ekak witrk adu wenna ona nisa.
        } else {
            cart[existingProductIndex].qty = newQty
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart" , cartString);

    return cart;

}


export function getCartTotal(cart){
    let total = 0
    cart.forEach(
        (cartItem)=>{
            total += cartItem.products.price * cartItem.qty;
        }
    )
    return total;
}
