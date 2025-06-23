/**
 * Fetches the logged-in user's name and updates the greeting element.
 * @async
 */
async function greetingByName() {
    let nameData = await getData('/users/' + loggedInUser + '/name');
    if (!nameData) return;
    document.getElementById("userName").textContent = nameData;
}

/**
 * Updates the greeting message based on the current time of day.
 */
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

/**
 * Finds the earliest date of urgent tasks that are due today or later,
 * formats it, and displays it; shows "No urgent tasks" if none found.
 * @async
 */
async function showUrgentDate() {
    let tasks = await getData('/users/' + loggedInUser + '/tasks/');
    if (!tasks) return;
    let today = new Date();
    let earliestDate = null;
    for (let key in tasks) {
        let task = tasks[key];
        if (task.prio === "urgent" && task.date) {
            let [day, month, year] = task.date.split("/");
            let taskDate = new Date(`${year}-${month}-${day}`);
            if (!isNaN(taskDate.getTime()) && taskDate >= today) {
                if (!earliestDate || taskDate < earliestDate) {
                    earliestDate = taskDate;
                }
            }
        }
    }
    checkEarliestDate(earliestDate);
}

function checkEarliestDate(earliestDate) {
    if (earliestDate) {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = earliestDate.toLocaleDateString('en-US', options);
        document.getElementById("date").textContent = formattedDate;
    } else {
        document.getElementById("date").textContent = "No urgent tasks";
    }
}

/**
 * Counts the number of tasks in the "toDo" column and updates the counter element.
 * @async
 */
async function getToDoTasksCounter() {
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

/**
 * Counts the number of tasks in the "done" column and updates the counter element.
 * @async
 */
async function getDoneTasksCounter() {
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

/**
 * Counts the number of tasks awaiting feedback and updates the counter element.
 * @async
 */
async function getFeedbackCounter() {
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

/**
 * Counts the number of tasks currently in progress and updates the counter element.
 * @async
 */
async function getInProgressCounter() {
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

/**
 * Counts all tasks that are on the board (any column except undefined) and updates the counter.
 * @async
 */
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

/**
 * Counts the number of urgent priority tasks and updates the counter element.
 * @async
 */
async function getUrgentTasksCounter() {
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

/**
 * Loads and displays a personalized greeting if the window width is <= 800px.
 * Shows or hides the greeting container based on whether greeting data exists.
 * @async
 */
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