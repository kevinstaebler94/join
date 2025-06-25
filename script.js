let loggedInUser;

/**
 * Initializes the application by checking the current page and loading appropriate data and elements.
 * Loads the logged-in user, includes HTML components, and routes to page-specific initializations.
 */
async function init() {
  await getLoggedInUser();
  if (window.location.href.includes("index.html")) {
    await checkIndex();
    return;
  } if (window.location.href.includes("summary.html")) {
    await checkSummary();
    return;
  } if (window.location.href.includes("board.html")) {
    await checkBoard();
    return;
  } if (window.location.href.includes("contacts.html")) {
    await checkContacts();
    return;
  } else {
    initAddTask();
  }
}

/**
 * Calls the function to handle login logic on the index page.
 * This function is used as an entry point.
 * @async
 */
async function checkIndex() {
  getLogin();
}

/**
 * Initializes the summary view, adjusts layout for mobile and desktop,
 * and loads greeting and sidebar highlight.
 * @async
 */
async function checkSummary() {
  if (window.innerWidth <= 800) {
    await includeHTML();
    await loadGreeting();
    getSummary();
    highlightActiveSidebarLink();
  } else {
    await includeHTML();
    getSummary();
    highlightActiveSidebarLink();
    return;
  }
}

/**
 * Initializes the add task view.
 * Includes HTML structure, highlights sidebar, and shows user initials.
 * @async
 */
async function initAddTask() {
  await includeHTML();
  highlightActiveSidebarLink();
  showUserInitials();
}

/**
 * Initializes the board view by loading HTML, board data and sidebar highlight.
 * @async
 */
async function checkBoard() {
  await includeHTML();
  getBoard();
  highlightActiveSidebarLink();
  return;
}

/**
 * Initializes the contacts view by loading HTML, contacts, user initials, and sidebar highlight.
 * @async
 */
async function checkContacts() {
  await includeHTML();
  getContacts();
  highlightActiveSidebarLink();
  showUserInitials();
  return;
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
  showUserInitials();
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
  if (window.location.href.includes("index.html")) {
    return;
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
  setLogoutData(userId, greeting, email, password, name, login, tasks, contacts, greeting, greetingTrue);
}

/**
 * Sets the logout state and redirects to the login screen.
 * Updates the user data with logout values and resets `loggedInUser`.
 * @async
 * @param {string} userId - ID of the user to update.
 * @param {string} greeting - Greeting text.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} name - User's name.
 * @param {boolean} login - Login status (will be set to false).
 * @param {Object} tasks - User's task data.
 * @param {Object} contacts - User's contact data.
 * @param {string} greeting - Greeting text (duplicated param, can be removed).
 * @param {boolean} greetingTrue - Whether the greeting should be shown.
 */
async function setLogoutData(userId, greeting, email, password, name, login, tasks, contacts, greeting, greetingTrue) {
  greetingTrue = true;
  login = false;
  await changeUsers(userId, greeting, email, password, name, login, tasks, contacts);
  await changeElement(greetingTrue);
  await checkLogoutUser();
  loggedInUser = '';
  window.location.href = "index.html";
}

/**
 * Checks whether the currently logged-in user is the guest user.
 * If so, deletes the user data after a short delay.
 * @async
 */
async function checkLogoutUser() {
  let userData = await getData("/users/" + loggedInUser);
  setTimeout(() => {
    if (userData.name === "Guest User") {
      deleteUser();
      return;
    } else {
      return;
    }
  }, 100);
}

/**
 * Displays the initials of the logged-in user in the user icon container.
 */
async function showUserInitials() {
  let userName = await getData("/users/" + loggedInUser + "/name");
  let initials = getInitials(userName);
  let initialsContainer = document.getElementById("userIconInitials");
  if (!userName) return;
  setTimeout(() => {
    if (initialsContainer) {
      initialsContainer.textContent = initials;
    }
  }, 100);

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
  let privacyContainerEnglish = document.getElementById("privacyContainerEnglish");
  let privacyContainerGerman = document.getElementById("privacyContainerGerman");
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
