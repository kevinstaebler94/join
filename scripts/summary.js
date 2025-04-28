async function greetingByName() {
    console.log("greetingByName wurde aufgerufen");

    let nameData = await getData('/users/' + loggedInUser + '/name');
    if (!nameData) return;

    document.getElementById("userName").textContent = nameData;
}

function updateGreeting() {
    let hour = new Date().getHours(); // Holt die aktuelle Stunde
    let greeting;

    if (hour >= 5 && hour < 10) {
        greeting = "Good morning,";
    } else if (hour >= 10 && hour < 15) {
        greeting = "Welcome back,";
    } else if (hour >= 15 && hour < 18) {
        greeting = "Good afternoon,";
    } else {
        greeting = "Good evening,";
    }

    document.getElementById("timeOfDay").textContent = greeting;
}

function showDate() {
    let date = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    document.getElementById('date').innerHTML = formattedDate;
}

async function getToDoTasksCounter() {
    console.log("getToDoTasksCounter wurde aufgerufen");

    let tasksData = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasksData) return;

    let toDoCount = 0;

    for (let key in tasksData) {
        if (tasksData[key].column === "toDo") {
            toDoCount++;
        }
    }

    document.getElementById("toDoTasksCounter").textContent = toDoCount;
}

async function getDoneTasksCounter() {
    console.log("getDoneTasksCounter wurde aufgerufen");

    let tasksData = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasksData) return;

    let doneCount = 0;

    for (let key in tasksData) {
        if (tasksData[key].column === "done") {
            doneCount++;
        }
    }

    document.getElementById("doneTasksCounter").textContent = doneCount;
}

async function getFeedbackCounter() {
    console.log("getFeedbackCounter wurde aufgerufen");

    let tasksData = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasksData) return;

    let feedbackCount = 0;

    for (let key in tasksData) {
        if (tasksData[key].column === "awaitFeedback") {
            feedbackCount++;
        }
    }

    document.getElementById("doneFeedbackCounter").textContent = feedbackCount;
}

async function getInProgressCounter() {
    console.log("getInProgressCounter wurde aufgerufen");

    let tasksData = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasksData) return;

    let inProgressCount = 0;

    for (let key in tasksData) {
        if (tasksData[key].column === "inProgress") {
            inProgressCount++;
        }
    }

    document.getElementById("doneTasksCounter").textContent = inProgressCount;
}