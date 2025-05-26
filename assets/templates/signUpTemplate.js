/**
 * Generates the HTML structure for the sign-up page.
 * 
 * This template includes:
 * - A confirmation overlay for successful sign-up
 * - A form with inputs for name, email, password, and confirmed password
 * - Validation placeholders and icons for user interaction
 * - A checkbox to accept the privacy policy
 * - A submit button that is enabled only when all validations pass
 * 
 * @returns {string} - The HTML string for the sign-up template
 */
function signUpTemplate() {
  return `
    <div id="signUpOverlay" class="signUpOverlay dNone">
      <span>You signed up successfully</span>
    </div>
    <img class="heroLogo" src="./assets/img/joinLogoSmall.svg" alt="">
    <main id="contentSignUp" class="contentSignUp">
      <div class="signUpContainer">
        <img onclick="updateContent('login')" class="returnArrow" src="./assets/img/returnArrow.svg" alt="">  
        <h2>Sign up</h2>
        <hr class="hr">
        <form onsubmit="signUp(event)"; return false">
          <div class="inputWrapper">
            <input id="name" class="inputfieldSignUp" type="text" placeholder="Name" oninput="toggleSignUpButton()">
            <img class="inputIconSignUp" src="./assets/img/person.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="email" class="inputfieldSignUp" type="text" placeholder="Email" oninput="toggleSignUpButton()">
            <img class="inputIconSignUp" src="./assets/img/mail.svg" alt="">
            <span id="errorMsgEmail" class="errorMsgEmail hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="password" class="inputfieldSignUp password" type="password" placeholder="Password" oninput="toggleSignUpButton()">
            <img onclick="togglePasswordVisibility('password')" class="inputIconSignUp passwordIcon" src="./assets/img/lock.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="confirmedPassword" class="inputfieldSignUp password" type="password" placeholder="Confirm Password" oninput="toggleSignUpButton()">
            <img onclick="togglePasswordVisibility('confirmedPassword')" class="inputIconSignUp passwordIcon" src="./assets/img/lock.svg" alt="">
            <span id="errorMsgPassword" class="errorMsgPassword hide">Your passwords don't match. Please try again.</span>
          </div>
          <div class="checkPrivacyPolicy">
            <input id="checkbox" class="checkbox" type="checkbox" onchange="toggleSignUpButton()">
            <span>I accept the <span class="hightlight">Privacy Policy</span> </span>
          </div>
          <div class="buttonWrapperSignUp">
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