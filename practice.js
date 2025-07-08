document.addEventListener('DOMContentLoaded',()=>{

    const products =[
        {name:"product-1",id:1,price:39.99},
        {name:"product-2",id:2,price:49.99},
        {name:"product-3",id:3,price:99.99}
    ];




 const productList=document.getElementById("product-list");
 const cartItems=document.getElementById("cart-items");
 const emptyCartMessage=document.getElementById("empty-cart");
 const CartTotal=document.getElementById("cart-total");
 const totalPrice=document.getElementById("total-price");
 const checkOutBtn=document.getElementById("checkout-btn");

 
 const carts = JSON.parse(localStorage.getItem("cart")) || [];
 renderCart();

 products.forEach(product=>{
   const prod1= document.createElement("div");
   prod1.classList.add("product");
   prod1.innerHTML=`
   <span>${product.name} - $${product.price.toFixed(2)}</span>
   <button data-id ="${product.id}">add to cart</button>
   `
   productList.appendChild(prod1);
 });
 productList.addEventListener('click',(e)=>{
    if(e.target.tagName === "BUTTON")
    {
       const proId = parseInt(e.target.getAttribute("data-id"));
       const pro =  products.find((p)=>p.id===proId);
       addToCart(pro);
    }
 });
function addToCart(product)
{
    carts.push(product);
    saveCart();
    renderCart();
}
function removeToCart(cartId)
{
    const index = carts.findIndex((p) => p.id === cartId);
    if(index!==-1)carts.splice(index,1);
    saveCart();
    renderCart();
}

function renderCart()
{
    cartItems.innerText= "";
  let TotalPrice = 0;
    if (carts.length > 0) {
      emptyCartMessage.classList.add("hidden");
      CartTotal.classList.remove("hidden");
      carts.forEach((cart) => {
        TotalPrice += cart.price;
        const ct = document.createElement("div");
        ct.classList.add("cart");
        ct.innerHTML = `
          <span>${cart.name} - $${cart.price.toFixed(2)}</span>
          <button cart-id="${cart.id}">remove</button>
          `;
        cartItems.appendChild(ct);
      });
      totalPrice.textContent = `${TotalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden"); // Show "Cart is empty" message
      totalPrice.textContent = `$0.00`; // Set total price to $0.00
    }
};
cartItems.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const cartId = parseInt(e.target.getAttribute("cart-id"));
    removeToCart(cartId);
  }
});
checkOutBtn.addEventListener("click", () => {
  carts.length = 0; // Clear the cart array
  localStorage.removeItem("cart");
  alert("Checkout successfully"); // Show confirmation popup
  renderCart(); // Re-render the cart to reflect changes
});

function saveCart()
{
  localStorage.setItem("cart",JSON.stringify(carts));
}

});