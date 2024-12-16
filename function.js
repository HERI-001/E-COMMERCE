let num = document.querySelector("#num");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Initialize cart from localStorage
let cartLength = cart.length;
num.innerText = cartLength;

async function getAllCategory() {
  let response = await fetch("https://fakestoreapi.com/products/categories");
  let categories = await response.json();
  return categories;
}

async function getAllProduct() {
  let response = await fetch("https://fakestoreapi.com/products");
  let products = await response.json();
  return products;
}

async function main() {
  let categories = await getAllCategory();
  let sidebar = document.querySelector(".side-bar");

  categories.forEach((category) => {
    let div = document.createElement("div");
    div.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    sidebar.appendChild(div);
  });

  let products = await getAllProduct();
  let mainContent = document.querySelector(".main-content");

  products.forEach((product) => {
    let productsDiv = document.createElement("div");
    productsDiv.classList.add("product-card");

    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.style.height = "7rem";
    productImage.style.width = "7rem";
    productImage.addEventListener("click", () => {
      console.log("hello");
      window.location.href = `product.html?id=${product.id}`;
    });
    productsDiv.appendChild(productImage);

    let showTitle = document.createElement("p");
    showTitle.innerText = product.title;
    showTitle.addEventListener("click", () => {
      console.log("hello");
      window.location.href = `product.html?id=${product.id}`;
    });
    productsDiv.appendChild(showTitle);

    let showPrice = document.createElement("p");
    showPrice.innerText = `$${product.price.toFixed(2)}`;
    productsDiv.appendChild(showPrice);

    let ratingDiv = document.createElement("p");
    ratingDiv.style.display = "flex";
    ratingDiv.style.flexDirection = "row";
    ratingDiv.style.alignItems = "center";
    ratingDiv.style.gap = "0.5rem";

    let fullStars = Math.round(product.rating.rate);
    let totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      let star = document.createElement("span");
      star.className = "fa fa-star";

      star.style.color = i <= fullStars ? "#f5b301" : "#ccc";
      // star.style.display = "flex";
      ratingDiv.appendChild(star);
    }
    let count = document.createElement("p");
    count.innerText = `( ${product.rating.count} )`;
    ratingDiv.appendChild(count);
    productsDiv.appendChild(ratingDiv);

    let buyButton = document.createElement("button");
    buyButton.classList.add("product-button");
    buyButton.innerText = "Buy Now";

    buyButton.addEventListener("click", () => {
      let itemExists = cart.find((item) => item.id == product.id);
      if (itemExists) {
        itemExists.quantity = itemExists.quantity + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
        cartLength = cart.length;
        num.innerText = cartLength;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      num.innerText = cart.length;
    });
    // getProductByCategory.appendChild(productsDiv);

    productsDiv.appendChild(buyButton);
    mainContent.appendChild(productsDiv);
  });
}

main();
