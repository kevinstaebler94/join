let loggedInUser;

function init() {
    getLoggedInUser();
    if (window.location.href.includes("login.html")) {
        getLogin();
        return;
    } if (window.location.href.includes("summary.html")) {
        getSummary();
        return;
    } if (window.location.href.includes("board.html")) {
        getBoard();
        return;
    } else {
        includeHTML();
    }
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

async function getLoggedInUser() {
    let userData = await getData('/users');
    for (let key in userData) {
        if (userData.hasOwnProperty(key)) {
            if (userData[key].login == true) {
                let email = userData[key].email;
                let formattedEmail = email.replace(/\./g, "_").replace(/@/g, "-at-");
                loggedInUser = formattedEmail;
                console.log(loggedInUser);
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
    login = false;
    await changeUsers(userId, email, password, name, login);
    window.location.href = "login.html";
}