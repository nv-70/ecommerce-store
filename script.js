// Waits until the HTML document is fully loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  // Define a list of available products with unique IDs, names, and prices
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 }, // 59.999 will be shown as 60.00
  ];

  // Initialize an empty shopping cart array to store selected products
  const cart = [];

  // Get references to various DOM elements used in the app
  const productList = document.getElementById("product-list"); // Container to display products
  const cartItems = document.getElementById("cart-items"); // Container to display cart items
  const emptyCartMessage = document.getElementById("empty-cart"); // Message shown when cart is empty
  const cartTotalMessage = document.getElementById("cart-total"); // Container for total section
  const totalPriceDisplay = document.getElementById("total-price"); // Element to show total price
  const checkOutBtn = document.getElementById("checkout-btn"); // Button for checkout action

  // Dynamically generate and display each product on the page
  products.forEach((product) => {
    const productDiv = document.createElement("div"); // Create a new div for the product
    productDiv.classList.add("product"); // Add a CSS class for styling
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `; // Add product name, price, and an "Add to cart" button
    productList.appendChild(productDiv); // Add the product to the product list container
  });

  // Event delegation: listen for button clicks inside the product list container
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Check if a button was clicked
      const productId = parseInt(e.target.getAttribute("data-id")); // Get product ID from button
      const product = products.find((p) => p.id === productId); // Find the product in the array
      addToCart(product); // Add the product to the cart
    }
  });

  // Function to add a product to the cart array
  function addToCart(product) {
    cart.push(product); // Add the selected product to the cart
    renderCart(); // Re-render the cart UI with updated items
  }

  // Function to update the cart display and total price
  function renderCart() {
    cartItems.innerText = ""; // Clear previous cart display
    let totalPrice = 0; // Initialize total price to 0

    if (cart.length > 0) {
      // If there are items in the cart
      emptyCartMessage.classList.add("hidden"); // Hide the "Cart is empty" message
      cartTotalMessage.classList.remove("hidden"); // Show total section

      cart.forEach((item) => {
        // Loop through all cart items
        totalPrice += item.price; // Accumulate total price
        const cartItem = document.createElement("div"); // Create div for each cart item
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
        `; // Set the item content with name and price
        cartItems.appendChild(cartItem); // Add item to the cart UI
      });

      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`; // Update total price in UI
    } else {
      emptyCartMessage.classList.remove("hidden"); // Show "Cart is empty" message
      totalPriceDisplay.textContent = `$0.00`; // Set total price to $0.00
    }
  }

  // Handle checkout button click
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0; // Clear the cart array
    alert("Checkout successfully"); // Show confirmation popup
    renderCart(); // Re-render the cart to reflect changes
  });
});
