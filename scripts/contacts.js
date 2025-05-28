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
let isBurgerMenuOpen = false;

/**
 * Renders the contact list by fetching user contacts,
 * sorting them alphabetically, and adding letter dividers.
 * @async
 */
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

/**
 * Appends a letter divider and line if the first letter changes.
 * @param {HTMLElement} container - Container to append dividers to.
 * @param {string} name - Contact name to check the first letter.
 * @param {string} currentLetter - Current letter divider.
 * @returns {string} Updated current letter.
 */
function appendLetterDividerIfNeeded(container, name, currentLetter) {
    let firstLetter = name.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        container.appendChild(createLetterDivider(firstLetter));
        container.appendChild(createLetterDividerLine());
    }
    return currentLetter;
}

/**
 * Creates a div element for a letter divider.
 * @param {string} letter - Letter to display.
 * @returns {HTMLElement} The letter divider element.
 */
function createLetterDivider(letter) {
    let div = document.createElement("div");
    div.classList.add("letterDivider");
    div.textContent = letter;
    return div;

}

/**
 * Creates a div element for the line under a letter divider.
 * @returns {HTMLElement} The letter divider line element.
 */
function createLetterDividerLine() {
    let div = document.createElement("div");
    div.classList.add("letterDividerLine");
    return div
}

/**
 * Creates a contact card element with initials and contact info.
 * @param {Object} contact - Contact data object.
 * @param {string} contactId - Unique ID of the contact.
 * @returns {HTMLElement} The contact card element.
 */
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

/**
 * Handles the click event on a contact card:
 * sets active contact, loads details, toggles UI states.
 * @param {HTMLElement} card - The clicked contact card element.
 * @param {string} contactId - The ID of the contact.
 * @async
 */
async function handleCardClick(card, contactId) {
    currentContactId = contactId;
    await openContactById(contactId);
    addContactCardBgToggle(card);
    showContactDetailsToggle(card);
    if (window.innerWidth <= 800) openContactMobile(contactId);
}

/**
 * Fetches contact data by ID and updates the contact details view.
 * @param {string} contactId - The ID of the contact to open.
 * @async
 */
async function openContactById(contactId) {
    let contact = (await getData(`/users/${loggedInUser}/contacts/${contactId}`));
    if (!contact || !contact.name || !contact.email) return;
    updateContactDetails(contact)
    currentContactId = adjustEmail(contact.email);
}

/**
 * Updates the contact details panel with the given contact's info.
 * @param {Object} contact - Contact data.
 */
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

    document.getElementById('userNameMobileDeleteContainer').innerHTML = `
        <div class="userNameDeleteIconContainer">
            <img class="defaultIcon" src="./assets/img/delete.svg" alt="">
            <img class="hoverIcon" src="./assets/img/deleteHover.svg" alt="">
        </div>
        <span onclick="deleteContact('${adjustEmail(contact.email)}')">Delete</span>`;
}

/**
 * Extracts initials from a full name string.
 * @param {string} name - The full name.
 * @returns {string} Initials in uppercase.
 */
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

/**
 * Generates a consistent color from a name string.
 * @param {string} name - The name to generate color for.
 * @returns {string} A hex color code from the colors array.
 */
function getColorFromName(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i) + (i + 1);
    }
    let index = sum % colors.length;
    return colors[index];
}

/**
 * Toggles the background highlight of the active contact card.
 * @param {HTMLElement} cardElement - The contact card element to toggle.
 */
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

/**
 * Toggles visibility of the contact details overview based on active card state.
 * @param {HTMLElement} cardElement - The contact card element.
 */
function showContactDetailsToggle(cardElement) {
    let overview = document.getElementById('showContactDetails');

    if (cardElement.classList.contains('active', 'show')) {
        overview.classList.add('active', 'show');
    } else {
        overview.classList.remove('active', 'show');
    }
}

/**
 * Displays a success overlay image with fade-out effect.
 */
function showSuccessOverlayImg() {
    let successOverlayImg = document.getElementById('succesfullyCreatedOverlayImg');

    successOverlayImg.classList.remove('displayNone');
    successOverlayImg.classList.add('show');
    setTimeout(() => {
        successOverlayImg.classList.remove('show');
    }, 800);
    successOverlayImg.classList.add('displayNone');
}

/**
 * Shows the contact details view in mobile mode, hides the contact list.
 * @param {string} contactId - The ID of the contact to open.
 */
function openContactMobile(contactId) {
    document.getElementById('contactListContainer').classList.add('dNone');
    document.getElementById('contactsOverview').classList.remove('dNone');
    document.getElementById('contactsOverview').classList.add('mobileVisible');
    openContactById(contactId);
}

/**
 * Shows the contact list and hides the mobile contact details overview.
 */
function showContactList() {
    document.getElementById('contactsOverview').classList.remove('mobileVisible');
    document.getElementById('contactListContainer').classList.remove('dNone');
    if (activeContactCard) {
        activeContactCard.classList.remove('active');
        activeContactCard = null;
    }
}

/**
 * Handles window resizing to toggle between mobile and desktop views.
 */
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

/**
 * Toggles the mobile burger menu visibility.
 */
function openMobileBurgerMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById("mobileBurgerMenu");
    menu.classList.toggle("show");
    isBurgerMenuOpen = menu.classList.contains("show");
}

window.addEventListener('resize', () => {
    setTimeout(() => {
        showContactListWindowsize();
    }, 100);
});

document.addEventListener("click", (event) => {
    const menu = document.getElementById("mobileBurgerMenu");
    const button = document.getElementById("burgerMenuButton");

    if (
        isBurgerMenuOpen &&
        !menu.contains(event.target) &&
        !button.contains(event.target)
    ) {
        menu.classList.remove("show");
        isBurgerMenuOpen = false;
    }
});