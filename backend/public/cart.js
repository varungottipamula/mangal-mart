// ✅ First-Time Cart Reset Check
if (!localStorage.getItem("cartInitialized")) {
  localStorage.setItem("cart", JSON.stringify([]));
  localStorage.setItem("cartInitialized", "yes");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Update Navbar Cart Count
function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (countElement) countElement.innerText = cart.reduce((a, b) => a + b.quantity, 0);
}

function updateCart() {
  const container = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  if (!container || !totalPriceElement) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty 🛒</p>
        <a href="products.html" class="btn continue-btn">Continue Shopping</a>
      </div>
    `;
    totalPriceElement.innerText = "0";
    updateCartCount();
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-card fade-in">
        <img src="${item.img}" class="cart-thumb">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price.toLocaleString("en-IN")}</p>

          <div class="quantity-box">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;
  }).join("");

  totalPriceElement.innerText = total.toLocaleString("en-IN");
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// ✅ Initialization
updateCart();
updateCartCount();
