function openContactsModal() {
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('contactsModal');

    overlay.classList.remove('dNone');
    container.classList.remove('dNone');
    getContactsModalStructure();

    setTimeout(() => {
        const modal = document.getElementById('modalContent');
        modal.classList.add('show');
    }, 10);
}

function getContactsModalStructure() {
    let container = document.getElementById('contactsModal');
    container.innerHTML = `
    <div class="modalMainContent" id="modalContent">
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
    let modal = document.getElementById('modalContent');
    let overlay = document.getElementById('modalOverlay');
    let container = document.getElementById('contactsModal');

    if (modal) {
        modal.classList.remove('show');

        setTimeout(() => {
            overlay.classList.add('dNone');
            container.classList.add('dNone');
        }, 300);
    }
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
    let inputs = getContactInputs();
    let values = {
        name: inputs.nameInput.value.trim().toLowerCase(),
        email: inputs.emailInput.value.trim().toLowerCase(),
        phone: inputs.phoneInput.value.trim()
    };

    resetContactInputErrors(inputs);

    if (checkEmptyFields(inputs, values)) return false;

    let existingContacts = await getData('/contacts') || {};

    if (checkDuplicateFields(inputs, values, existingContacts)) return false;

    return true;
}

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

function resetContactInputErrors(inputs) {
    [inputs.nameInput, inputs.emailInput, inputs.phoneInput].forEach(input => input.classList.remove('error'));
    [inputs.nameError, inputs.emailError, inputs.phoneError].forEach(el => {
        el.classList.add('dNone');
        el.innerText = "";
    });
}

function checkEmptyFields(inputs, values) {
    let hasError = false;

    if (!values.name) {
        inputs.nameInput.classList.add('error');
        inputs.nameError.innerText = "Please enter a name.";
        inputs.nameError.classList.remove('dNone');
        hasError = true;
    }

    if (!values.email) {
        inputs.emailInput.classList.add('error');
        inputs.emailError.innerText = "Please enter an e-mail adress.";
        inputs.emailError.classList.remove('dNone');
        hasError = true;
    }

    if (!values.phone) {
        inputs.phoneInput.classList.add('error');
        inputs.phoneError.innerText = "please enter a phone number.";
        inputs.phoneError.classList.remove('dNone');
        hasError = true;
    }

    return hasError;
}

function checkDuplicateFields(inputs, values, existingContacts) {
    let hasError = false;

    for (let key in existingContacts) {
        let contact = existingContacts[key];

        if (contact.name?.trim().toLowerCase() === values.name) {
            inputs.nameInput.classList.add('error');
            inputs.nameError.innerText = "Name already used.";
            inputs.nameError.classList.remove('dNone');
            hasError = true;
        }

        if (contact.email?.trim().toLowerCase() === values.email) {
            inputs.emailInput.classList.add('error');
            inputs.emailError.innerText = "E-Mail already used.";
            inputs.emailError.classList.remove('dNone');
            hasError = true;
        }

        if (contact.phone?.trim() === values.phone) {
            inputs.phoneInput.classList.add('error');
            inputs.phoneError.innerText = "Phone number already used.";
            inputs.phoneError.classList.remove('dNone');
            hasError = true;
        }
    }

    return hasError;
}