let colors = [
    "#9327ff", // lila
    "#1fd7c1", // grün
    "#fc71ff", // pink
    "#00bee8", // blau
    "#ffbb2b", // orange
    "#ffe62b", // gelb
    "#ff4646" // rot
];

let activeContactCard = null;

async function renderContacts() {
    let container = document.getElementById("contactList");
    container.innerHTML = "";

    let data = await getData('/users/' + loggedInUser + '/contacts');
    if (!data) return;

    let entries = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
    let currentLetter = "";

    for (let [id, contact] of entries) {
        currentLetter = appendLetterDividerIfNeeded(container, contact.name, currentLetter);
        container.appendChild(createContactCard(contact, id));
    };
}

function appendLetterDividerIfNeeded(container, name, currentLetter) {
    let firstLetter = name.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        container.appendChild(createLetterDivider(firstLetter));
        container.appendChild(createLetterDividerLine());
    }
    return currentLetter;
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

function createContactCard(contact, contactId) {
    let card = document.createElement("div");
    card.classList.add("contactCard");
    card.dataset.contactId = contactId;
    let initials = getInitials(contact.name);
    let bgColor = getColorFromName(contact.name);

    card.innerHTML = `
        <div class="contactIcon" style="background-color: ${bgColor}">${initials}</div>
        <div class="contactDetails" onclick="openContactById()">
            <strong>${contact.name}</strong>
            <span class="email">${contact.email}</span>
        </div>
    `;
    card.onclick = async () => handleCardClick(card, contactId);
    return card;
}

async function handleCardClick(card, contactId) {
    currentContactId = contactId;
    await openContactById(contactId);
    addContactCardBgToggle(card);
    showContactDetailsToggle(card);
    if (window.innerWidth <= 800) openContactMobile(contactId);
}

async function openContactById(contactId) {
    let contact = (await getData(`/users/${loggedInUser}/contacts/${contactId}`));
    if (!contact || !contact.name || !contact.email) return;
    updateContactDetails(contact)
    currentContactId = adjustEmail(contact.email);
}

function updateContactDetails(contact) {
    document.getElementById("userName").innerHTML = contact.name;
    document.getElementById("userEmail").innerHTML = contact.email;
    document.getElementById("userPhoneNumber").innerHTML = contact.phone;

    let initials = getInitials(contact.name);
    let color = getColorFromName(contact.name);
    let initialsContainer = document.getElementById("contactInitials");
    initialsContainer.innerHTML = initials;
    initialsContainer.style.backgroundColor = color;
    initialsContainer.style.color = "white";

    document.getElementById('userNameDeleteContainer').innerHTML = `
        <div class="userNameDeleteIconContainer">
            <img class="defaultIcon" src="./assets/img/delete.svg" alt="">
            <img class="hoverIcon" src="./assets/img/deleteHover.svg" alt="">
        </div>
        <span onclick="deleteContact('${adjustEmail(contact.email)}')">Delete</span>`;
}


function getInitials(name) {
    if (!name || typeof name !== 'string') return '';
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

function addContactCardBgToggle(cardElement) {
    if (activeContactCard === cardElement) {
        cardElement.classList.remove('active');
        activeContactCard = null;
    } else {
        if (activeContactCard) {
            activeContactCard.classList.remove('active');
        }
        cardElement.classList.add('active');
        activeContactCard = cardElement;
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

function showSuccessOverlayImg() {
    let successOverlayImg = document.getElementById('succesfullyCreatedOverlayImg');

    successOverlayImg.classList.remove('displayNone');
    successOverlayImg.classList.add('show');
    setTimeout(() => {
        successOverlayImg.classList.remove('show');
    }, 800);
    successOverlayImg.classList.add('displayNone');
}

function openContactMobile(contactId) {
    document.getElementById('contactListContainer').classList.add('dNone');
    document.getElementById('contactsOverview').classList.remove('dNone');
    document.getElementById('contactsOverview').classList.add('mobileVisible');
    openContactById(contactId);
}

function showContactList() {
    document.getElementById('contactsOverview').classList.remove('mobileVisible');
    document.getElementById('contactListContainer').classList.remove('dNone');
    if (activeContactCard) {
        activeContactCard.classList.remove('active');
        activeContactCard = null;
    }
}

function showContactListWindowsize() {
    if (window.innerWidth >= 801) {
        document.getElementById('contactsOverview').classList.remove('mobileVisible');
        document.getElementById('contactListContainer').classList.remove('dNone');
        if (activeContactCard) {
            activeContactCard.classList.remove('active');
            activeContactCard = null;
        }
    }

}

function openMobileBurgerMenu() {
    let menu = document.getElementById("mobileBurgerMenu");
    menu.classList.toggle('dNone');
    menu.classList.toggle("show");
}

window.addEventListener('resize', () => {
    setTimeout(() => {
        showContactListWindowsize();
    }, 100);
});
