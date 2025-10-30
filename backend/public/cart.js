let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  const container = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="empty-cart">Your cart is empty!</p>
    `;
    totalPriceElement.innerText = "0";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-card">
        <img src="${item.img}" class="cart-thumb">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <div class="quantity-box">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  }).join("");

  totalPriceElement.innerText = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

updateCart();
