function openContactsModal() {
    document.getElementById('modalOverlay').classList.remove('dNone');
    document.getElementById('contactsModal').classList.remove('dNone');
    getContactsModalStructure();
}

function getContactsModalStructure() {
    let container = document.getElementById('contactsModal');
    container.innerHTML = `
    <div class="modalMainContent">
        <div class="headlineSection">
            <img class="contactsModalImage" src="./assets/img/joinLogoSidebar.svg" alt="">
            <div class="headlineContainer">
                <h1>Add contact</h1>
                <h2>Tasks are better with a team!</h2>
            </div>
            <p class="blueUnderline"></p>
        </div>
        <div class="contentSection">
            <div class="modalIconContainer">
                <div class="contactsModalIcon">
                <img src="./assets/img/whitePerson.svg" alt="">
                </div>
            </div>
            <div class="modalContentContainer">
                <div class="modalCloseButtonWrapper">
                <button class="modalCloseButton" onclick="closeContactsModal()"><img src="./assets/img/closeIcon.svg"></button>
                </div>
                <form onsubmit="addContact(); return false;">
                <input class="inputFields" type="text" placeholder="Name" id="contactName" required>
                <input class="inputFields" type="email" placeholder="Email" id="contactEmail" required>
                <input class="inputFields" type="text" placeholder="Phone" id="contactPhone" required>
                </form>
                <div class="buttonsContainer">
                <button class="modalCancelButton">Cancel <img src="./assets/img/closeIcon.svg"></button>
                <button class="modalCreateButton" type="submit">Create Contact</button>
                </div>
            </div>
        </div>
    </div>`
}

function closeContactsModal() {
    document.getElementById('modalOverlay').classList.add('dNone');
    document.getElementById('contactsModal').classList.add('dNone');
}