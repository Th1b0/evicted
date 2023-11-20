// Select all elements with the class "number-cart"
const cartNumberElements = document.querySelectorAll(".number-cart");

// Retrieve the total number of items from local storage
let totalCartItems = localStorage.getItem("totalItems");

// Define your products
const products = [
  // Your product details here...
];

// Initialize the cart number for each element
if (!totalCartItems) {
  totalCartItems = 0;
  cartNumberElements.forEach((element) => (element.textContent = 0));
} else {
  cartNumberElements.forEach(
    (element) => (element.textContent = totalCartItems)
  );
}

// Function to add items to the cart
function addToCart(id) {
  // Update the cart number for each element
  cartNumberElements.forEach((element) => {
    const oldNumber = parseInt(element.textContent);
    element.textContent = oldNumber + 1;
  });

  // Find the selected product
  const selectedProduct = products.find((product) => product.id === id);

  // Retrieve and update cart items in local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(selectedProduct);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update the total number of items in local storage
  localStorage.setItem("totalItems", parseInt(totalCartItems) + 1);
}

// Example usage
// addToCart("1"); // Call this function with the desired product ID
