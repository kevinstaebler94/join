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

// function showDate() {
//     let date = new Date();
//     let options = { year: 'numeric', month: 'long', day: 'numeric' };
//     let formattedDate = date.toLocaleDateString('en-US', options);
//     document.getElementById('date').innerHTML = formattedDate;
// }

// async function showUrgentDate() {
//     let date = new Date();
//     let options = { year: 'numeric', month: 'long', day: 'numeric' };
//     let currentDate = date.toLocaleDateString('en-US', options);
//     let urgentDateData = await getData('/users/' + loggedInUser + '/tasks/');
//     if (!urgentDateData) return;

//     for (let key in urgentDateData) {
//         if (urgentDateData[key].prio === "urgent") {

//         }

//     }

// }

async function showUrgentDate() {
    let tasks = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasks) return;

    let today = new Date();
    let earliestDate = null;

    for (let key in tasks) {
        let task = tasks[key];

        if (task.prio === "urgent" && task.date) {
            // Format: "dd/mm/yyyy" → umwandeln in Date
            let [day, month, year] = task.date.split("/");
            let taskDate = new Date(`${year}-${month}-${day}`);

            // Prüfen ob dieses Datum gültig und nach heute ist
            if (!isNaN(taskDate.getTime()) && taskDate >= today) {
                if (!earliestDate || taskDate < earliestDate) {
                    earliestDate = taskDate;
                }
            }
        }
    }

    if (earliestDate) {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = earliestDate.toLocaleDateString('en-US', options);
        document.getElementById("date").textContent = formattedDate;
    } else {
        document.getElementById("date").textContent = "No urgent tasks";
    }
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

    document.getElementById("feedbackCounter").textContent = feedbackCount;
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

    document.getElementById("inProgressCounter").textContent = inProgressCount;
}

async function getInBoardCounter() {
    let tasksData = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasksData) return;

    let inBoardCount = 0;

    for (let key in tasksData) {
        if (tasksData[key].column === "toDo" ||
            tasksData[key].column === "done" ||
            tasksData[key].column === "awaitFeedback" ||
            tasksData[key].column === "inProgress") {
            inBoardCount++;
        }
    }

    document.getElementById("inBoardCounter").textContent = inBoardCount;
}

async function getUrgentTasksCounter() {
    console.log("getToDoTasksCounter wurde aufgerufen");

    let tasksData = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasksData) return;

    let urgentCount = 0;

    for (let key in tasksData) {
        if (tasksData[key].prio === "urgent") {
            urgentCount++;
        }
    }

    document.getElementById("urgentTasksCounter").textContent = urgentCount;
}

async function loadGreeting() {
    if (window.innerWidth > 800) return;
    let greeting = await getData('/users/' + loggedInUser + '/greeting/greeting');
    let greetingContainer = document.getElementById('loginGreetingContainer');
    if (greeting) {
        updateLoginGreeting();
        loginGreetingByName();
        greetingContainer.classList.remove('dNone');
    } else {
        greetingContainer.classList.add('dNone');
    }
    greeting = false;
    changeElement(greeting);

}