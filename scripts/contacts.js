document.addEventListener("DOMContentLoaded", function () {
    let contactNames = ["Oliver", "Kevin", "Daniel", "Sophie", "Lena", "Tim", "Max", "Laura"];
    let listElement = document.getElementById("nameList");

    contactNames.forEach(name => {
        let li = document.createElement("li");
        li.textContent = name;
        listElement.appendChild(li);
    });
})
