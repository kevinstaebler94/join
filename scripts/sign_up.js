async function signUp(event) {
  event.preventDefault();
  
  if (await checkInput()) {
    let overlay = document.getElementById("signUpOverlay");
    overlay.classList.remove("dNone");
    overlay.classList.add("dFlex");

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);
    pushUsers();

    setTimeout(() => {
      updateContent('login');
      setTimeout(initLogin(), 100);
    }, 1500); 
  }
}

function toggleSignUpButton() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let checkbox = document.getElementById("checkbox").checked;

  if(name && email && checkPasswordInput() && checkbox) {
    document.getElementById("signUpButton").disabled = false;
  } else {
    document.getElementById("signUpButton").disabled = true;
  }  
}

function checkPasswordInput() {
  let password = document.getElementById("password").value.trim();
  let confirmedPassword = document.getElementById("confirmedPassword").value.trim();

  return password.length >= 3 && confirmedPassword.length >= 3;
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

async function emailExists() {
  let email = document.getElementById("email").value.trim();
  let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
  let userData = await getData("/users");
  if(!userData) return false;
  
  return Object.entries(userData).some(([key, value]) => 
    key === formattedEmail && value.email === email
  );
}

function showEmailErrorMessage(errorMsgEmail, message) {
  if (!errorMsgEmail) return;
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

function removeErrorMessageEmail(errorMsgEmail) {
  document.getElementById("checkbox").checked = false;
  document.getElementById("signUpButton").disabled = true;

  setTimeout(function() {
    document.getElementById("email").classList.remove("redBorder");
    errorMsgEmail.classList.remove("show");
    errorMsgEmail.classList.add("hide");
  }, 3500);
  return
}

function validatePasswords() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("confirmedPassword");
  let errorMsgPassword = document.getElementById("errorMsgPassword");

  if (!password || !confirmedPassword || !errorMsgPassword) return false;

  if(password.value.trim() === confirmedPassword.value.trim()) {
    hidePasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    return true;
  } else {
    showPasswordErrorMessage(password, confirmedPassword, errorMsgPassword);
    clearPasswordInput(password, confirmedPassword, errorMsgPassword);
    return false;
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

  setTimeout(() => {
    password.classList.remove("redBorder");
    confirmedPassword.classList.remove("redBorder");
    errorMsgPassword.classList.remove("show");
    errorMsgPassword.classList.add("hide");
  }, 3500);
  return
}

async function checkInput() {
  let emailFormatValid = await validateEmailFormat();
  let emailTaken = await emailExists();
  let passwordsValid = validatePasswords();
  return emailFormatValid && !emailTaken && passwordsValid;
}

