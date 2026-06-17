// LOAD CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ADD TO CART
function addToCart(id, name, price) {
  price = Number(price);

  let item = cart.find(p => p.id === id);

  if (item) {
    item.quantity = Number(item.quantity) + 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1
    });
  }

  saveCart();
}

// UPDATE CART COUNT
function updateCartCount() {
  let total = 0;

  cart.forEach(item => {
    total += Number(item.quantity);
  });

  document.querySelectorAll("#cart-count, .cart-count-navbar")
    .forEach(el => el.textContent = total);
}

// DISPLAY CART ITEMS
function displayCartItems() {
  let container = document.getElementById("cart-items");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-center'>Your cart is empty</p>";
    return;
  }

  cart.forEach(item => {
    container.innerHTML += `
      <div class="card p-3 mb-3 shadow-sm">
        <h5>${item.name}</h5>
        <p>Price: ₦${item.price.toLocaleString()}</p>
        <p>Quantity: ${item.quantity}</p>
        <p><strong>Total: ₦${(item.price * item.quantity).toLocaleString()}</strong></p>

        <button class="btn btn-sm btn-success" onclick="increaseQty('${item.id}')">+</button>
        <button class="btn btn-sm btn-warning" onclick="decreaseQty('${item.id}')">-</button>
        <button class="btn btn-sm btn-danger" onclick="removeItem('${item.id}')">Remove</button>
      </div>
    `;
  });

  container.innerHTML += `
    <hr>
    <h4 class="text-end">
      Grand Total: ₦${getTotal().toLocaleString()}
    </h4>
  `;
}

// TOTAL CALCULATION
function getTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

// INCREASE
function increaseQty(id) {
  let item = cart.find(p => p.id === id);
  if (item) item.quantity++;

  saveCart();
  displayCartItems();
}

// DECREASE
function decreaseQty(id) {
  let item = cart.find(p => p.id === id);

  if (item) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }

  saveCart();
  displayCartItems();
}

// REMOVE
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  displayCartItems();
}

// ⭐ WHATSAPP CHECKOUT (NEW ADDITION)
function checkoutWhatsApp() {
  let name = document.getElementById("custName")?.value;
  let address = document.getElementById("custAddress")?.value;

  if (!name || !address) {
    alert("Please enter your name and address");
    return;
  }

  let message = "Hello, I want to order:%0A%0A";

  cart.forEach(item => {
    message += `${item.name} x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}%0A`;
  });

  message += `%0AName: ${name}%0AAddress: ${address}%0A%0ATotal: ₦${getTotal().toLocaleString()}`;

  let phone = "2347036392420";

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function sendToWhatsApp() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let phoneNumber = "2347036392420";

    let url = "https://wa.me/" + phoneNumber + "?text="
    + "Full Name: " + encodeURIComponent(name) + "%0a"
    + "Email: " + encodeURIComponent(email) + "%0a"
    + "Message: " + encodeURIComponent(message);

    window.open(url, "_blank");
}

// RUN ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  displayCartItems();

});