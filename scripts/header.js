function showBurgerMenu() {
    let menu = document.getElementById("burgerMenu");
    menu.classList.toggle("show");
}

// window.onclick = function (event) {
//     let menu = document.getElementById("burgerMenu");
//     let userIcon = document.getElementById("userIcon");

//     if (menu.classList.contains("show") && event.target !== menu && event.target !== userIcon) {
//         menu.classList.remove("show");
//     }
// };

window.onclick = function (event) {
    let menu = document.getElementById("burgerMenu");
    let userIcon = document.getElementById("userIcon");

    // console.log("Clicked Element:", event.target); // Zeigt an, worauf geklickt wurde
    // console.log("Checkbox Status vor Klick:", document.querySelector(".checkbox")?.checked);

    if (menu.classList.contains("show") && event.target !== menu && event.target !== userIcon) {
        menu.classList.remove("show");
    }

    // console.log("Checkbox Status nach Klick:", document.querySelector(".checkbox")?.checked);
};
