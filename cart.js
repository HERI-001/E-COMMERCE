let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartItems);

let container = document.querySelector(".cartinside");
let totalPrice = 0;
let checkoutButton = document.querySelector("#checkout");

// Function to display cart items
function updateCartDisplay() {
  container.innerHTML = ""; // Clear previous content
  totalPrice = 0;

  cartItems.forEach((item, index) => {
    let mainDiv = document.createElement("div");
    mainDiv.style.backdropFilter = "20px";
    mainDiv.style.width = "80rem";
    mainDiv.className = "each";
    mainDiv.classList.add(
      "h-64",
      "border",
      "border-2",
      "flex",
      "items-center",
      "justify-between",
      "px-4"
    );

    let img = document.createElement("img");
    img.src = item.image;
    img.classList.add("h-24", "w-26");
    mainDiv.appendChild(img);

    let productName = document.createElement("p");
    productName.innerText = item.title;
    mainDiv.appendChild(productName);

    let price = document.createElement("p");
    price.innerText = `$${item.price}`;
    mainDiv.appendChild(price);

    let productQuantity = document.createElement("p");
    productQuantity.innerText = `Quantity: ${item.quantity}`;
    mainDiv.appendChild(productQuantity);

    // Display the sum for each item
    let sum = document.createElement("p");
    sum.innerText = `Total: $${item.price * item.quantity}`;
    mainDiv.appendChild(sum);

    // Remove One button to decrease quantity
    let removeOneBtn = document.createElement("button");
    removeOneBtn.innerText = "Remove One";
    removeOneBtn.addEventListener("click", () => {
      removeOneItem(index);
    });
    mainDiv.appendChild(removeOneBtn);

    container.appendChild(mainDiv);
    totalPrice += item.price * item.quantity;
  });

  // Only update the checkout button with the total price
  checkoutButton.innerText = `CHECK OUT -> ( $${totalPrice} )`;
}

// Remove one item by decreasing quantity
function removeOneItem(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  } else {
    cartItems.splice(index, 1); // Remove item if quantity is 1
  }
  updateLocalStorage();
  updateCartDisplay();
}

// Clear cart functionality
document.getElementById("removeCarts").addEventListener("click", () => {
  cartItems = [];
  updateLocalStorage();
  updateCartDisplay();
});

// Update localStorage with current cart items
function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

const initializeTransaction = async (email, amount) => {
  const response = await fetch(
    "https://api.budpay.com/api/v2/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer sk_test_vai5opzrc6arqxvnp55brnayanksdevm5ryihe6`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: amount.toString(),
        currency: "USD",
      }),
    }
  );

  return response;
};

const handleCheckOut = async () => {
  let amount = totalPrice;
  let email = "iyanuoluwajss3@gmail.com";
  let response = await initializeTransaction(email, amount);

  const data = await response.json();

  const authorization_url = data.data.authorization_url;
  // console.log(authorization_url);

  let url = decodeURI(authorization_url);
  console.log(url);

  window.open(url, "_blank");
};
checkoutButton.addEventListener("click", () => {
  handleCheckOut();
});
updateCartDisplay();
