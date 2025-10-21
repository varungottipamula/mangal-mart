const form = document.getElementById("add-product-form");
const productList = document.getElementById("admin-product-list");
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  productList.innerHTML = products.map((p, i) => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn" onclick="deleteProduct(${i})">Delete</button>
    </div>
  `).join("");
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = parseInt(document.getElementById("product-price").value);
  const img = document.getElementById("product-img").value;

  products.push({ name, price, img });
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  form.reset();
});

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

renderProducts();
