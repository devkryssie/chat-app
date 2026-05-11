const register = document.getElementById("register");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const send = document.getElementById("send");

const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");

const auth = document.getElementById("auth");
const chatSection = document.getElementById("chatSection");

const chat = document.getElementById("chat");



let users =
  JSON.parse(localStorage.getItem("users")) || [];

let messages =
  JSON.parse(localStorage.getItem("messages")) || [];

let currentUser =
  JSON.parse(localStorage.getItem("currentUser"));




function renderMessages() {

  chat.innerHTML = "";


  messages.forEach((msg) => {

    if (msg.sender === currentUser.username) {

      chat.innerHTML += `

        <div class="flex justify-end mb-3">

          <div class="bg-blue-500 p-3 rounded-xl max-w-[70%]">

            <h1 class="font-bold text-sm text-[#d8e0eb]">
              You
            </h1>

            <p class="mt-2">
              ${msg.text}
            </p>

          </div>

        </div>

      `;

    } else {

      chat.innerHTML += `

        <div class="flex justify-start mb-3">

          <div class="bg-[#202c33] p-3 rounded-xl max-w-[70%]">

            <h1 class="font-bold text-sm text-[#0070fa]">
              ${msg.sender}
            </h1>

            <p class="mt-2">
              ${msg.text}
            </p>

          </div>

        </div>

      `;

    }

  });

}




function checkLogin() {

  if (currentUser) {

    auth.classList.add("hidden");

    chatSection.classList.remove("hidden");

    renderMessages();

  } else {

    auth.classList.remove("hidden");

    chatSection.classList.add("hidden");

  }

}




register.addEventListener("click", (e) => {

  e.preventDefault();




  if (
    username.value === "" ||
    password.value === ""
  ) return;




  let userExists = users.find((user) => {
    return user.username === username.value;
  });




  if (userExists) {
    alert("User already exists");
    return;
  }




  users.push({

    username: username.value,
    password: password.value

  });




  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );




  alert("Account Created");




  username.value = "";
  password.value = "";

});






login.addEventListener("click", (e) => {

  e.preventDefault();




  let foundUser = users.find((user) => {

    return (
      user.username === username.value &&
      user.password === password.value
    );

  });




  if (foundUser) {

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );




    currentUser = foundUser;




    checkLogin();

  } else {

    alert("Invalid Details");

  }

});






send.addEventListener("click", () => {

  if (message.value === "") return;




  messages.push({

    sender: currentUser.username,
    text: message.value

  });




  localStorage.setItem(
    "messages",
    JSON.stringify(messages)
  );




  renderMessages();




  message.value = "";

});






logout.addEventListener("click", () => {

  localStorage.removeItem("currentUser");

  currentUser = null;

  checkLogin();

});






window.addEventListener("storage", () => {

  messages =
    JSON.parse(localStorage.getItem("messages")) || [];

  renderMessages();

});




checkLogin();