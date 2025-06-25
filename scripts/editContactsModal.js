let originalContactEmail = null;
let originalContactId = null;

/**
 * Opens the modal to edit an existing contact.
 */
function openEditContactsModal() {
    let overlay = document.getElementById('editContactsModal');
    let container = document.getElementById('contactsEditModal');
    overlay.classList.remove('dNone');
    container.classList.remove('dNone');
    getEditContactsModalStructure();
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
    let overlay = document.getElementById('editContactsModal');
    let container = document.getElementById('contactsEditModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            overlay.classList.add('dNone');
            container.classList.add('dNone');
        }, 300);
    }
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
    changeContactInfo(updatedContact, newContactId, originalContactId);
}

/**
 * Updates a contact and deletes the old one if necessary.
 * @async
 * @param {Object} updatedContact - The updated contact object.
 * @param {string} newContactId - The new contact ID.
 * @param {string} originalContactId - The original contact ID.
 */
async function changeContactInfo(updatedContact, newContactId, originalContactId) {
    await putData('/users/' + loggedInUser + '/contacts', updatedContact, newContactId);
    if (newContactId !== originalContactId) {
        await deleteContact(originalContactId);
    }
    currentContactId = newContactId;
    await renderContacts();
    await openContactById(currentContactId);
    let allCards = document.querySelectorAll('.contactCard');
    allCards.forEach(card => card.classList.remove('active'));
    let updatedCard = Array.from(allCards).find(c => c.dataset.contactId === currentContactId);
    if (updatedCard) {
        addContactCardBgToggle(updatedCard);
        showContactDetailsToggle(updatedCard);
    }
    closeEditContactsModal();
}

/**
 * Validates all input fields for contact editing.
 * @returns {Promise<boolean>} True if valid, false otherwise.
 */
async function validateEditContactInput() {
    let inputs = getEditContactInputs();
    let values = getEditContactValues(inputs);
    resetEditInputErrors(inputs);
    let existingContacts = await getData('/users/' + loggedInUser + '/contacts') || {};
    let editEmailValid = await validateEditEmailFormat();
    let editPhoneValid = await validateEditPhoneNumberFormat();
    if (checkEmptyEditFields(inputs, values)) return false;
    if (checkEditDuplicateFields(inputs, values, existingContacts, originalContactId)) return false;
    return editEmailValid && editPhoneValid;
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
        nameError: document.getElementById('nameErrorEdit'),
        emailError: document.getElementById('emailErrorEdit'),
        phoneError: document.getElementById('phoneErrorEdit')
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
            styleDuplicateEditName(inputs)
        }
        if (contact.email?.trim().toLowerCase() === values.email && values.email !== original.email?.trim().toLowerCase()) {
            styleDuplicateEditEmail(inputs)
        }
        if (contact.phone?.trim() === values.phone && values.phone !== original.phone?.trim()) {
            styleDuplicateEditPhone(inputs)
        }
    }
    return hasError;
}

/**
 * Styles the name input in the edit form for duplicate error.
 * @param {Object} inputs - The input elements object.
 */
function styleDuplicateEditName(inputs) {
    inputs.nameInput.classList.add('error');
    document.getElementById('editNamePlaceholderError').innerHTML = "Name already used.";
    document.getElementById('editNamePlaceholderError').classList.add('visible');
    hideEditErrorMessages('editNamePlaceholderError', inputs.nameInput.id);
    hasError = true;
}

/**
 * Styles the email input in the edit form for duplicate error.
 * @param {Object} inputs - The input elements object.
 */
function styleDuplicateEditEmail(inputs) {
    inputs.emailInput.classList.add('error');
    document.getElementById('editEmailPlaceholderError').innerHTML = "E-Mail already used.";
    document.getElementById('editEmailPlaceholderError').classList.add('visible');
    hideEditErrorMessages('editEmailPlaceholderError', inputs.emailInput.id);
    hasError = true;
}

/**
 * Styles the phone input in the edit form for duplicate error.
 * @param {Object} inputs - The input elements object.
 */
function styleDuplicateEditPhone(inputs) {
    inputs.phoneInput.classList.add('error');
    document.getElementById('editPhonePlaceholderError').innerHTML = "Phone number already used.";
    document.getElementById('editPhonePlaceholderError').classList.add('visible');
    hideEditErrorMessages('editPhonePlaceholderError', inputs.phoneInput.id);
    hasError = true;
}

/**
 * Validates the email format and checks for duplicates if changed.
 * @param {string} originalEmail - Email before editing
 * @returns {Promise<boolean>} True if email is valid and not duplicated
 */
async function validateEditEmailFormat(originalEmail) {
    let emailInput = document.getElementById("contactEmailEdit");
    let email = document.getElementById("contactEmailEdit").value.trim().toLowerCase();
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMsgEmail = document.getElementById("emailErrorEdit");
    if (emailInput.value == '') {
        return;
    }
    if (!pattern.test(email)) {
        emailPatternTest(emailInput, errorMsgEmail);
        return false;
    }
    checkExistingContacts(originalEmail, email, emailInput, errorMsgEmail);
    errorMsgEmail.classList.add("dNone");
    return true;
}

/**
 * Displays a validation error for an invalid email format.
 * @param {HTMLElement} emailInput - The email input element.
 * @param {HTMLElement} errorMsgEmail - The element to display the error message.
 */
function emailPatternTest(emailInput, errorMsgEmail) {
    emailInput.classList.add("error");
    errorMsgEmail.innerText = "Please enter a valid email address.";
    errorMsgEmail.classList.remove("dNone");
    setTimeout(() => {
        errorMsgEmail.classList.add("dNone");
        errorMsgEmail.innerText = "";
        emailInput.classList.remove("error");
    }, 3000);
}

/**
 * Checks if the new email already exists (excluding original).
 * @async
 * @param {string} originalEmail - The original email before edit.
 * @param {string} email - The new email.
 * @param {HTMLElement} emailInput - The email input element.
 * @param {HTMLElement} errorMsgEmail - The error message element.
 * @returns {boolean|undefined}
 */
async function checkExistingContacts(originalEmail, email, emailInput, errorMsgEmail) {
    if (!originalEmail || email !== originalEmail.toLowerCase()) {
        let existingContacts = await getData('/users/' + loggedInUser + '/contacts') || {};
        if (emailInput.value == email) {
            return true;
        }
    }
}

/**
 * Checks for duplicate email addresses in the contact list.
 * @param {Object} existingContacts - The object of all contacts.
 * @param {HTMLElement} emailInput - The email input element.
 * @param {HTMLElement} errorMsgEmail - The element to display error message.
 * @param {string} email - The email to check.
 * @returns {boolean|undefined}
 */
function loopExistingContacts(existingContacts, emailInput, errorMsgEmail, email) {
    for (let key in existingContacts) {
        if (existingContacts[key].email.trim().toLowerCase() === email) {
            emailInput.classList.add("error");
            errorMsgEmail.innerText = "Email is already used.";
            errorMsgEmail.classList.remove("dNone");
            setTimeout(() => {
                errorMsgEmail.classList.add("dNone");
                errorMsgEmail.innerText = "";
                emailInput.classList.remove("error");
            }, 3000);
            return false;
        }
    }
}

/**
 * Resets all input error styles and messages in the edit contact form.
 * @param {Object} inputs - The input elements and error message elements.
 */
function resetEditInputErrors(inputs) {
    [inputs.nameInput, inputs.emailInput, inputs.phoneInput].forEach(input => input.classList.remove('error'));
    [inputs.nameError, inputs.emailError, inputs.phoneError].forEach(el => {
        el.classList.add('dNone');
        el.innerText = "";
    });

    ['editNamePlaceholderError', 'editEmailPlaceholderError', 'editPhonePlaceholderError'].forEach(id => {
        let el = document.getElementById(id);
        el.classList.remove('visible');
        el.innerText = "Placeholder";
    });
}

/**
 * Hides error message after a timeout for edit fields.
 * @param {string} id - The ID of the error element.
 * @param {string} inputId - The ID of the input element.
 */
function hideEditErrorMessages(id, inputId) {
    setTimeout(() => {
        let el = document.getElementById(id);
        let input = document.getElementById(inputId);
        if (el) {
            el.classList.remove('visible');
            el.innerText = "Placeholder";
        }
        if (input) {
            input.classList.remove('error');
        }
    }, 3000);
}

/**
 * Validates the phone number format in the edit contact form.
 * @async
 * @returns {boolean|undefined} Whether the phone number is valid.
 */
async function validateEditPhoneNumberFormat() {
    let phone = document.getElementById("contactPhoneEdit");
    let pattern = /^(\+49\s?|0)[1-9][0-9\s\-]{3,}$/;
    let errorMsgPhone = document.getElementById("phoneErrorEdit");
    let value = phone.value.trim();
    if (phone.value == '') {
        return;
    }
    if (!pattern.test(value)) {
        phonePatternTest(errorMsgPhone, phone);
        return false;
    }
    errorMsgPhone.classList.add("dNone");
    return true;
}

/**
 * Shows validation error for an invalid phone number format.
 * @param {HTMLElement} errorMsgPhone - The element for the error message.
 * @param {HTMLElement} phone - The phone input element.
 */
function phonePatternTest(errorMsgPhone, phone) {
    errorMsgPhone.innerText = "Please enter a valid German phone number (e.g. +49 123 456789).";
    errorMsgPhone.classList.remove("dNone");
    phone.classList.add("error");
    setTimeout(() => {
        errorMsgPhone.classList.add("dNone");
        errorMsgPhone.innerText = "";
        phone.classList.remove("error");
    }, 3000);
}

/**
 * Checks for empty fields in the edit contact form.
 * @param {Object} inputs - The input elements.
 * @param {Object} values - The current values of the inputs.
 * @returns {boolean} Whether any errors occurred.
 */
function checkEmptyEditFields(inputs, values) {
    let hasError = false;
    if (!values.name) {
        checkNameValue(inputs, values);
    }
    if (!values.email) {
        checkEmailValue(inputs, values);
    }
    if (!values.phone) {
        checkPhoneValue(inputs, values);
    }
    return hasError;
}

/**
 * Validates empty name input and displays an error.
 * @param {Object} inputs - The input elements.
 * @param {Object} values - The current input values.
 */
function checkNameValue(inputs, values) {
    inputs.nameInput.classList.add('error');
    document.getElementById('editNamePlaceholderError').innerHTML = "Please enter a name.";
    document.getElementById('editNamePlaceholderError').classList.add('visible');
    hideEditErrorMessages('editNamePlaceholderError', 'contactNameEdit');
    hasError = true;
}

/**
 * Validates empty email input and displays an error.
 * @param {Object} inputs - The input elements.
 * @param {Object} values - The current input values.
 */
function checkEmailValue(inputs, values) {
    inputs.emailInput.classList.add('error');
    document.getElementById('editEmailPlaceholderError').innerHTML = "Please enter an e-mail adress.";
    document.getElementById('editEmailPlaceholderError').classList.add('visible');
    hideEditErrorMessages('editEmailPlaceholderError', 'contactEmailEdit');
    hasError = true;
}

/**
 * Validates empty phone input and displays an error.
 * @param {Object} inputs - The input elements.
 * @param {Object} values - The current input values.
 */
function checkPhoneValue(inputs, values) {
    inputs.phoneInput.classList.add('error');
    document.getElementById('editPhonePlaceholderError').innerHTML = "Please enter a phone number.";
    document.getElementById('editPhonePlaceholderError').classList.add('visible');
    hideEditErrorMessages('editPhonePlaceholderError', 'contactPhoneEdit');
    hasError = true;
}