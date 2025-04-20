function initLogin() {
  updateContent("login");
  localStorage.removeItem("registeredEmail");
  localStorage.removeItem("registeredPassword");
}

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

function login(event) {
  event.preventDefault();
  verifyLogin();
}

async function verifyLogin() {
  let email = document.getElementById("emailLogin").value.trim();
  let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
  let password = document.getElementById("passwordLogin").value.trim();
  let userData = await getData("/users")
  let error = document.getElementById("errorMsgLogin");
  let login;

  if (!userData) {
    document.getElementById("passwordLogin").value = "";
    showLoginErrorMessage(error);
    setTimeout(() => {
      hideLoginErrorMessage(error)
    }, 3500);
    return false;
  }
  if (
    userData[formattedEmail] &&
    userData[formattedEmail].email === email &&
    userData[formattedEmail].password === password
  ) {
    login = true;
    await changeUsers(formattedEmail, userData[formattedEmail].email, userData[formattedEmail].password, userData[formattedEmail].name, login, userData[formattedEmail].tasks);
    console.log(userData[formattedEmail]);
    
    window.location.href = "summary.html";
    return true;
  } else {
    document.getElementById("passwordLogin").value = "";
    showLoginErrorMessage(error);
    setTimeout(() => {
      hideLoginErrorMessage(error)
    }, 3500);
    return false;
  }
}

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

function showLoginErrorMessage(error) {
  error.textContent = "Check your email and password. Please try again.";
  error.classList.remove("hide");
  document.getElementById("emailLogin").classList.add("redBorder");
  document.getElementById("passwordLogin").classList.add("redBorder");
  return false;
}

function hideLoginErrorMessage(error) {
  error.classList.add("hide");
  error.classList.remove("show");
  document.getElementById("emailLogin").classList.remove("redBorder");
  document.getElementById("passwordLogin").classList.remove("redBorder");
  return true;
}

function togglePasswordVisibility(id) {
  let input = document.getElementById(id)
  let icon = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    icon.src = "./assets/img/visibility.svg";
  } else {
    input.type = "password";
    icon.src = "./assets/img/visibilityOff.svg";
  }
}


