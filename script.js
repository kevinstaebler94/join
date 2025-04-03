function init() {
    updateContent("login");
    includeHTML();
    window.onload = updateGreeting();
    window.onload = greetingByName();
    showDate();
}