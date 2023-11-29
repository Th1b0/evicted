// Select all elements with the class "number-cart"
const cartNumberElements = document.querySelectorAll(".number-cart");

// Retrieve and calculate the total number of items from cart items in local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalCartItems = cartItems.reduce(
  (total, item) => total + parseInt(item.split("+")[1]),
  0
);

let Pmethod = "card";

const products = [
  {
    id: "1",
    desc: "Meet the Airpod Pro with ANC – 35dB noise cancellation, seamless iOS integration, and extended battery life.",
    name: "Airpod Pro",
    price: 54.99,
    img: "./img/airpods-32434.png",
  },
  {
    id: "2",
    desc: "Meet the Airpod Pro 2 with ANC – 35dB noise cancellation, seamless iOS integration, and extended battery life.",
    name: "Airpod Pro 2",
    price: 58.99,
    img: "./img/airpods-32434.png",
  },
  {
    id: "3",
    desc: "Meet the Airpod 3th Gen, seamless iOS integration.",
    name: "Airpod 3th Gen",
    price: 49.99,
    img: "./img/550x531-PhotoRoom.png-PhotoRoom.png",
  },
  {
    id: "4",
    desc: "Meet the Airpod 2th Gen, seamless iOS integration.",
    name: "Airpod 2th Gen",
    price: 44.99,
    img: "./img/550x531-PhotoRoom.png-PhotoRoom.png",
  },
];

// Initialize the cart number for each element
cartNumberElements.forEach((element) => (element.textContent = totalCartItems));

// Function to add items to the cart
function addToCart(id) {
  // Retrieve and update cart items in local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
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
  const totalCartItems = cartItems.reduce(
    (total, item) => total + parseInt(item.split("+")[1]),
    0
  );

  // Update the cart number for each element
  cartNumberElements.forEach((element) => {
    element.textContent = totalCartItems;
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  const currentPage = window.location.pathname;
  if (currentPage === "/cart.html" || currentPage === "/cart") {
    location.reload();
  }
  if (currentPage === "/" || currentPage === "/index.html") {
    location.href = "/cart.html";
  }
}

function removeFromCart(id) {
  const currentPage = window.location.pathname;
  if (currentPage === "/cart.html" || currentPage === "/cart") {
    location.reload();
  }

  // Retrieve and update cart items in local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingCartItemIndex = cartItems.findIndex((item) =>
    item.startsWith(id + "+")
  );

  if (existingCartItemIndex !== -1) {
    // If the product is in the cart, decrement its quantity
    const quantity = parseInt(cartItems[existingCartItemIndex].split("+")[1]);

    if (quantity > 1) {
      cartItems[existingCartItemIndex] = id + "+" + (quantity - 1);
    } else {
      // If quantity is 1, remove the item from the cart
      cartItems.splice(existingCartItemIndex, 1);
    }

    // Calculate the total number of items
    const totalCartItems = cartItems.reduce(
      (total, item) => total + parseInt(item.split("+")[1]),
      0
    );

    // Update the cart number for each element
    cartNumberElements.forEach((element) => {
      element.textContent = totalCartItems;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

function addToCartRedirect(id) {
  addToCart(id);
  location.href = "/cart.html";
}

function renderProducts() {
  // Check if the current page is /cart.html or /cart
  const currentPage = window.location.pathname;
  if (currentPage === "/cart.html" || currentPage === "/cart") {
    // Retrieve products from local storage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Create a reference to the table body
    const tableBody = document
      .getElementById("productTable")
      .getElementsByTagName("tbody")[0];

    // Clear existing table content
    tableBody.innerHTML = "";

    let totalCartPrice = 0;

    // Iterate through cart items and render product information in the table
    cartItems.forEach((cartItem) => {
      const [productId, quantity] = cartItem.split("+");
      const product = products.find((p) => p.id === productId);

      // Create a table row
      const row = tableBody.insertRow();

      // Insert cells with product information
      const cellImage = row.insertCell(0);
      const image = document.createElement("img");
      image.src = product.img;
      image.alt = product.name;
      image.style.width = "100px";
      cellImage.appendChild(image);

      const cellName = row.insertCell(1);
      cellName.textContent = `${product.name}`;
      const ProductPrice = product.price.toFixed(2);
      const cellQty = row.insertCell(2);
      cellQty.innerHTML = `<p class="qty"><span style="cursor:pointer;" onclick="removeFromCart(${productId})">-</span> Qty${quantity} <span style="cursor:pointer;" onclick="addToCart(${productId})">+</span></p><span>€${(
        quantity * product.price
      ).toFixed(2)}</span><br><p>€${ProductPrice}</p>`;

      totalCartPrice =
        totalCartPrice + parseFloat(ProductPrice) * parseInt(quantity);
    });

    // Add a row at the bottom for the total price
    const totalRow = tableBody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.colSpan = 4; // Span the entire row
    const fee = 35;
    const adjustedTotal =
      parseFloat(totalCartPrice) * 1.025 -
      parseFloat(totalCartPrice) +
      parseFloat(0.35);
    console.log(adjustedTotal);
    totalCell.innerHTML = `<div class="total" data-price="${totalCartPrice}"><p>Total Price:</p> <span>€${totalCartPrice.toFixed(
      2
    )}</span></div>`;
  }
}

// Call the renderProducts function when the page loads

document.addEventListener("DOMContentLoaded", renderProducts);
document.addEventListener("DOMContentLoaded", adjustPrice);

function adjustPrice() {
  const card = document.querySelectorAll("#card");
  const total = document.querySelector(".total");
  const checkout = document.querySelector(".cart-table");

  const totalprice = parseFloat(total.getAttribute("data-price")) * 100; // Convert to cents

  for (const radioButton of card) {
    console.log(checkout.getAttribute("method"));
    radioButton.addEventListener("change", () => {
      if (radioButton.checked) {
        if (radioButton.getAttribute("data-method") == "1") {
          Pmethod = "card";
        }
        if (radioButton.getAttribute("data-method") == "2") {
          Pmethod = "local";
        }
        if (radioButton.getAttribute("data-method") == "3") {
          Pmethod = "paypal";
        }
      }
    });
  }
}

function checkout() {
  const total = document.querySelector(".total");
  const checkout = document.querySelector(".cart-table");
  const method = checkout.getAttribute("method");
  const modal = document.querySelector(".output");
  const totalprice = parseFloat(total.getAttribute("data-price"));

  if (Pmethod == "card") {
    modal.innerHTML = `Payment method: Card/Link/Google/Apple/Klarna<br><br>Total: <span>€${totalprice.toFixed(
      2
    )}</span>`;
  }
  if (Pmethod == "local") {
    modal.innerHTML = `Payment method: Bancontact/iDeal<br><br>Total: <span>€${totalprice.toFixed(
      2
    )}</span>`;
  }
  if (Pmethod == "paypal") {
    modal.innerHTML = `Payment method: Paypal<br><br>Total: <span>€${totalprice.toFixed(
      2
    )}</span>`;
  }
}
function createStripeCheckout() {
  const checkout = document.querySelector(".checkout");
  const method = checkout.getAttribute("method");
  const itemsString = localStorage.getItem("cartItems");

  // Convert the items string into an array of objects
  const itemsArray = JSON.parse(itemsString);

  // Example items string: '["1+2","3+1"]'
  // Converted itemsArray: [{ productId: "1", quantity: 2 }, { productId: "3", quantity: 1 }]

  const itemsToSend = itemsArray.map((itemString) => {
    const [productId, quantity] = itemString.split("+");
    return { productId, quantity: parseInt(quantity) };
  });

  fetch("https://checkout.evicted.shop/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: itemsToSend, method: Pmethod }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Checkout session created:", data.sessionId);
      // Redirect to the checkout page using the returned session ID
      window.location.href = data.checkoutUrl;
    })
    .catch((error) => {
      console.error("Error creating checkout session:", error);
    });
}
