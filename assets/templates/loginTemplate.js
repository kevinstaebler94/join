/**
 * Returns the HTML markup string for the login page, including email/password input,
 * login button, and guest login option.
 *
 * @returns {string} - HTML string for the login template.
 */
function loginTemplate() {
  let savedEmail = localStorage.getItem("registeredEmail") || "";
  setTimeout(() => toggleLoginButton(), 0);
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
            <input id="emailLogin" class="inputfieldLogin" type="email" value="${savedEmail}" placeholder="Email" oninput="toggleLoginButton()">
            <img class="inputIconLogin" src="./assets/img/mail.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="passwordLogin" class="inputfieldLogin" type="password" placeholder="Password" oninput="toggleLoginButton()">
            <img onclick="togglePasswordVisibility('passwordLogin')" id="passwordIcon" class="inputIconLogin passwordIcon" src="./assets/img/lock.svg" alt="">
            <span id="errorMsgLogin" class="errorMsgPassword hide">Check your email and password. Please try again.</span>
          </div>
          <div class="buttonWrapperLogin">
            <button disabled  type="submit" id="loginButton" class="button loginButton">Log in</button>
            <button id="loginGuestBtn" class="button guestLoginButton" onclick="getGuestUserData()">Guest Log in</button>
          </div>
        </form>
      </div>
      <div class="signUpHeroContainerMobile">
      <span class="signUpText">Not a Join user?</span>
      <button onclick="updateContent('signUp')" class="button signUpButton">Sign up</button></div>
    </main>
    <footer class="legalLinks">
      <span onclick="window.location.href='./privacyNotLogin.html'" class="privacyPolicy">Privacy Policy</span>
      <span onclick="window.location.href='./legalNoticeNotLogin.html'" class="legalNotice">Legal notice</span>
    </footer>
  `;
}
