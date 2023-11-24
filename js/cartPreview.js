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

      const cellQty = row.insertCell(2);
      cellQty.innerHTML = `<p>Qty ${quantity}</p>  <span>€${(
        quantity * product.price
      ).toFixed(2)}</span><br><span>€${product.price}</span>`;
      //make it so the unite price will be under the qty and full price
      totalCartPrice = totalCartPrice + product.price * quantity;
    });

    // Add a row at the bottom for the total price
    const totalRow = tableBody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.colSpan = 4; // Span the entire row
    totalCell.innerHTML = `<div class="total" data-price="${totalCartPrice.toFixed(
      2
    )}"><p>Total Price:</p> <span>€${totalCartPrice.toFixed(2)}</span><p>+ €${(
      parseInt(totalCartPrice) +
      parseInt(totalCartPrice) * 0.025 +
      0.35 -
      parseInt(totalCartPrice)
    ).toFixed(2)}</p><hr><p>€${(
      parseInt(totalCartPrice) +
      parseInt(totalCartPrice) * 0.025 +
      0.35
    ).toFixed(2)}</p></div>`;
  }
}

// Call the renderProducts function when the page loads
document.addEventListener("DOMContentLoaded", renderProducts);
document.addEventListener("DOMContentLoaded", adjustPrice);
document.addEventListener("DOMContentLoaded", adjustPrice());

function adjustPrice() {
  const card = document.querySelectorAll("#card");
  const total = document.querySelector(".total");
  const checkout = document.querySelector(".cart-table");

  const totalprice = total.getAttribute("data-price");
  for (const radioButton of card) {
    radioButton.addEventListener("change", () => {
      console.log(radioButton.checked);
      if (radioButton.checked) {
        if (radioButton.getAttribute("data-method") == "1") {
          total.innerHTML = `<p>Total Price:</p> <span>€${parseInt(
            totalprice
          ).toFixed(2)}</span><p>+ €${(
            parseInt(totalprice) +
            parseInt(totalprice) * 0.025 +
            0.35 -
            parseInt(totalprice)
          ).toFixed(2)}</p><hr><p>€${(
            parseInt(totalprice) +
            parseInt(totalprice) * 0.025 +
            0.35
          ).toFixed(2)}</p>`;
          checkout.setAttribute("method", "card");
        }
        if (radioButton.getAttribute("data-method") == "2") {
          total.innerHTML = `<p>Total Price:</p> <span>€${parseInt(
            totalprice
          ).toFixed(2)}</span><p>+ €${(
            parseInt(totalprice) -
            parseInt(totalprice) +
            0.35
          ).toFixed(2)}</p><hr><p>€${(parseInt(totalprice) + 0.35).toFixed(
            2
          )}</p>`;
          checkout.setAttribute("method", "local");
        }
        if (radioButton.getAttribute("data-method") == "3") {
          total.innerHTML = `<p>Total Price:</p> <span>€${parseInt(
            totalprice
          ).toFixed(2)}</span><p>+ €${(
            parseInt(totalprice) +
            parseInt(totalprice) * 0.02 +
            0.1 -
            parseInt(totalprice)
          ).toFixed(2)}</p><hr><p>€${(
            parseInt(totalprice) +
            parseInt(totalprice) * 0.02 +
            0.1
          ).toFixed(2)}</p>`;
          checkout.setAttribute("method", "paypal");
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
  const totalprice = total.getAttribute("data-price");
  if (method == "card") {
    modal.innerHTML = `Payment method: Card/Link/Google/Apple<br><br><span>€${parseInt(
      totalprice
    ).toFixed(2)}</span><br>+ €${(
      parseInt(totalprice) +
      parseInt(totalprice) * 0.025 +
      0.35 -
      parseInt(totalprice)
    ).toFixed(2)}<hr> Total Price: <span>€${(
      parseInt(totalprice) +
      parseInt(totalprice) * 0.025 +
      0.35
    ).toFixed(2)}</span>`;
  }
  if (method == "local") {
    modal.innerHTML = `Payment method: Bancontact/iDeal<br><br><span>€${parseInt(
      totalprice
    ).toFixed(2)}</span><br>+ €${(
      parseInt(totalprice) +
      0.35 -
      parseInt(totalprice)
    ).toFixed(2)}<hr> Total Price: <span>€${(
      parseInt(totalprice) + 0.35
    ).toFixed(2)}</span>`;
  }
  if (method == "paypal") {
    modal.innerHTML = `Payment method: Paypal<br><br><span>€${parseInt(
      totalprice
    ).toFixed(2)}</span><br>+ €${(
      parseInt(totalprice) +
      parseInt(totalprice) * 0.02 +
      0.1 -
      parseInt(totalprice)
    ).toFixed(2)}<hr> Total Price: <span>€${(
      parseInt(totalprice) +
      parseInt(totalprice) * 0.02 +
      0.1
    ).toFixed(2)}</span>`;
  }
}

