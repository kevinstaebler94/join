let contacts = [
    { name: "Oliver Geschine", email: "oli.geschine@beispiel.de" },
    { name: "Kevin Stäbler", email: "kevin.staebler@beispiel.de" },
    { name: "Daniel Bumbuc", email: "daniel.bumbuc@beispiel.de" },
    { name: "Anton Mayer", email: "antom@gmail.com" },
    { name: "Anja Schulz", email: "schulz@hotmail.com" },
    { name: "Benedikt Ziegler", email: "benedikt@gmail.com" },
    { name: "David Eisenberg", email: "davidberg@gmail.com" },
    { name: "Eva Fischer", email: "eva@gmail.com" },
    { name: "Emmanuel Mauer", email: "emmanuelma@gmail.com" },
];

let colors = [
    "#9327ff", // lila
    "#1fd7c1", // grün
    "#fc71ff", // pink
    "#6e52ff", // blau
    "#ff7a02", // orange
    "#6e52ff", // gelb
];

function renderContacts() {
    let container = document.getElementById("contactList");
    container.innerHTML = ""; // Leeren, falls neu gerendert wird

    let randomColor = colors[Math.floor(Math.random() * colors.length)];


    // Kontakte alphabetisch sortieren
    let sorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    let currentLetter = "";

    sorted.forEach(contact => {
        let firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            const letterDiv = document.createElement("div");
            letterDiv.classList.add("letterDivider");
            letterDiv.textContent = currentLetter;
            container.appendChild(letterDiv);
        }

        let card = document.createElement("div");
        card.classList.add("contactCard");

        let initials = contact.name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();

        let bgColor = getColorFromName(contact.name + contact.email);

        card.innerHTML = `
        <div class="contactIcon" style="background-color: ${bgColor}">${initials}</div>
        <div class="contactDetails">
          <strong>${contact.name}</strong>
          <span class="email">${contact.email}</span>
        </div>
      `;

        container.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", renderContacts);


function getColorFromName(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i) + (i + 1);
    }
    let index = sum % colors.length;
    return colors[index];
}
