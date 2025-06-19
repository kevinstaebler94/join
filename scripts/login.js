/**
 * Initializes the login section by updating the content
 * and clearing any previously registered login credentials.
 */
function initLogin() {
  updateContent("login");
  localStorage.removeItem("registeredEmail");
}

/**
 * Updates the DOM content depending on the selected section.
 *
 * @param {string} section - The section to display ('login' or 'signUp').
 */
function updateContent(section) {
  let contentWrapper = document.getElementById("contentWrapper");
  contentWrapper.innerHTML = "";

  switch (section) {
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
 * Prevents default form submission and triggers login verification.
 *
 * @param {Event} event - The submit event from the login form.
 */
function login(event) {
  event.preventDefault();
  verifyLogin();
}

/**
 * Verifies user credentials by checking against stored user data.
 * If valid, redirects to the summary page and updates login status.
 * Otherwise, shows an error message.
 *
 * @returns {Promise<boolean>} Whether the login was successful.
 */
async function verifyLogin() {
  let email = document.getElementById("emailLogin").value.trim();
  let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
  let password = document.getElementById("passwordLogin").value.trim();
  let userData = await getData("/users/");
  let error = document.getElementById("errorMsgLogin");
  let login;

  loggedInUser = formattedEmail;
  handleMissingUserData(userData);
  processSuccessfulLogin(userData, formattedEmail, email, password, error, login);
}

function handleMissingUserData(userData) {
  if (!userData) {
    document.getElementById("passwordLogin").value = "";
    showLoginErrorMessage(error);
    setTimeout(() => {
      hideLoginErrorMessage(error);
    }, 3500);
    return false;
  }
}

async function processSuccessfulLogin(userData, formattedEmail, email, password, error, login) {
  if (userData && userData[formattedEmail] && userData[formattedEmail].email.toLowerCase() === email.toLowerCase() && userData[formattedEmail].password === password) {
    login = true;
    await changeUsers(formattedEmail, userData[formattedEmail].greeting, userData[formattedEmail].email, userData[formattedEmail].password, userData[formattedEmail].name, login, userData[formattedEmail].tasks, userData[formattedEmail].contacts);
    window.location.href = "summary.html";
    return true;
  } else {
    document.getElementById("passwordLogin").value = "";
    showLoginErrorMessage(error);
    setTimeout(() => {
      hideLoginErrorMessage(error);
    }, 3500);
    return false;
  }
}

/**
 * Enables or disables the login button depending on email and password input validity.
 */
function toggleLoginButton() {
  let email = document.getElementById("emailLogin").value.trim();
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let password = document.getElementById("passwordLogin").value.trim();
  let loginButton = document.getElementById("loginButton");
  if (pattern.test(email)) {
    if (email.length > 0 && password.length >= 3) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }
}

/**
 * Displays an error message when login credentials are incorrect.
 *
 * @param {HTMLElement} error - The DOM element to show the error in.
 * @returns {boolean} Always returns false.
 */
function showLoginErrorMessage(error) {
  error.textContent = "Check your email and password. Please try again.";
  error.classList.remove("hide");
  document.getElementById("emailLogin").classList.add("redBorder");
  document.getElementById("passwordLogin").classList.add("redBorder");
  return false;
}

/**
 * Hides the login error message and removes visual error indicators.
 *
 * @param {HTMLElement} error - The DOM element to hide the error from.
 * @returns {boolean} Always returns true.
 */
function hideLoginErrorMessage(error) {
  error.classList.add("hide");
  error.classList.remove("show");
  document.getElementById("emailLogin").classList.remove("redBorder");
  document.getElementById("passwordLogin").classList.remove("redBorder");
  return true;
}

/**
 * Toggles the visibility of the password input field.
 *
 * @param {string} id - The ID of the password input element.
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
