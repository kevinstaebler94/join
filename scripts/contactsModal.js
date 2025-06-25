/**
 * Opens the contacts modal by displaying the overlay and modal container,
 * then loads the modal structure and shows the modal content with animation.
 */

function openContactsModal() {
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('contactsAddModal');
    overlay.classList.remove('dNone');
    container.classList.remove('dNone');
    getContactsModalStructure();
    setTimeout(() => {
        let modal = document.getElementById('modalAddContent');
        modal.classList.add('show');
    }, 10);
}

/**
 * Closes the contacts modal by hiding the modal content and then
 * the overlay and modal container with a delay for animation.
 */
function closeContactsModal() {
    let modal = document.getElementById('modalAddContent');
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('contactsAddModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            overlay.classList.add('dNone');
            container.classList.add('dNone');
        }, 300);
    }
}

/**
 * Clears the input fields in the contacts modal and removes error states.
 */
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

/**
 * Validates the contact input fields for emptiness and duplicates.
 * @returns {Promise<boolean>} True if inputs are valid, false otherwise.
 */
async function validateContactInput() {
    let inputs = getContactInputs();
    let values = {
        name: inputs.nameInput.value.trim().toLowerCase(),
        email: inputs.emailInput.value.trim().toLowerCase(),
        phone: inputs.phoneInput.value.trim()
    };
    resetContactInputErrors(inputs);
    if (checkEmptyFields(inputs, values)) return false;
    let existingContacts = await getData('/users/' + loggedInUser + '/contacts') || {};
    if (checkDuplicateFields(inputs, values, existingContacts)) return false;
    let emailValid = await validateAddEmailFormat();
    let phoneValid = await validatePhoneNumberFormat();
    return emailValid && phoneValid;
}

/**
 * Retrieves references to the contact input fields and their error elements.
 * @returns {Object} Object containing input and error element references.
 */
function getContactInputs() {
    return {
        nameInput: document.getElementById('contactName'),
        emailInput: document.getElementById('contactEmail'),
        phoneInput: document.getElementById('contactPhone'),
        nameError: document.getElementById('nameError'),
        emailError: document.getElementById('emailError'),
        phoneError: document.getElementById('phoneError')
    };
}

/**
 * Resets all input error states and placeholder error messages for contact inputs.
 * @param {Object} inputs - Object containing the input and error elements.
 */
function resetContactInputErrors(inputs) {
    [inputs.nameInput, inputs.emailInput, inputs.phoneInput].forEach(input => input.classList.remove('error'));
    [inputs.nameError, inputs.emailError, inputs.phoneError].forEach(el => {
        el.classList.add('dNone');
        el.innerText = "";
    });
    ['namePlaceholderError', 'emailPlaceholderError', 'phonePlaceholderError'].forEach(id => {
        let el = document.getElementById(id);
        el.classList.remove('visible');
        el.innerText = "Placeholder";
    });
}

/**
 * Checks for empty input fields and shows relevant error messages.
 * @param {Object} inputs - Input elements.
 * @param {Object} values - Trimmed values of inputs.
 * @returns {boolean} True if any field is empty, otherwise false.
 */
function checkEmptyFields(inputs, values) {
    let hasError = false;
    if (!values.name) {
        styleNameValues(inputs);
    }
    if (!values.email) {
        styleEmailValues(inputs);
    }
    if (!values.phone) {
        stylePhoneValues(inputs);
    }
    return hasError;
}

/**
 * Displays an error if the name input field is empty.
 *
 * @param {Object} inputs - Object containing the name input element.
 */
function styleNameValues(inputs) {
    inputs.nameInput.classList.add('error');
    document.getElementById('namePlaceholderError').innerHTML = "Please enter a name.";
    document.getElementById('namePlaceholderError').classList.add('visible');
    hideErrorMessages('namePlaceholderError', 'contactName');
    hasError = true;
}

/**
 * Displays an error if the email input field is empty.
 *
 * @param {Object} inputs - Object containing the email input element.
 */
function styleEmailValues(inputs) {
    inputs.emailInput.classList.add('error');
    document.getElementById('emailPlaceholderError').innerHTML = "Please enter an e-mail adress.";
    document.getElementById('emailPlaceholderError').classList.add('visible');
    hideErrorMessages('emailPlaceholderError', 'contactEmail');
    hasError = true;
}

/**
 * Displays an error if the phone input field is empty.
 *
 * @param {Object} inputs - Object containing the phone input element.
 */
function stylePhoneValues(inputs) {
    inputs.phoneInput.classList.add('error');
    document.getElementById('phonePlaceholderError').innerHTML = "Please enter a phone number.";
    document.getElementById('phonePlaceholderError').classList.add('visible');
    hideErrorMessages('phonePlaceholderError', 'contactPhone');
    hasError = true;
}

/**
 * Checks for duplicate values in the existing contacts and shows error messages.
 * @param {Object} inputs - Input elements.
 * @param {Object} values - Trimmed values of inputs.
 * @param {Object} existingContacts - Existing contacts data.
 * @returns {boolean} True if duplicates found, otherwise false.
 */
function checkDuplicateFields(inputs, values, existingContacts) {
    let hasError = false;
    for (let key in existingContacts) {
        let contact = existingContacts[key];
        if (contact.name?.trim().toLowerCase() === values.name) {
            styleDuplicateName(inputs);
        }
        if (contact.phone?.trim() === values.phone) {
            styleDuplicatePhone(inputs);
        }
    }
    return hasError;
}

/**
 * Displays an error if the entered name already exists.
 *
 * @param {Object} inputs - Object containing the name input element.
 */
function styleDuplicateName(inputs) {
    inputs.nameInput.classList.add('error');
    document.getElementById('namePlaceholderError').innerHTML = "Name already used.";
    document.getElementById('namePlaceholderError').classList.add('visible');
    hideErrorMessages('namePlaceholderError', inputs.nameInput.id);
    hasError = true;
}

/**
 * Displays an error if the entered email already exists.
 *
 * @param {Object} inputs - Object containing the email input element.
 */
function styleDuplicateEmail(inputs) {
    inputs.emailInput.classList.add('error');
    document.getElementById('emailPlaceholderError').innerHTML = "E-Mail already used.";
    document.getElementById('emailPlaceholderError').classList.add('visible');
    hideErrorMessages('emailPlaceholderError', inputs.emailInput.id);
    hasError = true;
}

/**
 * Displays an error if the entered phone number already exists.
 *
 * @param {Object} inputs - Object containing the phone input element.
 */
function styleDuplicatePhone(inputs) {
    inputs.phoneInput.classList.add('error');
    document.getElementById('phonePlaceholderError').innerHTML = "Phone number already used.";
    document.getElementById('phonePlaceholderError').classList.add('visible');
    hideErrorMessages('phonePlaceholderError', inputs.phoneInput.id);
    hasError = true;
}

/**
 * Hides error messages after a timeout and removes error styling from inputs.
 * @param {string} id - The ID of the error message element.
 * @param {string} inputId - The ID of the input field.
 */
function hideErrorMessages(id, inputId) {
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
 * Validates the format of the email input and checks if it is already used.
 * @returns {Promise<boolean>} True if email format is valid and not duplicate, false otherwise.
 */
async function validateAddEmailFormat() {
    let emailInput = document.getElementById("contactEmail");
    let email = emailInput.value.trim().toLowerCase();
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMsgEmail = document.getElementById("emailError");
    if (emailInput.value == '') {
        return;
    }
    if (!pattern.test(email)) {
        patternTestEmail(emailInput, errorMsgEmail);
        return false;
    }
    let existingContacts = await getData('/users/' + loggedInUser + '/contacts') || {};
    let exists = loopExistingContactsAdd(existingContacts, emailInput, errorMsgEmail, email);
    if (exists === false) return false;
    errorMsgEmail.classList.add("dNone");
    return true;
}

/**
 * Validates email format and displays a temporary error message if invalid.
 *
 * @param {HTMLElement} emailInput - The input element for the email address.
 * @param {HTMLElement} errorMsgEmail - The element to display the error message.
 */
function patternTestEmail(emailInput, errorMsgEmail) {
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
 * Checks if a given email already exists in the list of contacts when adding a new one.
 * Displays an error message if the email is already used.
 *
 * @param {Object} existingContacts - List of existing contacts.
 * @param {HTMLElement} emailInput - The email input element.
 * @param {HTMLElement} errorMsgEmail - The error message display element.
 * @param {string} email - The email to check.
 * @returns {boolean|undefined} - Returns false if a duplicate email is found.
 */
function loopExistingContactsAdd(existingContacts, emailInput, errorMsgEmail, email) {
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
 * Validates the phone number against a German number format.
 * Displays an error if the pattern does not match.
 *
 * @returns {Promise<boolean>} - Resolves to true if valid, false otherwise.
 */
async function validatePhoneNumberFormat() {
    let phone = document.getElementById("contactPhone");
    let pattern = /^(\+49\s?|0)[1-9][0-9\s\-]{3,}$/;
    let errorMsgPhone = document.getElementById("phoneError");
    let value = phone.value.trim();
    if (!pattern.test(value)) {
        patternTestPhone(phone, errorMsgPhone);
        return false;
    }
    errorMsgPhone.classList.add("dNone");
    return true;
}

/**
 * Displays a temporary error message if the phone number format is invalid.
 *
 * @param {HTMLElement} phone - The phone input element.
 * @param {HTMLElement} errorMsgPhone - The error message element.
 */
function patternTestPhone(phone, errorMsgPhone) {
    if (phone.value == '') return;
    phone.classList.add("error");
    errorMsgPhone.innerText = "Please enter a valid German phone number (e.g. +49 123 456789).";
    errorMsgPhone.classList.remove("dNone");
    setTimeout(() => {
        errorMsgPhone.classList.add("dNone");
        errorMsgPhone.innerText = "";
        phone.classList.remove("error");
    }, 3000);
}