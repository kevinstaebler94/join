let contacts = [];

let colors = [
    "#9327ff", // lila
    "#1fd7c1", // grün
    "#fc71ff", // pink
    "#6e52ff", // blau
    "#ff7a02", // orange
    "#6e52ff", // gelb
];

async function renderContacts() {
    let container = document.getElementById("contactList");
    container.innerHTML = "";
    contacts = [];

    let data = await getData('/contacts');
    if (!data) return;

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            contacts.push(data[key]);
        }
    }
    let sorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    let currentLetter = "";

    sorted.forEach((contact, index) => {
        let firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            container.appendChild(createLetterDivider(firstLetter));
            container.appendChild(createLetterDividerLine());
        }
        container.appendChild(createContactCard(contact, index));

    });

    renderContactDetails();
}

function createLetterDivider(letter) {
    let div = document.createElement("div");
    div.classList.add("letterDivider");
    div.textContent = letter;
    return div;

}

function createLetterDividerLine() {
    let div = document.createElement("div");
    div.classList.add("letterDividerLine");
    return div
}

function createContactCard(contact, index) {
    let card = document.createElement("div");
    card.classList.add("contactCard");
    // card.id.add("contactCard");
    let initials = getInitials(contact.name);
    let bgColor = getColorFromName(contact.name + contact.email);

    card.innerHTML = `
        <div class="contactIcon" style="background-color: ${bgColor}">${initials}</div>
        <div class="contactDetails" onclick="openContact">
            <strong>${contact.name}</strong>
            <span class="email">${contact.email}</span>
        </div>
    `;
    card.onclick = () => {
        currentContactIndex = index;
        originalContactId = adjustEmail(contact.email);
        openContact(index);
        addContactCardBgToggle(card);
        showContactDetailsToggle(card);
    };

    return card;
}

function openContact(index) {
    let contact = contacts[index];
    document.getElementById("userName").innerHTML = contact.name;
    document.getElementById("userEmail").innerHTML = contact.email;
    document.getElementById("userPhoneNumber").innerHTML = contact.phone;

    let initials = getInitials(contact.name);
    let color = getColorFromName(contact.name + contact.email);
    let initialsContainer = document.getElementById("contactInitials");

    initialsContainer.innerHTML = initials;
    initialsContainer.style.backgroundColor = color;
    initialsContainer.style.color = "white";
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}


window.addEventListener("DOMContentLoaded", () => {
    renderContacts();
});


function getColorFromName(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i) + (i + 1);
    }
    let index = sum % colors.length;
    return colors[index];
}

function renderContactDetails() {
    getUserName();
    getContactEmail();
    getPhoneNumber();
    getContactInitials();
}

function getUserName() {
    if (contacts.length > 0) {
        document.getElementById("userName").innerHTML = contacts[0].name;
        let userNamerContainer = document.getElementById("userName");
        userNamerContainer.style.fontWeight = "500";
    }

}

function getContactEmail() {
    if (contacts.length > 0) {
        document.getElementById("userEmail").innerHTML = contacts[0].email;
    }
}

function getPhoneNumber() {
    if (contacts.length > 0) {
        document.getElementById("userPhoneNumber").innerHTML = contacts[0].phone;
    }
}

function getContactInitials() {
    if (contacts.length > 0) {
        let initials = getInitials(contacts[0].name);
        let color = getColorFromName(contacts[0].name + contacts[0].email);
        let container = document.getElementById("contactInitials");
        container.innerHTML = initials;
        container.style.backgroundColor = color;
        container.style.color = "white";
    }
}

function addContactCardBgToggle(cardElement) {
    let allCards = document.querySelectorAll('.contactCard');

    if (cardElement.classList.contains('active')) {
        cardElement.classList.remove('active');
    } else {
        allCards.forEach(card => card.classList.remove('active'));
        cardElement.classList.add('active');
    }
}

function showContactDetailsToggle(cardElement) {
    let overview = document.getElementById('showContactDetails');

    if (cardElement.classList.contains('active', 'show')) {
        overview.classList.add('active', 'show');
    } else {
        overview.classList.remove('active', 'show');
    }
}