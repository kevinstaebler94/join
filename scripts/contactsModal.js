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
                <div class="inputFieldContainer">
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="text" placeholder="Name" id="contactName" required>
                        <img class="inputIcon" src="./assets/img/person.svg">
                    </div>
                    <div id="nameError" class="inputError dNone">Fehlertext</div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="email" placeholder="Email" id="contactEmail" required>
                        <img class="inputIcon" src="./assets/img/mail.svg">
                    </div>
                    <div id="emailError" class="inputError dNone">Fehlertext</div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="text" placeholder="Phone" id="contactPhone" required>
                        <img class="inputIcon" src="./assets/img/phone.svg">
                    </div>
                    <div id="phoneError" class="inputError dNone">Fehlertext</div>
                </div>
                <div class="buttonsContainer">
                <button onclick="clearInputFields()" class="modalCancelButton">Cancel <img src="./assets/img/closeIcon.svg"></button>
                <button onclick="pushContacts()" class="modalCreateButton" type="submit">Create Contact <img src="./assets/img/createIcon.svg"></button>
                </div>
            </div>
        </div>
    </div>`
}

function closeContactsModal() {
    document.getElementById('modalOverlay').classList.add('dNone');
    document.getElementById('contactsModal').classList.add('dNone');
}

function clearInputFields() {
    document.getElementById('contactName').value = "";
    document.getElementById('contactEmail').value = "";
    document.getElementById('contactPhone').value = "";

    ['contactName', 'contactEmail', 'contactPhone'].forEach(id => {
        document.getElementById(id).classList.remove('error');
    });

    ['nameError', 'emailError', 'phoneError'].forEach(id => {
        let el = document.getElementById(id);
        el.classList.add('dNone');
        el.innerText = "";
    });
}

/// Formvalidation ///

async function validateContactInput() {
    let nameInput = document.getElementById('contactName');
    let emailInput = document.getElementById('contactEmail');
    let phoneInput = document.getElementById('contactPhone');
    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let phoneError = document.getElementById('phoneError');

    let name = nameInput.value.trim().toLowerCase();
    let email = emailInput.value.trim().toLowerCase();
    let phone = phoneInput.value.trim();

    [nameInput, emailInput, phoneInput].forEach(input => input.classList.remove('error'));
    [nameError, emailError, phoneError].forEach(el => {
        el.classList.add('dNone');
        el.innerText = "";
    });

    let existingContacts = await getData('/contacts');
    if (!existingContacts) existingContacts = {};

    let hasError = false;

    for (let key in existingContacts) {
        let contact = existingContacts[key];

        if (contact.name.trim().toLowerCase() === name) {
            nameInput.classList.add('error');
            nameError.innerText = "Dieser Name ist bereits vergeben.";
            nameError.classList.remove('dNone');
            hasError = true;
        }

        if (contact.email.trim().toLowerCase() === email) {
            emailInput.classList.add('error');
            emailError.innerText = "Diese E-Mail ist bereits vergeben.";
            emailError.classList.remove('dNone');
            hasError = true;
        }

        if (contact.phone.trim() === phone) {
            phoneInput.classList.add('error');
            phoneError.innerText = "Diese Telefonnummer ist bereits vergeben.";
            phoneError.classList.remove('dNone');
            hasError = true;
        }
    }

    return !hasError;
}