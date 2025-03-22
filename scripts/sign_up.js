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

/**
 * Prevents the default form submission and validates passwords.
 * 
 * @param {Event} event - The event object from form submission.
 */
function signUp(event) {
  event.preventDefault();
  validatesPasswords();
}

/**
 * Enables or disables the sign-up button based on input validation.
 */
function toggleSignUpButton() {
  let name = document.getElementById("name").value;
  let checkbox = document.getElementById("checkbox").checked;

  if(name && validateEmail() && checkPasswordInput() && checkbox) {
    document.getElementById("signUpButton").disabled = false;
  } else {
    document.getElementById("signUpButton").disabled = true;
  }
}

/**
 * Checks if the entered email contains an '@' symbol.
 * 
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function validateEmail() {
  let email = document.getElementById("email").value;
    return email.includes("@");
}

/**
 * Validates if passwords match and redirects if they do.
 */
function validatesPasswords() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  let errorMsgPassword = document.getElementById("errorMsgPassword");
  if(password.value === confirmedPassword.value) {
    hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    updateContent("login");
  } else {
    showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    clearPasswordInput(password, confirmedPassword, errorMsgPassword);
  }
}

/**
 * Hides the password error message.
 * 
 * @param {HTMLInputElement} password - The password input field.
 * @param {HTMLInputElement} confirmedPassword - The confirm password input field.
 * @param {HTMLElement} errorMsgPassword - The error message element.
 */
function hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword) {
  errorMsgPassword.classList.remove("dFlex");
  password.classList.remove("redBorder");
  confirmedPassword.classList.remove("redBorder");
}

/**
 * Displays the password error message.
 * 
 * @param {HTMLInputElement} password - The password input field.
 * @param {HTMLInputElement} confirmedPassword - The confirm password input field.
 * @param {HTMLElement} errorMsgPassword - The error message element.
 */
function showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword) {
  errorMsgPassword.classList.add("dFlex");
  password.classList.add("redBorder");
  confirmedPassword.classList.add("redBorder");
}

/**
 * Clears password input fields and hides the error message after 2 seconds.
 * 
 * @param {HTMLInputElement} password - The password input field.
 * @param {HTMLInputElement} confirmedPassword - The confirm password input field.
 * @param {HTMLElement} errorMsgPassword - The error message element.
 */
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

/**
 * Checks if both password fields are filled.
 * 
 * @returns {boolean} - Returns true if both passwords are entered, otherwise false.
 */
function checkPasswordInput() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  
  return password.value.length > 0 && confirmedPassword.value.length > 0;
}
