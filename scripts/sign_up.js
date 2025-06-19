/**
 * Handles the sign-up process after validating all inputs.
 * Displays an overlay and stores user data in localStorage.
 *
 * @param {Event} event - The form submission event.
 */
async function signUp(event) {
  event.preventDefault();

  if (await checkInput()) {
    let overlay = document.getElementById("signUpOverlay");
    overlay.classList.remove("dNone");
    overlay.classList.add("dFlex");
    let email = document.getElementById("email").value.trim();

    localStorage.setItem("registeredEmail", email);
    pushUsers();

    setTimeout(() => {
      updateContent("login");
      setTimeout(initLogin(), 100);
    }, 1500);
  }
}

/**
 * Enables or disables the sign-up button based on input validation.
 */
function toggleSignUpButton() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let checkbox = document.getElementById("checkbox").checked;

  if (name && email && checkPasswordInput() && checkbox) {
    document.getElementById("signUpButton").disabled = false;
  } else {
    document.getElementById("signUpButton").disabled = true;
  }
}

/**
 * Checks if both password inputs meet minimum length requirements.
 *
 * @returns {boolean} True if both passwords are valid.
 */
function checkPasswordInput() {
  let password = document.getElementById("password").value.trim();
  let confirmedPassword = document.getElementById("confirmedPassword").value.trim();

  return password.length >= 3 && confirmedPassword.length >= 3;
}

/**
 * Toggles the visibility of a password input field.
 *
 * @param {string} id - The ID of the input field.
 */
function togglePasswordVisibility(id) {
  let input = document.getElementById(id);
  let icon = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    icon.src = "./assets/img/visibility.svg";
  } else {
    input.type = "password";
    icon.src = "./assets/img/visibilityOff.svg";
  }
}

/**
 * Validates the email format and checks for existing registration.
 *
 * @returns {Promise<boolean>} True if the email is valid and not taken.
 */
async function validateEmailFormat() {
  let email = document.getElementById("email").value.trim();
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let errorMsgEmail = document.getElementById("errorMsgEmail");

  if (!pattern.test(email)) {
    showEmailErrorMessage(errorMsgEmail, "Please enter a valid email address.");
    removeErrorMessageEmail(errorMsgEmail);
    return false;
  }

  if (await emailExists()) {
    showEmailErrorMessage(errorMsgEmail, "Email is already registered.");
    removeErrorMessageEmail(errorMsgEmail);
    return false;
  }

  hideEmailErrorMessage(errorMsgEmail);
  return true;
}

/**
 * Checks whether the entered email already exists in the database.
 *
 * @returns {Promise<boolean>} True if the email is already registered.
 */
async function emailExists() {
  let email = document.getElementById("email").value.trim();
  let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
  let userData = await getData("/users");
  if (!userData) return false;

  return Object.entries(userData).some(([key, value]) => key === formattedEmail && value.email === email);
}

/**
 * Displays an email-related error message.
 *
 * @param {HTMLElement} errorMsgEmail - The error message element.
 * @param {string} message - The message to display.
 */
function showEmailErrorMessage(errorMsgEmail, message) {
  if (!errorMsgEmail) return;
  errorMsgEmail.textContent = message;
  errorMsgEmail.classList.remove("hide");
  errorMsgEmail.classList.add("show");
  document.getElementById("email").classList.add("redBorder");
}

/**
 * Hides the email error message.
 *
 * @param {HTMLElement} errorMsgEmail - The error message element.
 */
function hideEmailErrorMessage(errorMsgEmail) {
  errorMsgEmail.classList.remove("show");
  errorMsgEmail.classList.add("hide");
  document.getElementById("email").classList.remove("redBorder");
}

/**
 * Resets email validation UI after a delay.
 *
 * @param {HTMLElement} errorMsgEmail - The error message element.
 */
function removeErrorMessageEmail(errorMsgEmail) {
  document.getElementById("checkbox").checked = false;
  document.getElementById("signUpButton").disabled = true;

  setTimeout(function () {
    document.getElementById("email").classList.remove("redBorder");
    errorMsgEmail.classList.remove("show");
    errorMsgEmail.classList.add("hide");
  }, 3500);
  return;
}

/**
 * Validates that both password fields match.
 *
 * @returns {boolean} True if passwords match, false otherwise.
 */
function validatePasswords() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  let errorMsgPassword = document.getElementById("errorMsgPassword");

  if (!password || !confirmedPassword || !errorMsgPassword) return false;

  if (password.value.trim() === confirmedPassword.value.trim()) {
    hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    return true;
  } else {
    showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    clearPasswordInput(password, confirmedPassword, errorMsgPassword);
    return false;
  }
}

/**
 * Hides the password mismatch error and removes red borders.
 *
 * @param {HTMLElement} password - The password input field.
 * @param {HTMLElement} confirmedPassword - The confirmation input field.
 * @param {HTMLElement} errorMsgPassword - The error message element.
 */
function hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword) {
  errorMsgPassword.classList.remove("show");
  password.classList.remove("redBorder");
  confirmedPassword.classList.remove("redBorder");
}

/**
 * Displays an error message when passwords don't match.
 *
 * @param {HTMLElement} password - The password input field.
 * @param {HTMLElement} confirmedPassword - The confirmation input field.
 * @param {HTMLElement} errorMsgPassword - The error message element.
 */
function showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword) {
  errorMsgPassword.classList.add("show");
  password.classList.add("redBorder");
  confirmedPassword.classList.add("redBorder");
}

/**
 * Clears the password inputs and hides the error message after a delay.
 *
 * @param {HTMLElement} password - The password input field.
 * @param {HTMLElement} confirmedPassword - The confirmation input field.
 * @param {HTMLElement} errorMsgPassword - The error message element.
 */
function clearPasswordInput(password, confirmedPassword, errorMsgPassword) {
  document.getElementById("checkbox").checked = false;
  document.getElementById("signUpButton").disabled = true;

  password.value = "";
  confirmedPassword.value = "";

  setTimeout(() => {
    password.classList.remove("redBorder");
    confirmedPassword.classList.remove("redBorder");
    errorMsgPassword.classList.remove("show");
    errorMsgPassword.classList.add("hide");
  }, 3500);
  return;
}

/**
 * Validates all form inputs before submission.
 *
 * @returns {Promise<boolean>} True if all inputs are valid.
 */
async function checkInput() {
  let emailFormatValid = await validateEmailFormat();
  let emailTaken = await emailExists();
  let passwordsValid = validatePasswords();
  return emailFormatValid && !emailTaken && passwordsValid;
}
