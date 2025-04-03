function init() {
    updateContent("login");
    localStorage.removeItem("registeredEmail");
    localStorage.removeItem("registeredPassword");
    includeHTML();
    updateGreeting();
    greetingByName();
    showDate();
}