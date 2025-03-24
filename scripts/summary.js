let names = ["Oliver", "Daniel", "Kevin"]

function greetingByName() {
    let randomName = names[Math.floor(Math.random() * names.length)];

    document.getElementById("userName").textContent = randomName;
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