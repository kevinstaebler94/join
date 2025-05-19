let loggedInUser;

async function init() {
    await getLoggedInUser();
    if (window.location.href.includes("login.html")) {
        getLogin();
        return;
    } if (window.location.href.includes("summary.html")) {
        if (window.innerWidth <= 800) {
            await includeHTML();
            await loadGreeting();
            getSummary();
            //     // showSummaryLoginOverlay();
        } else {
            await includeHTML();
            getSummary();
            highlightActiveSidebarLink();
            return;
        }
    } if (window.location.href.includes("board.html")) {
        await includeHTML();
        getBoard();
        highlightActiveSidebarLink();
        return;
    } if (window.location.href.includes("contacts.html")) {
        await includeHTML();
        getContacts();
        highlightActiveSidebarLink();
        return;
    } else {
        await includeHTML();
        highlightActiveSidebarLink();
    }

}

function getLogin() {
    initLogin();
}

async function getSummary() {
    document.getElementById('summaryMain').classList.remove('dNone');
    updateGreeting();
    greetingByName();
    showUrgentDate();
    getAllCounter();
}

function getAllCounter() {
    getToDoTasksCounter();
    getDoneTasksCounter();
    getFeedbackCounter();
    getInProgressCounter();
    getInBoardCounter();
    getUrgentTasksCounter();
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
    let userData = await getData('/users/');
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

async function logoutUser() {
    let userData = await getData('/users/' + loggedInUser);
    let userId = userData.email.replace(/\./g, "_").replace(/@/g, "-at-");
    let email = userData.email;
    let password = userData.password;
    let name = userData.name;
    let login = userData.login;
    let tasks = userData.tasks;
    let contacts = userData.contacts;
    let greeting = userData.greeting;
    let greetingTrue = userData.greeting.greeting
    greetingTrue = true;
    login = false;
    await changeUsers(userId, greeting, email, password, name, login, tasks, contacts);
    await changeElement(greetingTrue);
    console.log(userData.greeting.greeting);
    window.location.href = "login.html";

}

async function showUserInitials() {
    console.log("showUserInitials wurde aufgerufen");
    let userName = await getData('/users/' + loggedInUser + '/name');
    if (!userName) return;

    let initials = getInitials(userName);
    let initialsContainer = document.getElementById("userIconInitials");

    if (initialsContainer) {
        initialsContainer.textContent = initials;
    }
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}

// async function showSummaryLoginOverlay() {
//     let overlay = document.getElementById('loginGreetingContainer');
//     let greeting = await getData('/users/' + loggedInUser + '/greeting/greeting');
//     if (!greeting) {
//         console.log(greeting);

//         return;
//     }

//     overlay.classList.remove('dNone');
//     updateLoginGreeting();
//     loginGreetingByName();
//     setTimeout(() => {
//         overlay.classList.add('dNone');
//         document.getElementById('summaryMain').classList.remove('dNone');
//         getSummary();
//     }, 1400);
// }

function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const overlay = document.getElementById('orientationOverlay');

    if (isLandscape && window.innerWidth <= 1024) {
        overlay.classList.remove('dNone'); // z. B. Anzeige einer Warnung
    } else {
        overlay.classList.add('dNone');
    }
}

// window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
document.addEventListener('DOMContentLoaded', checkOrientation);

