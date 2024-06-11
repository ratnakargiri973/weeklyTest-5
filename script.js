//Dark Mode And Light Mode
const toggleTheam = document.getElementById("switch");
const body = document.body;
const cuurTheam = body.getAttribute('data-theam');
body.setAttribute('data-theam', "light");
localStorage.setItem('theam', "light");

toggleTheam.addEventListener("click", () => {
    const currTheam =localStorage.getItem('theam');
     const newTheam = currTheam === "dark" ? "light" : "dark";
     localStorage.setItem('theam', newTheam);
     body.setAttribute('data-theam', newTheam);
})

let arr = [];
let category = document.getElementById("category");
let des = document.getElementById("des");
let desarr = [];
let popup = document.getElementById("popup");
let popupContent = document.querySelector(".popup-body");
let closeBtn = document.querySelector(".close");

async function fetchCategoryList() {
  try {
    let res = await fetch("https://books-backend.p.goit.global/books/category-list");
    arr = await res.json();
    console.log(arr);
    arr.forEach((element) => {
      let p = document.createElement("p");
      p.className = "category";
      p.textContent = element.list_name;
      category.appendChild(p);
    });
  } catch {
    console.log("Error");
  }
}

async function fetchDescription() {
  try {
    let res = await fetch("https://books-backend.p.goit.global/books/top-books");
    desarr = await res.json();
    console.log(desarr);
    displayBestSellers(); 
  } catch {
    console.log("Error");
  }
}

function displayBestSellers() {
  des.innerHTML = '<h1>Best Sellers Books</h1><div id="bookCon"></div>';
  let bookCon = document.getElementById("bookCon");
  desarr.forEach((element) => {
    element.books.forEach((ele) => {
      let div = document.createElement("div");
      div.className = "book";
      div.innerHTML = `<img src="${ele.book_image}">
                       <p class="title">${ele.title}</p>
                       <p class="author">${ele.author}</p>`;
      bookCon.appendChild(div);
    
      div.addEventListener('click', () => showPopup(ele));
    });
  });
}

// let showbutton = document.createElement("div");
//       div.className="showbutton";
//       let showAllButton = document.createElement("button");
//         showAllButton.id = "showAllButton";
//         showAllButton.innerText = "Show All";
//       document.getElementById("showAllButton").addEventListener("click", function(){
//         showbutton.appendChild(showAllButton);
//         showbutton.style.display = "block";
//         showAllButton.addEventListener("click", function () {
//           showFullDetails(array);
//           // showbutton.remove();
//         });
//       })
       

// function showFullDetails(e){
//   if (e.target.classList.contains('category')) {
//     let selectedCategory = e.target.textContent;
//     let selectedElement = desarr.find(element => element.list_name === selectedCategory);

//     if (selectedElement) {
//       des.innerHTML = `<h1>${selectedCategory}</h1><div id="bookCon"></div>`;
//       let bookCon = document.getElementById("bookCon");
//       selectedElement.books.forEach((ele) => {
//         let div = document.createElement("div");
//         div.className = "book";
//         div.innerHTML = `<img src="${ele.book_image}">
//                          <p class="title">${ele.title}</p>
//                          <p class="author">${ele.author}</p>`;
//         bookCon.appendChild(div);
       
//         div.addEventListener('click', () => showPopup(ele));
//       });
//     }
//   }
// }

category.addEventListener("click", function (e) {
  if (e.target.classList.contains('category')) {
    let selectedCategory = e.target.textContent;
    let selectedElement = desarr.find(element => element.list_name === selectedCategory);

    if (selectedElement) {
      des.innerHTML = `<h1>${selectedCategory}</h1><div id="bookCon"></div>`;
      let bookCon = document.getElementById("bookCon");
      selectedElement.books.forEach((ele) => {
        let div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `<img src="${ele.book_image}">
                         <p class="title">${ele.title}</p>
                         <p class="author">${ele.author}</p>`;
        bookCon.appendChild(div);
       
        div.addEventListener('click', () => showPopup(ele));
      });
    }
  }
});

function showPopup(book) {
  popupContent.innerHTML = `<img src="${book.book_image}">
                            <h1>${book.title}</h1>
                            <p>${book.description}</p>`;
  popup.style.display = "block";
  document.body.classList.add("noscroll");
}

closeBtn.addEventListener('click', () => {
  popup.style.display = "none";
  document.body.classList.remove("noscroll");
});


window.addEventListener('click', (event) => {
  if (event.target == popup) {
    popup.style.display = "none";
    document.body.classList.remove("noscroll");
  }
});

document.getElementById("title").addEventListener("click", ()=>{
  window.location.reload();
})

fetchCategoryList();
fetchDescription();

// let registration_link = document.getElementById("registration-link");
// let login_link = document.getElementById("login-link");
// let logout_link = document.getElementById("logout-link");

// let registration_form = document.getElementById("registration-wrapper");
// let login_form = document.getElementById("login-wrapper");

// registration_link.addEventListener("click", function(event) {
//     event.preventDefault();
//     login_form.style.display = "none";
//     registration_form.style.display = "block";
// });

// login_link.addEventListener("click", function(event) {
//     event.preventDefault();
//     login_form.style.display = "block";
//     registration_form.style.display = "none";
// });

// document.getElementById("closeBtn").addEventListener("click", () => {
//     document.getElementById("container").style.display = "none";
// });

// logout_link.addEventListener("click", function(event) {
//     event.preventDefault();
//     logout();
// });

// // Sign Up Functionality
// let signUp = document.getElementById("registration-form");
// signUp.addEventListener("submit", (event) => {
//     event.preventDefault();
    
//     const username = document.getElementById('signUpUsername').value;
//     const email = document.getElementById('signUpEmail').value;
//     const password = document.getElementById('signUpPassword').value;
    
//     let users = JSON.parse(localStorage.getItem('users')) || {};

//     if (users[username] || Object.values(users).some(user => user.email === email)) {
//         alert('Username or Email already exists!');
//     } else {
//         users[username] = {email, password};
//         localStorage.setItem('users', JSON.stringify(users));
//         alert('Sign up successful!');
//         signUp.reset();
//     }
// });

// // Sign In Functionality
// let signIn = document.getElementById("login-form");
// signIn.addEventListener("submit", (event) => {
//     event.preventDefault();
//     // const username = document.getElementById('signInUsername').value;
//     const username = document.getElementById('signInUsername').value;
//     const password = document.getElementById('signInPassword').value;
    
//     let users = JSON.parse(localStorage.getItem('users')) || {};
    
//     if (users[username] && users[username].password === password) {
//         alert('Sign in successful!');
//         // signIn.innerText =  `${username}`;
//         sessionStorage.setItem('loggedInUser', username);
//         showLogout();
//         signIn.reset();
//         // window.location.assign("index.html");
//     } else {
//         alert('Invalid username or password!');
//         signIn.reset();
//     }
// });

// // Logout Functionality
// function showLogout() {
//     login_form.style.display = "none";
//     registration_form.style.display = "none";
//     login_link.style.display ="none";
//     registration_link.style.display = "none";
//     logout_link.style.display = "block";
// }

// function logout() {
//     sessionStorage.removeItem('loggedInUser');
//     logout_link.style.display = "none";
//     login_form.style.display = "block";
//     alert('Logged out successfully!');
//     // window.location.assign("index.html");
// }

// // Check if user is already logged in
// if (sessionStorage.getItem('loggedInUser')) {
//     showLogout();
// }