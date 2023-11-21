// Select all elements with the class "number-cart"
const cartNumberElements = document.querySelectorAll(".number-cart");

// Retrieve and calculate the total number of items from cart items in local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalCartItems = cartItems.reduce(
  (total, item) => total + parseInt(item.split("+")[1]),
  0
);

const products = [
  {
    id: "1",
    desc: "Meet the Airpod Pro with ANC – 35dB noise cancellation, seamless iOS integration, and extended battery life.",
    name: "Airpod Pro",
    price: 54.99,
  },
  {
    id: "2",
    desc: "Meet the Airpod Pro 2 with ANC – 35dB noise cancellation, seamless iOS integration, and extended battery life.",
    name: "Airpod Pro 2",
    price: 58.99,
  },
  {
    id: "3",
    desc: "Meet the Airpod 3th Gen, seamless iOS integration.",
    name: "Airpod 3th Gen",
    price: 49.99,
  },
  {
    id: "4",
    desc: "Meet the Airpod 2th Gen, seamless iOS integration.",
    name: "Airpod 2th Gen",
    price: 44.99,
  },
];
// Initialize the cart number for each element
cartNumberElements.forEach((element) => (element.textContent = totalCartItems));

// Function to add items to the cart
function addToCart(id) {
  // Find the selected product
  const selectedProduct = products.find((product) => product.id === id);

  // Retrieve and update cart items in local storage
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingCartItemIndex = cartItems.findIndex((item) =>
    item.startsWith(id + "+")
  );

  if (existingCartItemIndex !== -1) {
    // If the product is already in the cart, update its quantity
    const quantity =
      parseInt(cartItems[existingCartItemIndex].split("+")[1]) + 1;
    cartItems[existingCartItemIndex] = id + "+" + quantity;
  } else {
    // If the product is not in the cart, add it
    cartItems.push(id + "+1");
  }

  // Calculate the total number of items
  totalCartItems = cartItems.reduce(
    (total, item) => total + parseInt(item.split("+")[1]),
    0
  );

  // Update the cart number for each element
  cartNumberElements.forEach((element) => {
    element.textContent = totalCartItems;
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
