/**
 * Generates the HTML template for the sign-up form.
 * 
 * @returns The HTML string for the sign-up section.
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
            <input id="name" class="inputfield" type="text" placeholder="Name" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/person.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="email" class="inputfield" type="text" placeholder="Email" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
            <span id="errorMsgEmail" class="errorMsgEmail hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="password" class="inputfield password" type="password" placeholder="Password" oninput="toggleSignUpButton()">
            <img onclick="togglePasswordVisibility('password')" class="inputIcon passwordIcon" src="./assets/img/lock.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="confirmedPassword" class="inputfield password" type="password" placeholder="Confirm Password" oninput="toggleSignUpButton()">
            <img onclick="togglePasswordVisibility('confirmedPassword')" class="inputIcon passwordIcon" src="./assets/img/lock.svg" alt="">
            <span id="errorMsgPassword" class="errorMsgPassword hide">Your passwords don't match. Please try again.</span>
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
 * Handles the sign-up form submission.
 * Prevents the default form submission and validates passwords.
 * 
 * @param {Event} event - The event object from form submission.
 */
function signUp(event) {
  event.preventDefault();
  if(checkInput()) {
    document.getElementById("signUpOverlay");
    pushUsers('/users');
    updateContent("login");
  }
}

/**
 * Enables or disables the sign-up button based on input validation.
 */
function toggleSignUpButton() {
  let name = document.getElementById("name").value;
  let checkbox = document.getElementById("checkbox").checked;

  if(name && checkPasswordInput() && checkbox) {
    document.getElementById("signUpButton").disabled = false;
  } else {
    document.getElementById("signUpButton").disabled = true;
  }
}

/**
 * Validates the email input using a regular expression.
 * Shows an error message if the email is invalid.
 * 
 * @returns {boolean} True if the email is valid, otherwise false.
 */
function validateEmailFormat() {
  let email = document.getElementById("email").value.trim();
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let errorMsgEmail = document.getElementById("errorMsgEmail");

  if (!pattern.test(email)) {
    showEmailErrorMessage(errorMsgEmail, "Please enter a valid email address.");
    clearEmailInput(errorMsgEmail);
    return false;
  } 

  if (emailExists()) {
    showEmailErrorMessage(errorMsgEmail, "Email is already registered.");
    clearEmailInput(errorMsgEmail);
    return false;
  }

  hideEmailErrorMessage(errorMsgEmail);
  return true;
}

/**
 * Checks if the entered email is already registered.
 * 
 * @returns {boolean} True if the email exists, otherwise false.
 */
function emailExists() {
  let email = document.getElementById("email").value.trim();
  let users = globalBackend.flatMap(obj => obj.users);
  let exists = users.some(users => users.email === email);

  return exists;
}

/**
 * Displays the email error message.
 * 
 * @param {HTMLElement} errorMsgEmail - The email error message element.
 */
function showEmailErrorMessage(errorMsgEmail, message) {
  errorMsgEmail.textContent = message;
  errorMsgEmail.classList.remove("hide");
  errorMsgEmail.classList.add("show");
  document.getElementById("email").classList.add("redBorder");
}

/**
 * Hides the email error message.
 * 
 * @param {HTMLElement} errorMsgEmail - The email error message element.
 */
function hideEmailErrorMessage(errorMsgEmail) {
  errorMsgEmail.classList.remove("show");
  errorMsgEmail.classList.add("hide");
  document.getElementById("email").classList.remove("redBorder");
}

/**
 * Clears the email input field and hides the error message after a delay.
 * 
 * @param {HTMLElement} errorMsgEmail - The email error message element.
 */
function clearEmailInput(errorMsgEmail) {
  let email = document.getElementById("email");
  document.getElementById("checkbox").checked = false;
  document.getElementById("signUpButton").disabled = true;

  setTimeout(function() {
    email.classList.remove("redBorder");
    errorMsgEmail.classList.remove("show");
    errorMsgEmail.classList.add("hide");
  }, 3500);
  return
}

/**
 * Validates if passwords match.
 * 
 * @returns {boolean} True if passwords match, otherwise false.
 */
function validatePasswords() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  let errorMsgPassword = document.getElementById("errorMsgPassword");
  if(password.value.trim() === confirmedPassword.value.trim()) {
    hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    return true;
  } else {
    showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    clearPasswordInput(password, confirmedPassword, errorMsgPassword);
    return false;
  }
}

/**
 * Checks if both password fields are filled.
 * 
 * @returns {boolean} True if both passwords are entered, otherwise false.
 */
function checkPasswordInput() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  
  return password.value.length > 0 && confirmedPassword.value.length > 0;
}

function togglePasswordVisibility(id) {
  let input = document.getElementById(id)
  let icon = input.nextElementSibling;
  
  if(input.type === "password") {
    input.type = "text";
    icon.src = "./assets/img/visibility.svg";
  } else {
    input.type = "password";
    icon.src = "./assets/img/visibilityOff.svg";
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
  errorMsgPassword.classList.remove("show");
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
  errorMsgPassword.classList.add("show");
  password.classList.add("redBorder");
  confirmedPassword.classList.add("redBorder");
}

/**
 * Clears password input fields and hides the error message after a delay.
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
    errorMsgPassword.classList.remove("show");
    errorMsgPassword.classList.add("hide");
  }, 3500);
  return
}

/**
 * Validates email and password inputs.
 * 
 * @returns {boolean} True if all inputs are valid, otherwise false.
 */
function checkInput() {
  let emailFormatValid = validateEmailFormat();
  let emailTaken = emailExists();
  let passwordsValid = validatePasswords();
  return emailFormatValid && !emailTaken && passwordsValid;
}

function toggleSignUpOverlay() {
  let overlay = document.getElementById("signUpOverlay");
}



