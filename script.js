function init() {
    getData('/users');
    
    includeHTML();
    window.onload = updateGreeting();
    window.onload = greetingByName();
    showDate();
    
}