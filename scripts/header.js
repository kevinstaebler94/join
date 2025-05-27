/**
 * Toggles the visibility of the burger menu by adding or removing the "show" class.
 */
function showBurgerMenu() {
    let menu = document.getElementById("burgerMenu");
    menu.classList.toggle("show");
}

/**
 * Closes the burger menu when clicking outside of it.
 * 
 * @param {MouseEvent} event - The click event triggered anywhere in the window.
 */
window.onclick = function (event) {
    let menu = document.getElementById("burgerMenu");
    let userIcon = document.getElementById("userIcon");
    if (menu.classList.contains("show") && !menu.contains(event.target) && !userIcon.contains(event.target)) {
        menu.classList.remove("show");
    }
};