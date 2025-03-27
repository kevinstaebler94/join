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
            <p class="blueDivider"></p>
        </div>
        <div class="contentSection">
            <button onclick="closeContactsModal()">X</button>
            <form onsubmit="addContact(); return false;">
            <input type="text" placeholder="Name" id="contactName" required>
            <input type="email" placeholder="Email" id="contactEmail" required>
            <input type="text" placeholder="Phone" id="contactPhone" required>
            <button type="submit">Create Contact</button>
            </form>
        </div>
    </div>`
}

function closeContactsModal() {
    document.getElementById('modalOverlay').classList.add('dNone');
    document.getElementById('contactsModal').classList.add('dNone');
}