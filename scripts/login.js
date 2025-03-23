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
        <form onsubmit="login(); return false">
          <div class="inputWrapper">
            <input id="emailLogin" class="inputfield" type="email" placeholder="Email">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="passwordLogin" class="inputfield" type="password" placeholder="Password">
            <img id="passwordIcon" class="inputIcon password" src="./assets/img/lock.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
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
 




 



