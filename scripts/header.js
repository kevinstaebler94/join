function showBurgerMenu() {
    let menu = document.getElementById("burgerMenu");
    menu.classList.toggle("show");
}

window.onclick = function (event) {
    let menu = document.getElementById("burgerMenu");
    let userIcon = document.getElementById("userIcon");

    if (menu.classList.contains("show") && event.target !== menu && event.target !== userIcon) {
        menu.classList.remove("show");
    }
};
