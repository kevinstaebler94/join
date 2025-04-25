let loggedInUser;

async function init() {
    await getLoggedInUser();
    if (window.location.href.includes("login.html")) {
        getLogin();
        return;
    } if (window.location.href.includes("summary.html")) {
        getSummary();
        return;
    } if (window.location.href.includes("board.html")) {
        getBoard();
        return;
    } if (window.location.href.includes("contacts.html")) {
        getContacts();
    } else {
        includeHTML();
    }
    showUserInitials();
}

function getLogin() {
    initLogin();
}

function getSummary() {
    includeHTML();
    updateGreeting();
    greetingByName();
    showDate();
}

function getBoard() {
    includeHTML();
    initBoard();
}

function getContacts() {
    includeHTML();
    renderContacts();
}

async function getLoggedInUser() {
    let userData = await getData('/users');
    for (let key in userData) {
        if (userData.hasOwnProperty(key)) {
            if (userData[key].login == true) {
                let email = userData[key].email;
                let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
                loggedInUser = formattedEmail;
            }
        }
    }
}

async function logoutUser() {
    let userData = await getData('/users/' + loggedInUser);
    let userId = userData.email.replace(/\./g, "_").replace(/@/g, "-at-");
    let email = userData.email;
    let password = userData.password;
    let name = userData.name;
    let login = userData.login;
    let tasks = userData.tasks;
    login = false;
    await changeUsers(userId, email, password, name, login, tasks);
    window.location.href = "login.html";
}