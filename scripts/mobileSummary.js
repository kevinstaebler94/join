/**
 * Asynchronously retrieves the logged-in user's name from the database
 * and displays it in the login greeting element.
 *
 * @async
 * @function loginGreetingByName
 * @returns {Promise<void>} A promise that resolves after the username is set or if no data is found.
 */
async function loginGreetingByName() {
    let nameData = await getData('/users/' + loggedInUser + '/name');
    if (!nameData) return;
    document.getElementById("loginUserName").textContent = nameData;
}

/**
 * Updates the greeting message based on the current hour.
 * The greeting text is adjusted for morning, midday, afternoon, or evening.
 *
 * @function updateLoginGreeting
 */
function updateLoginGreeting() {
    let hour = new Date().getHours();
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
    document.getElementById("loginTimeOfDay").textContent = greeting;
}