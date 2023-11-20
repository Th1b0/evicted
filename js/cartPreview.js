const cartNumber = document.querySelector(".number-cart");
let totalCartitems = localStorage.getItem("totalItems");

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

if (!totalCartitems) {
  totalCartitems = 0;
  cartNumber.textContent = 0;
} else {
  cartNumber.textContent = totalCartitems;
}

function addToCart(id) {
  const oldNumber = parseInt(cartNumber.textContent);
  cartNumber.textContent = oldNumber + 1;

  const selectedProduct = products.find((product) => product.id === id);

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(selectedProduct);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalItems", oldNumber + 1);
}
