let loggedInUser;

/**
 * Initializes the application by checking the current page and loading appropriate data and elements.
 * Loads the logged-in user, includes HTML components, and routes to page-specific initializations.
 */
async function init() {
  await getLoggedInUser();
  if (window.location.href.includes("index.html")) {
    getLogin();
    return;
  }
  if (window.location.href.includes("summary.html")) {
    if (window.innerWidth <= 800) {
      await includeHTML();
      await loadGreeting();
      getSummary();
    } else {
      await includeHTML();
      getSummary();
      highlightActiveSidebarLink();
      return;
    }
  }
  if (window.location.href.includes("board.html")) {
    await includeHTML();
    getBoard();
    highlightActiveSidebarLink();
    return;
  }
  if (window.location.href.includes("contacts.html")) {
    await includeHTML();
    getContacts();
    highlightActiveSidebarLink();
    return;
  } else {
    await includeHTML();
    highlightActiveSidebarLink();
  }
}

/**
 * Initializes the login view.
 */
function getLogin() {
  initLogin();
}

/**
 * Loads and displays the summary data on the summary page.
 */
async function getSummary() {
  document.getElementById("summaryMain").classList.remove("dNone");
  updateGreeting();
  greetingByName();
  showUrgentDate();
  getAllCounter();
}

/**
 * Triggers all summary counters to be updated.
 */
function getAllCounter() {
  getToDoTasksCounter();
  getDoneTasksCounter();
  getFeedbackCounter();
  getInProgressCounter();
  getInBoardCounter();
  getUrgentTasksCounter();
}

/**
 * Initializes the board view by loading HTML and initializing the board logic.
 */
async function getBoard() {
  includeHTML();
  await initBoard();
}

/**
 * Initializes the contacts view by loading HTML and rendering the contacts.
 */
function getContacts() {
  includeHTML();
  renderContacts();
}

/**
 * Loads the currently logged-in user from backend data and stores their formatted email.
 */
async function getLoggedInUser() {
  let userData = await getData("/users/");
  for (let key in userData) {
    if (userData.hasOwnProperty(key)) {
      if (userData[key].login == true) {
        let email = userData[key].email;
        let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
        loggedInUser = formattedEmail;
      }
    }
  }
  showUserInitials();
}

/**
 * Logs out the currently logged-in user and resets their login state.
 * Redirects to the index page after logout.
 */
async function logoutUser() {
  let userData = await getData("/users/" + loggedInUser);
  let userId = userData.email.replace(/\./g, "_").replace(/@/g, "-at-");
  let email = userData.email;
  let password = userData.password;
  let name = userData.name;
  let login = userData.login;
  let tasks = userData.tasks;
  let contacts = userData.contacts;
  let greeting = userData.greeting;
  let greetingTrue = userData.greeting.greeting;
  greetingTrue = true;
  login = false;
  await changeUsers(
    userId,
    greeting,
    email,
    password,
    name,
    login,
    tasks,
    contacts
  );
  await changeElement(greetingTrue);
  await checkLogoutUser();
  console.log(loggedInUser);

  window.location.href = "index.html";
}

async function checkLogoutUser() {
  let userData = await getData("/users/" + loggedInUser);
  setTimeout(() => {
    if (userData.name === "Guest User") {
      deleteUser();
      return;
    } else {
      return;
    }
  }, 10);
}

/**
 * Displays the initials of the logged-in user in the user icon container.
 */
async function showUserInitials() {
  let userName = await getData("/users/" + loggedInUser + "/name");
  if (!userName) return;

  let initials = getInitials(userName);
  let initialsContainer = document.getElementById("userIconInitials");

  if (initialsContainer) {
    initialsContainer.textContent = initials;
  }
}

/**
 * Extracts and returns the uppercase initials from a full name.
 * @param {string} name - Full name of the user.
 * @returns {string} Initials of the name.
 */
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Checks the screen orientation and displays an overlay if the screen is landscape and narrow.
 */
function checkOrientation() {
  const isLandscape = window.innerWidth > window.innerHeight;
  const overlay = document.getElementById("orientationOverlay");

  if (isLandscape && window.innerWidth <= 932) {
    overlay.classList.remove("dNone"); // z. B. Anzeige einer Warnung
  } else {
    overlay.classList.add("dNone");
  }
}


/**
 * Shows or hides the privacy policy based on the selected language button.
 * @param {string} clickedLanguage - The ID of the clicked language button.
 */
function showLanguage(clickedLanguage) {
  let privacyContainerEnglish = document.getElementById(
    "privacyContainerEnglish"
  );
  let privacyContainerGerman = document.getElementById(
    "privacyContainerGerman"
  );
  if (clickedLanguage == "englishBtn") {
    privacyContainerEnglish.classList.remove("dNone");
    privacyContainerGerman.classList.add("dNone");
  }
  if (clickedLanguage == "germanBtn") {
    privacyContainerEnglish.classList.add("dNone");
    privacyContainerGerman.classList.remove("dNone");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let languageBtns = document.querySelectorAll(".languageBtn");
  languageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let clickedLanguage = btn.id;
      let clickedBtn = document.getElementById(clickedLanguage);
      languageBtns.forEach((b) => b.classList.remove("activeLanguage"));
      clickedBtn.classList.add("activeLanguage");
      showLanguage(clickedLanguage);
    });
  });
});

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("DOMContentLoaded", checkOrientation);
