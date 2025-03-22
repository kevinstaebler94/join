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
      console.error(`Unknown section: ${section}`);
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
        <form onsubmit="login(); return false">
          <div class="inputWrapper">
            <input id="emailLogin" class="inputfield" type="email" placeholder="Email">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="passwordLogin" class="inputfield" type="password" placeholder="Password">
            <img id="passwordIcon" class="inputIcon password" src="./assets/img/lock.svg" alt="">
          </div>
          <span id="loginErrorMsg" class="formValidation dNone">Check your email and password. Please try again.</span>
          <div class="buttonWrapper">
            <button disabled type="button" id="loginButton" class="button loginButton">Log in</button>
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
 
/**
 * Generates the HTML template for the sign-up form.
 * 
 * @returns The HTML string for the sign-up section.
 */
function signUpTemplate() {
  return `
    <img class="heroLogo" src="./assets/img/joinLogoSmall.svg" alt="">
    <main id="contentSignUp" class="contentSignUp">
      <div class="signUpContainer">
        <img onclick="updateContent('login')" class="returnArrow" src="./assets/img/returnArrow.svg" alt="">  
        <h2>Sign up</h2>
        <hr class="hr">
        <form onsubmit="signUp(event)"; return false">
          <div class="inputWrapper">
            <input id="name" class="inputfield" type="text" placeholder="Name" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/person.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="email" class="inputfield" type="email" placeholder="Email" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="password" class="inputfield password" type="password" placeholder="Password" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/lock.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="confirmedPassword" class="inputfield password" type="password" placeholder="Confirm Password" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/lock.svg" alt="">
            <span id="errorMsgPassword" class="errorMsgPassword dNone">Your passwords don't match. Please try again.</span>
          </div>
          <div class="checkPrivacyPolicy">
            <input id="checkbox" class="checkbox" type="checkbox" onchange="toggleSignUpButton()">
            <span>I accept the <span class="hightlight">Privacy Policy</span> </span>
          </div>
          <div class="buttonWrapper">
            <button disabled id="signUpButton" class="button signUpButton">Sign up</button>
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

function signUp(event) {
  event.preventDefault();
  validatesPasswords();
}

function toggleSignUpButton() {
  let name = document.getElementById("name").value;
  validateEmail();
  let checkbox = document.getElementById("checkbox").checked;

  if(name && validateEmail() && checkbox) {
    document.getElementById("signUpButton").disabled = false;
  } else {
    document.getElementById("signUpButton").disabled = true;
  }
}

function validateEmail() {
  let email = document.getElementById("email").value;
    return email.includes("@");
}

function validatesPasswords() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  let errorMsgPassword = document.getElementById("errorMsgPassword");
  if(password.value === confirmedPassword.value) {
    errorMsgPassword.classList.remove("dFlex");
    password.classList.remove("redBorder");
    confirmedPassword.classList.remove("redBorder");
    window.location.href = "login.html";
  } else {
    errorMsgPassword.classList.add("dFlex");
    password.classList.add("redBorder");
    confirmedPassword.classList.add("redBorder");
    clearPasswordInput(password, confirmedPassword, errorMsgPassword);
  }
}

function clearPasswordInput(password, confirmedPassword, errorMsgPassword) {
  document.getElementById("checkbox").checked = false;
  document.getElementById("signUpButton").disabled = true;

  password.value = "";
  confirmedPassword.value = "";

  setTimeout(function() {
    password.classList.remove("redBorder");
    confirmedPassword.classList.remove("redBorder");
    errorMsgPassword.classList.remove("dFlex");
    errorMsgPassword.classList.add("dNone");
  }, 2000);
  return
}


 



