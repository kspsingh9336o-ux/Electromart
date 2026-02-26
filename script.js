// ------------------ User Cart & Products ----------------
let cart = [];
function loadProducts() {
  fetch("http://localhost:5000/products")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productList");
      if(!list) return;
      list.innerHTML = "";
      data.forEach(p => {
        list.innerHTML += `
          <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart('${p._id}','${p.name}',${p.price})">Add to Cart</button>
          </div>
        `;
      });
    });
}

function addToCart(id,name,price){ cart.push({id,name,price}); updateCart(); }
function updateCart(){ 
  const cartDiv = document.getElementById("cartList"); if(!cartDiv) return;
  let html=""; let total=0;
  cart.forEach(item => { html += `<li>${item.name} - ₹${item.price}</li>`; total+=item.price; });
  cartDiv.innerHTML = html;
  const totalDiv = document.getElementById("total"); if(totalDiv) totalDiv.innerText = total;
}
function placeOrder(){ if(cart.length==0){ alert("Cart empty!"); return; } alert("Order placed!"); cart=[]; updateCart(); }

// ------------------ User Login / Signup ----------------
function showLogin(){ document.getElementById("signupBox").style.display="none"; document.getElementById("loginBox").style.display="block"; }
function showSignup(){ document.getElementById("loginBox").style.display="none"; document.getElementById("signupBox").style.display="block"; }

function signup(){
  let name=document.getElementById("sname").value;
  let email=document.getElementById("semail").value;
  let pass=document.getElementById("spass").value;
  if(!name||!email||!pass){ alert("Fill all fields"); return; }
  localStorage.setItem("user",JSON.stringify({name,email,pass}));
  alert("Signup successful!"); showLogin();
}

function login(){
  let email=document.getElementById("lemail").value;
  let pass=document.getElementById("lpass").value;
  let user=JSON.parse(localStorage.getItem("user"));
  if(!user){ alert("No account"); return; }
  if(email===user.email && pass===user.pass){ alert("Login success"); window.location.href="index.html"; }
  else alert("Wrong credentials");
}

// ------------------ Admin Login ----------------
function adminLogin(){
  let email=document.getElementById("email").value;
  let pass=document.getElementById("pass").value;
  if(email==="admin@gmail.com" && pass==="12345"){ localStorage.setItem("admin","true"); window.location.href="admin-dashboard.html"; }
  else alert("Wrong admin credentials");
}

// ------------------ Admin Add Product ----------------
let products = JSON.parse(localStorage.getItem("products"))||[];
function addProduct(){
  let name=document.getElementById("pname").value;
  let price=document.getElementById("pprice").value;
  products.push({name,price});
  localStorage.setItem("products",JSON.stringify(products));
  showProducts();
}
function showProducts(){
  const list=document.getElementById("plist"); if(!list) return;
  list.innerHTML=""; products.forEach(p=>{ list.innerHTML+=`<li>${p.name} - ₹${p.price}</li>`; });
}
function logout() {
  localStorage.removeItem("isLogin");
  window.location.href = "login.html";
}
// SIGNUP
function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Signup successful!");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user found, please signup first");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("isLogin", "true");
    window.location.href = "index.html";   // ✅ NEXT PAGE OPEN
  } else {
    alert("Wrong email or password");
  }
}
