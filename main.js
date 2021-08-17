fetch("https://warm-hamlet-31837.herokuapp.com/get-product/")
.then(res => res.json())
.then(data => {
  console.log(data);
})

console.log(document.querySelector(".welcome"));
let welcomeName = document.querySelector(".welcome");

function toggleNavbar() {
  document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
}

let loginButton = document.querySelector(".but1");
let form = document.querySelector(".form");
console.log(form);

function login(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://warm-hamlet-31837.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        myStorage.setItem("password", password);
        window.location.href = "./products.html";
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  login(username, password);
});

welcomeName.innerHTML = "Welcome " + username;


function toggledeleteProduct(index) {
  console.log(index);
  // http://127.0.0.1:5000/delete-product/${index}/
  let delConfirm = confirm("Are you sure you want to delete this product?");
  if (delConfirm) {
    fetch(`http://127.0.0.1:5000/delete-product/${index}/`);
    createCards();
  }
}

let cart = [];

let item_container = document.querySelector(".items");

fetch("http://127.0.0.1:5000/get-product/").then((request) => {
  request.json().then((obj) => {
    // console.log(obj);
    data = obj.data;
    // console.log(data);
    item_container.innerHTML = ``;
    let index = 0;
    data.forEach((product) => {
      item_container.innerHTML += `<div class="item">
         <p class="product-name">Name: ${product[1]}</p>
         <p class="product-price">Price: ${product[2]}</p>
         <p class="product-description">Description: ${product[3]}</p>
         <button onclick="addToCart(${product[0]})" class="add add-${product[0]}">Add to cart</button>
     </div>`;
      //   console.log(index);
      index++;
    });
  });
});

function toggleaddToCart(id) {
  cart.push(id);
    console.log(cart);
  let product = products.find(item => {
  return `.add-${id}`});
  //   console.log(add_btn);
  populateCart();
}

function toggleshowCart() {
  document.querySelector(".cart").classList.toggle("active");
}

function populateCart() {
  fetch("http://127.0.0.1:5000/get-products/").then((request) => {
    request.json().then((obj) => {
      //   console.log(obj);
      data = obj.data;
      let cart_container = document.querySelector(".cart");
      let total_cost = 0;
      //   let total = 0;
      cart_container.innerHTML = ``;
      cart.forEach((order) => {
        // console.log(order);
        data.forEach((product) => {
          if (product[0] == order) {
            // console.log(product);
            total_cost += parseFloat(product[2]);
            cart_container.innerHTML += `<div class="cart-item">
            <p class="id">${product[0]}</p>
            <p class="name">${product[1]}</p>
            <p class="price">${product[2]}</p>
            <p class="quantity">1</p>
          </div>`;
          }
        });
      });
    });
  });
}