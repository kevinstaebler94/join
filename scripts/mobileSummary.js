async function loginGreetingByName() {
    console.log("greetingByName wurde aufgerufen");

    let nameData = await getData('/users/' + loggedInUser + '/name');
    if (!nameData) return;

    document.getElementById("loginUserName").textContent = nameData;
}

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