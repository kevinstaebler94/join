function signUp(event) {
  event.preventDefault();
  if(checkInput()) {
    document.getElementById("signUpOverlay");
    updateContent("login");
  }
}

function toggleSignUpButton() {
  let name = document.getElementById("name").value;
  let checkbox = document.getElementById("checkbox").checked;

  if(name && checkPasswordInput() && checkbox) {
    document.getElementById("signUpButton").disabled = false;
  } else {
    document.getElementById("signUpButton").disabled = true;
  }
}

async function validateEmailFormat() {
  let email = document.getElementById("email").value.trim();
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let errorMsgEmail = document.getElementById("errorMsgEmail");

  if (!pattern.test(email)) {
    showEmailErrorMessage(errorMsgEmail, "Please enter a valid email address.");
    clearEmailInput(errorMsgEmail);
    return false;
  } 

  if (await emailExists()) {
    showEmailErrorMessage(errorMsgEmail, "Email is already registered.");
    clearEmailInput(errorMsgEmail);
    return false;
  }

  hideEmailErrorMessage(errorMsgEmail);
  return true;
}

function showEmailErrorMessage(errorMsgEmail, message) {
  errorMsgEmail.textContent = message;
  errorMsgEmail.classList.remove("hide");
  errorMsgEmail.classList.add("show");
  document.getElementById("email").classList.add("redBorder");
}

function hideEmailErrorMessage(errorMsgEmail) {
  errorMsgEmail.classList.remove("show");
  errorMsgEmail.classList.add("hide");
  document.getElementById("email").classList.remove("redBorder");
}

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

function hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword) {
  errorMsgPassword.classList.remove("show");
  password.classList.remove("redBorder");
  confirmedPassword.classList.remove("redBorder");
}

function showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword) {
  errorMsgPassword.classList.add("show");
  password.classList.add("redBorder");
  confirmedPassword.classList.add("redBorder");
}

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

async function checkInput() {
  let emailFormatValid = validateEmailFormat();
  let emailTaken = await emailExists();
  let passwordsValid = validatePasswords();
  return emailFormatValid && !emailTaken && passwordsValid;
}

function toggleSignUpOverlay() {
  let overlay = document.getElementById("signUpOverlay");
}



