let globalBackend = [];
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
            <input id ="emailLogin" class="inputfield" type="email" placeholder="Email">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="passwordLogin" class="inputfield" type="password" placeholder="Password">
            <img id="passwordIcon" class="inputIcon" src="./assets/img/lock.svg" alt="">
          </div>
          <span id="loginErrorMsg" class="formValidation dNone">Check your email and password. Please try again.</span>
          <div class="buttonWrapper">
            <button class="button loginButton">Log in</button>
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
 false
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
        <form onsubmit="">
          <div class="inputWrapper">
            <input id="name" class="inputfield" type="text" placeholder="Name">
            <img class="inputIcon" src="./assets/img/person.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="email" class="inputfield" type="email" placeholder="Email">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="password" class="inputfield" type="password" placeholder="Password">
            <img class="inputIcon" src="./assets/img/lock.svg" alt="">
          </div>
          <div class="inputWrapper">
            <input id="passwordCheck" class="inputfield" type="password" placeholder="Confirm Password">
            <img class="inputIcon" src="./assets/img/lock.svg" alt="">
          </div>
          <div class="checkPrivacyPolicy">
            <input id="checkbox" class="checkbox" type="checkbox">
            <span>I accept the <span class="hightlight">Privacy Policy</span> </span>
          </div>
          <div class="buttonWrapper">
            <a class="button signUpButton">Sign up</a>
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

function login() {
  let email = document.getElementById("emailLogin");
  let password = document.getElementById("passwordLogin");
  let passwordIcon = document.getElementById("passwordIcon");
  
  globalBackend.push({
    email: email.value,
    password: password.value
  })

  email.value = "";
  password.value = "";
  console.log(globalBackend);
  
}


 


