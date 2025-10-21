// -------------------------------
// Initialize cart safely
// -------------------------------
let cart = JSON.parse(localStorage.getItem("cart"));
if (!Array.isArray(cart)) cart = [];

const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

// -------------------------------
// Render cart items
// -------------------------------
function renderCart() {
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        totalPriceEl.textContent = "0";
        localStorage.setItem("cartTotal", "0");
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-info">
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
            </div>
            <button class="btn remove-btn" data-index="${index}">Remove</button>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
    totalPriceEl.textContent = total;

    // Save current total for checkout
    localStorage.setItem("cartTotal", total);
}

renderCart();

// -------------------------------
// Remove item from cart
// -------------------------------
document.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }
});
