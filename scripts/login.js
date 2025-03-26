let globalBackend = [
  {
    users: [
      {
        name: "Daniel",
        email: "daniel@dev.com",
        password: "Test123",
        confirmedPassword: "Test123"
      },
      {
        name: "Oliver",
        email: "oliver@dev.com",
        password: "!DevTest",
        confirmedPassword: "!DevTest"
      },
      {
        name: "Kevin",
        email: "kevin@dev.com",
        password: "K.dev!!",
        confirmedPassword: "K.dev!!"
      }
    ]
  }
];
/**
 * Initializes the user interface by displaying the login template.
 */
function init() {
  updateContent("login");
}

/**
 * Updates the content area by switching between login and sign-up templates.
 * 
 * @param {string} section - The section to display ("login" or "signUp").
 */
function updateContent(section) {
  let contentWrapper = document.getElementById("contentWrapper");
  contentWrapper.innerHTML = "";
  
  switch(section) {
    case "login":
      contentWrapper.innerHTML = loginTemplate();
      break;
    case "signUp":
      contentWrapper.innerHTML = signUpTemplate();
      break;
    default:
  }
}

/**
 * Generates the HTML template for the login form.
 * 
 * @returns The HTML string for the login section.
 */
function loginTemplate() {
  return `
    <img class="heroLogo" src="./assets/img/joinLogoSmall.svg" alt="">
    <header class="signUpHeroContainer">
      <span class="signUpText">Not a Join user?</span>
      <button onclick="updateContent('signUp')" class="button signUpButton">Sign up</button>
    </header>
    <main id="contentLogin" class="contentLogin">
      <div class="loginContainer">
        <h2>Log in</h2>
        <hr class="hr">
        <form onsubmit="login(event); return false">
          <div class="inputWrapper">
            <input id="emailLogin" class="inputfield" type="email" placeholder="Email" oninput="toggleLoginButton()">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="passwordLogin" class="inputfield" type="password" placeholder="Password" oninput="toggleLoginButton()">
            <img id="passwordIcon" class="inputIcon password" src="./assets/img/lock.svg" alt="">
            <span id="errorMsgLogin" class="errorMsgPassword hide">Check your email and password. Please try again.</span>
          </div>
          <div class="buttonWrapper">
            <button disabled  type="submit" id="loginButton" class="button loginButton">Log in</button>
            <a class="button guestLoginButton" href="summary.html">Guest Log in</a>
          </div>
        </form>
      </div>
    </main>
    <footer class="legalLinks">
      <span class="privacyPolicy">Privacy Policy</span>
      <span class="legalNotice">Legal notice</span>
    </footer>
  `
}
 
function login(event) {
  event.preventDefault();
  verifyLogin();
}

function verifyLogin() {
  let email = document.getElementById("emailLogin").value.trim();
  let password = document.getElementById("passwordLogin").value.trim();
  let users = globalBackend.flatMap(obj => obj.users);
  let user = users.find(user => user.email === email && user.password === password);
  let error = document.getElementById("errorMsgLogin");

  if(user) {
    hideLoginErrorMessage(error)
    window.location.href = "summary.html";
  } else {
    document.getElementById("passwordLogin").value = "";
    showLoginErrorMessage(error);
    setTimeout(function() {
      hideLoginErrorMessage(error)
    }, 3500)
  }
  return;
}

function toggleLoginButton() {
  let email = document.getElementById("emailLogin").value.trim();
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let password = document.getElementById("passwordLogin").value.trim();
  let loginButton = document.getElementById("loginButton");
  
  if(pattern.test(email)) {
    if(email.length > 0 && password.length > 3) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }
}

function showLoginErrorMessage(error) {
    error.textContent = "Check your email and password. Please try again.";
    error.classList.remove("hide");
    document.getElementById("emailLogin").classList.add("redBorder");
    document.getElementById("passwordLogin").classList.add("redBorder");
    return false;
}

function hideLoginErrorMessage(error) {
  error.classList.add("hide");
  error.classList.remove("show");
  document.getElementById("emailLogin").classList.remove("redBorder");
  document.getElementById("passwordLogin").classList.remove("redBorder");
  return true;
}




