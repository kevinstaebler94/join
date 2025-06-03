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

    if (window.innerWidth > 800) {
        let mainContent = document.querySelector('.mainContent');
        mainContent.style.gap = '32px';
    } else {
        let mainContent = document.querySelector('.mainContent');
        mainContent.style.gap = '0px';
    }
    setTimeout(() => {
        const modal = document.getElementById('modalAddContent');
        modal.classList.add('show');
    }, 10);
}

/**
 * Builds and injects the HTML structure for the contacts modal.
 */
function getContactsModalStructure() {
    let container = document.getElementById('contactsAddModal');
    container.innerHTML = `
    <div class="modalMainContent" id="modalAddContent">
        <div class="headlineSection">
            <img class="contactsModalImage" src="./assets/img/joinLogoSidebar.svg" alt="">
            <div class="modalMobileCloseButtonWrapper">
            <button class="modalMobileCloseButton" onclick="closeContactsModal()"><img src="./assets/img/plusIconWhite.svg"></button>
            </div>
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
                        <span id="namePlaceholderError" class="errorMsg">Placeholder</span>
                        <div id="nameError" class="inputError dNone">Fehlertext</div>
                    </div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="email" placeholder="Email" id="contactEmail" required>
                        <img class="inputIcon" src="./assets/img/mail.svg">
                        <span id="emailPlaceholderError" class="errorMsg">Placeholder</span>
                        <div id="emailError" class="inputError dNone">Fehlertext</div>
                    </div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="tel" placeholder="Phone" id="contactPhone" required>
                        <img class="inputIcon" src="./assets/img/phone.svg">
                        <span id="phonePlaceholderError" class="errorMsg">Placeholder</span>
                        <div id="phoneError" class="inputError dNone">Fehlertext</div>
                    </div>
                </div>
                <div class="buttonsContainer">
                <button onclick="clearInputFields()" class="modalCancelButton">
                Cancel 
                <div class="modalCancelButtonImgContainer">
                <img class="defaultIcon" src="./assets/img/cancelIcon.svg">
                <img class="hoverIcon" src="./assets/img/cancelIconHover.svg"</button>
                </div>
                <button onclick="pushContacts('${loggedInUser}')" class="modalCreateButton" type="submit">
                <span>Create Contact</span>
                <img src="./assets/img/createIcon.svg">
                </button>
                </div>
            </div>
        </div>
    </div>`
}

/**
 * Closes the contacts modal by hiding the modal content and then
 * the overlay and modal container with a delay for animation.
 */
function closeContactsModal() {
    let modal = document.getElementById('modalAddContent');
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('contactsAddModal');
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
        inputs.nameInput.classList.add('error');
        document.getElementById('namePlaceholderError').innerHTML = "Please enter a name.";
        document.getElementById('namePlaceholderError').classList.add('visible');
        hideErrorMessages('namePlaceholderError', 'contactName');
        hasError = true;
    }

    if (!values.email) {
        inputs.emailInput.classList.add('error');
        document.getElementById('emailPlaceholderError').innerHTML = "Please enter an e-mail adress.";
        document.getElementById('emailPlaceholderError').classList.add('visible');
        hideErrorMessages('emailPlaceholderError', 'contactEmail');
        hasError = true;
    }

    if (!values.phone) {
        inputs.phoneInput.classList.add('error');
        document.getElementById('phonePlaceholderError').innerHTML = "Please enter a phone number.";
        document.getElementById('phonePlaceholderError').classList.add('visible');
        hideErrorMessages('phonePlaceholderError', 'contactPhone');
        hasError = true;
    }
    return hasError;
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
            inputs.nameInput.classList.add('error');
            document.getElementById('namePlaceholderError').innerHTML = "Name already used.";
            document.getElementById('namePlaceholderError').classList.add('visible');
            hideErrorMessages('namePlaceholderError', inputs.nameInput.id);
            hasError = true;
        }

        if (contact.email?.trim().toLowerCase() === values.email) {
            inputs.emailInput.classList.add('error');
            document.getElementById('emailPlaceholderError').innerHTML = "E-Mail already used.";
            document.getElementById('emailPlaceholderError').classList.add('visible');
            hideErrorMessages('emailPlaceholderError', inputs.emailInput.id);
            hasError = true;
        }

        if (contact.phone?.trim() === values.phone) {
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

    if (!pattern.test(email)) {
        emailInput.classList.add("error");
        errorMsgEmail.innerText = "Please enter a valid email address.";
        errorMsgEmail.classList.remove("dNone");
        setTimeout(() => {
            errorMsgEmail.classList.add("dNone");
            errorMsgEmail.innerText = "";
            emailInput.classList.remove("error");
        }, 3000);
        return false;
    }

    let existingContacts = await getData("/contacts") || {};
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

    errorMsgEmail.classList.add("dNone");
    return true;
}

async function validatePhoneNumberFormat() {
    let phone = document.getElementById("contactPhone");
    let pattern = /^\d+$/;
    let errorMsgPhone = document.getElementById("phoneError");
    let value = phone.value.trim();

    if (!pattern.test(value)) {
        phone.classList.add("error");
        errorMsgPhone.innerText = "Please enter a valid phone number (only digits).";
        errorMsgPhone.classList.remove("dNone");
        setTimeout(() => {
            errorMsgPhone.classList.add("dNone");
            errorMsgPhone.innerText = "";
            phone.classList.remove("error");
        }, 3000);
        return false;
    }

    errorMsgPhone.classList.add("dNone");
    return true;
}