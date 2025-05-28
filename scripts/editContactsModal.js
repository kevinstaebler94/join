let originalContactEmail = null;
let originalContactId = null;

/**
 * Opens the modal to edit an existing contact.
 */
function openEditContactsModal() {
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('editContactsModal');
    let mainContent = document.querySelector('.mainContent');

    overlay.classList.remove('dNone');
    container.classList.remove('dNone');
    getEditContactsModalStructure();

    if (window.innerWidth > 800) {
        mainContent.style.gap = '32px';
    } else {
        mainContent.style.gap = '0px';
    }

    setTimeout(() => {
        let modal = document.getElementById('modalEditContent');
        modal.classList.add('show');
    }, 10);

    fillEditContactsForm();
}

/**
 * Closes the edit contact modal.
 */
function closeEditContactsModal() {
    let modal = document.getElementById('modalEditContent');
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('editContactsModal');
    let mainContent = document.querySelector('.mainContent');

    if (modal) {
        modal.classList.remove('show');

        setTimeout(() => {
            overlay.classList.add('dNone');
            container.classList.add('dNone');
            mainContent.style.gap = '64px';
        }, 300);
    }
}
/**
 * Renders the HTML structure for the edit contact modal.
 */
function getEditContactsModalStructure() {
    let container = document.getElementById('editContactsModal');
    container.innerHTML = `
    <div class="modalMainContent" id="modalEditContent">
        <div class="headlineSection">
        <div class="modalMobileCloseButtonWrapper">
        <button class="modalMobileCloseButton" onclick="closeContactsModal()"><img src="./assets/img/plusIconWhite.svg"></button>
        </div>
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
                    <button class="modalCloseButton" onclick="closeEditContactsModal()"><img src="./assets/img/closeIcon.svg"></button>
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
                <button onclick="updateContacts()" class="modalSafeButton" type="button">Save <img src="./assets/img/createIcon.svg"></button>
                </div>
            </div>
        </div>
    </div>`
}


/// Editation ///

/**
 * Fills the form in the edit modal with the current contact's data.
 */
async function fillEditContactsForm() {
    if (!currentContactId) return;
    let contact = await getData(`/users/${loggedInUser}/contacts/${currentContactId}`);
    if (!contact) return;
    document.getElementById("contactNameEdit").value = contact.name;
    document.getElementById("contactEmailEdit").value = contact.email;
    document.getElementById("contactPhoneEdit").value = contact.phone;

    originalContactId = currentContactId;
    originalContactEmail = contact.email;
}

/**
 * Validates and updates the edited contact in the database.
 */
async function updateContacts() {
    let isValid = await validateEditContactInput();
    if (!isValid) return;
    let emailValid = await validateEditEmailFormat(originalContactEmail);
    if (!emailValid) return;
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
        await putData('/users/' + loggedInUser + '/contacts', updatedContact, newContactId);
        if (newContactId !== originalContactId) {
            await deleteContact(originalContactId);
        }
        currentContactId = newContactId;
        await renderContacts();
        await openContactById(currentContactId);
        let allCards = document.querySelectorAll('.contactCard');
        allCards.forEach(card => card.classList.remove('active'));
        let updatedCard = Array.from(allCards).find(
            c => c.dataset.contactId === currentContactId
        );
        if (updatedCard) {
            addContactCardBgToggle(updatedCard);
            showContactDetailsToggle(updatedCard);
        }
        closeEditContactsModal();
    } catch (error) {
        console.error('Error while updating contact:', error);
    }
}

/**
 * Validates all input fields for contact editing.
 * @returns {Promise<boolean>} True if valid, false otherwise.
 */
async function validateEditContactInput() {
    let inputs = getEditContactInputs();
    let values = getEditContactValues(inputs);
    resetContactInputErrors(inputs);
    if (checkEmptyFields(inputs, values)) return false;
    let existingContacts = await getData('/users/' + loggedInUser + '/contacts' + originalContactId) || {};
    if (checkEditDuplicateFields(inputs, values, existingContacts, originalContactId)) return false;
    return true;
}

/**
 * Retrieves values from edit contact input fields.
 * @param {Object} inputs - Input field elements
 * @returns {Object} Normalized input values
 */
function getEditContactValues(inputs) {
    return {
        name: inputs.nameInput.value.trim().toLowerCase(),
        email: inputs.emailInput.value.trim().toLowerCase(),
        phone: inputs.phoneInput.value.trim()
    };
}

/**
 * Retrieves all input and error elements for the edit form.
 * @returns {Object} Input and error DOM elements
 */
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

/**
 * Checks for duplicate values in existing contacts, excluding the original contact.
 * @param {Object} inputs - Input elements
 * @param {Object} values - Current values
 * @param {Object} existingContacts - All contacts from DB
 * @param {string} originalContactId - ID of the contact before editing
 * @returns {boolean} True if duplicates are found
 */
function checkEditDuplicateFields(inputs, values, existingContacts, originalContactId) {
    let hasError = false;
    let original = existingContacts[originalContactId];

    for (let key in existingContacts) {
        if (key === originalContactId) continue;
        let contact = existingContacts[key];
        if (contact.name?.trim().toLowerCase() === values.name && values.name !== original.name?.trim().toLowerCase()) {
            inputs.nameInput.classList.add('error');
            document.getElementById('namePlaceholderError').innerHTML = "Name already used.";
            document.getElementById('namePlaceholderError').classList.add('visible');
            hideErrorMessages('namePlaceholderError', inputs.nameInput.id);
            hasError = true;
        }
        if (contact.email?.trim().toLowerCase() === values.email && values.email !== original.email?.trim().toLowerCase()) {
            inputs.emailInput.classList.add('error');
            document.getElementById('emailPlaceholderError').innerHTML = "E-Mail already used.";
            document.getElementById('emailPlaceholderError').classList.add('visible');
            hideErrorMessages('emailPlaceholderError', inputs.emailInput.id);
            hasError = true;
        }
        if (contact.phone?.trim() === values.phone && values.phone !== original.phone?.trim()) {
            inputs.phoneInput.classList.add('error');
            document.getElementById('phonePlaceholderError').innerHTML = "Phone number already used.";
            document.getElementById('phonePlaceholderError').classList.add('visible');
            hideErrorMessages('phonePlaceholderError', inputs.phoneInput.id);
            hasError = true;
        }
    }
    return hasError;
}

/**
 * Validates the email format and checks for duplicates if changed.
 * @param {string} originalEmail - Email before editing
 * @returns {Promise<boolean>} True if email is valid and not duplicated
 */
async function validateEditEmailFormat(originalEmail) {
    let email = document.getElementById("contactEmailEdit").value.trim().toLowerCase();
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMsgEmail = document.getElementById("emailError");
    if (!pattern.test(email)) {
        errorMsgEmail.innerText = "Please enter a valid email address.";
        errorMsgEmail.classList.remove("dNone");
        return false;
    }
    if (!originalEmail || email !== originalEmail.toLowerCase()) {
        let existingContacts = await getData('/users/' + loggedInUser + '/contacts') || {};
        for (let key in existingContacts) {
            if (existingContacts[key].email.trim().toLowerCase() === email) {
                errorMsgEmail.innerText = "Email is already used.";
                errorMsgEmail.classList.remove("dNone");
                return false;
            }
        }
    }
    errorMsgEmail.classList.add("dNone");
    return true;
}