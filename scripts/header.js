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

async function showUserInitials() {
    console.log("showUserInitials wurde aufgerufen");
    let userName = await getData('/users/' + loggedInUser + '/name');
    if (!userName) return;

    let initials = getInitials(userName);
    let initialsContainer = document.getElementById("userIconInitials");

    if (initialsContainer) {
        initialsContainer.textContent = initials;
    }
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}