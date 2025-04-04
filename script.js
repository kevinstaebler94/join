function init() {
    includeHTML();
    updateContent("login");
    localStorage.removeItem("registeredEmail");
    localStorage.removeItem("registeredPassword");
    updateGreeting();
    greetingByName();
    showDate();
}