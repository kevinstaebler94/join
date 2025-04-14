function openEditContactsModal() {
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('contactsModal');

    overlay.classList.remove('dNone');
    container.classList.remove('dNone');
    getEditContactsModalStructure();

    setTimeout(() => {
        const modal = document.getElementById('modalContent');
        modal.classList.add('show');
    }, 10);

    fillEditContactsForm();
}

function getEditContactsModalStructure() {
    let container = document.getElementById('contactsModal');
    container.innerHTML = `
    <div class="modalMainContent" id="modalContent">
        <div class="headlineSection">
            <img class="contactsModalImage" src="./assets/img/joinLogoSidebar.svg" alt="">
            <div class="headlineContainer">
                <h1>Edit contact</h1>
                <p class="blueUnderline"></p>
            </div>

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
                        <input class="inputFields" type="text" placeholder="Name" id="contactNameEdit" required>
                        <img class="inputIcon" src="./assets/img/person.svg">
                        <span id="namePlaceholderError" class="errorMsg">Placeholder</span>
                    </div>
                    <div id="nameError" class="inputError dNone">Fehlertext</div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="email" placeholder="Email" id="contactEmailEdit" required>
                        <img class="inputIcon" src="./assets/img/mail.svg">
                        <span id="emailPlaceholderError" class="errorMsg">Placeholder</span>
                    </div>
                    <div id="emailError" class="inputError dNone">Fehlertext</div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="text" placeholder="Phone" id="contactPhoneEdit" required>
                        <img class="inputIcon" src="./assets/img/phone.svg">
                        <span id="phonePlaceholderError" class="errorMsg">Placeholder</span>
                    </div>
                    <div id="phoneError" class="inputError dNone">Fehlertext</div>
                </div>
                <div class="buttonsContainer">
                <button onclick="clearInputFields()" class="modalCancelButton">Delete</button>
                <button onclick="updateContacts()" class="modalSafeButton" type="submit">Save <img src="./assets/img/createIcon.svg"></button>
                </div>
            </div>
        </div>
    </div>`
}


/// Editation ///

let currentContactIndex = null;

function fillEditContactsForm() {
    if (currentContactIndex === null) return;
    let contact = contacts[currentContactIndex];
    document.getElementById("contactNameEdit").value = contacts[currentContactIndex].name;
    document.getElementById("contactEmailEdit").value = contacts[currentContactIndex].email;
    document.getElementById("contactPhoneEdit").value = contacts[currentContactIndex].phone;
}

async function updateContacts() {
    let isValid = await validateEditContactInput();
    if (!isValid) return;

    let name = document.getElementById('contactNameEdit').value.trim();
    let email = document.getElementById('contactEmailEdit').value.trim();
    let phone = document.getElementById('contactPhoneEdit').value.trim();
    let newContactId = adjustEmail(email);
    let updatedContact = {
        name: name,
        email: email,
        phone: phone
    };

    try {
        await putData('/contacts', updatedContact, newContactId);
        if (newContactId !== originalContactId) {
            await deleteContact(originalContactId);
        }
        closeContactsModal();
        await renderContacts();
    } catch (error) {
        console.error('Error while updating contact:', error);
    }
}

async function validateEditContactInput() {
    let inputs = getEditContactInputs();
    let values = {
        name: inputs.nameInput.value.trim().toLowerCase(),
        email: inputs.emailInput.value.trim().toLowerCase(),
        phone: inputs.phoneInput.value.trim()
    };

    resetContactInputErrors(inputs);

    if (checkEmptyFields(inputs, values)) return false;

    let existingContacts = await getData('/contacts') || {};

    if (checkDuplicateFields(inputs, values, existingContacts, 'edit', originalContactId)) return false;

    return true;
}


function getEditContactInputs() {
    return {
        nameInput: document.getElementById('contactNameEdit'),
        emailInput: document.getElementById('contactEmailEdit'),
        phoneInput: document.getElementById('contactPhoneEdit'),
        nameError: document.getElementById('nameError'),
        emailError: document.getElementById('emailError'),
        phoneError: document.getElementById('phoneError')
    };
}