// const params = new URLSearchParams(window.location.search);

// let id = params.get("id");
// console.log(id);
// // let goodsInfo = async () => {};

// // let num = document.querySelector("#num");
// // num.innerText = cart.length;
// // location.reload()

// fetch(`https://fakestoreapi.com/products/${id}`)
//   .then((response) => response.json())
//   .then((product) => {
//     let productImage = document.createElement("img");
//     productImage.src = product.image;
//     productImage.style.height = "7rem";
//     productImage.style.width = "7rem";
//     image.src = product.image;
//     imageDiv.appendChild(image);
//   });
let num = document.querySelector("#num");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Initialize cart from localStorage
let cartLength = cart.length;
num.innerText = cartLength;

const params = new URLSearchParams(window.location.search);
let id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    // Display product image
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.style.height = "22rem";
    productImage.style.width = "20rem";

    // Assuming you have a container for the image
    let imageDiv = document.querySelector("#imageDiv");
    imageDiv.appendChild(productImage);

    // Display product title
    let title = document.createElement("h2");
    title.className = "title-div";
    title.innerText = product.title;

    // Display product price
    let price = document.createElement("p");
    price.className = "price-name";
    price.style.marginTop = "1rem";
    price.innerText = `Price: $${product.price}`;

    // Display product description
    let description = document.createElement("p");
    description.className = "description";
    description.innerText = `Description: ${product.description}`;

    let ratingDiv = document.createElement("div");
    ratingDiv.style.display = "flex";
    ratingDiv.style.flexDirection = "row";
    ratingDiv.style.gap = "0.5rem";
    ratingDiv.style.marginTop = "1rem";

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
    count.innerText = `( ${product.rating.count} verified ratings )`;
    count.style.color = "white";
    ratingDiv.appendChild(count);

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

    // ratingDiv.appendChild(count);
    // productsDiv.appendChild(ratingDiv);
    // Assuming you have a container div to append these details
    let detailsDiv = document.querySelector("#detailsDiv");
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(description);
    // detailsDiv.appendChild(rating);
    detailsDiv.appendChild(ratingDiv);
    detailsDiv.appendChild(buyButton);
  })
  .catch((error) => {
    console.error("Error fetching product:", error);
  });
