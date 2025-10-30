const form = document.getElementById("add-product-form");
const productList = document.getElementById("admin-product-list");

let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

function renderProducts() {
  productList.innerHTML = products
    .map(
      (p, i) => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p><strong>${p.category.toUpperCase()}</strong></p>

      <button class="btn edit-btn" onclick="editProduct(${i})">Edit</button>
      <button class="btn delete-btn" onclick="deleteProduct(${i})">Delete</button>
    </div>
  `
    )
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = parseInt(document.getElementById("product-price").value);
  const category = document.getElementById("product-category").value;
  const img = document.getElementById("product-img").value.trim();

  const productData = { name, price, category, img };

  if (editIndex !== null) {
    products[editIndex] = productData;
    editIndex = null;
  } else {
    products.push(productData);
  }

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  form.reset();
});

function editProduct(i) {
  const p = products[i];
  document.getElementById("product-name").value = p.name;
  document.getElementById("product-price").value = p.price;
  document.getElementById("product-category").value = p.category;
  document.getElementById("product-img").value = p.img;
  editIndex = i;
}

function deleteProduct(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

renderProducts();
