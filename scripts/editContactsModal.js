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
                    </div>
                    <div id="nameError" class="inputError dNone">Fehlertext</div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="email" placeholder="Email" id="contactEmailEdit" required>
                        <img class="inputIcon" src="./assets/img/mail.svg">
                    </div>
                    <div id="emailError" class="inputError dNone">Fehlertext</div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="text" placeholder="Phone" id="contactPhoneEdit" required>
                        <img class="inputIcon" src="./assets/img/phone.svg">
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
    let contactId = originalContactId;
    let updatedContact = {
        name: name,
        email: email,
        phone: phone
    };

    try {
        await putData('/contacts', updatedContact, contactId);
        closeContactsModal();
        await renderContacts();
    } catch (error) {
        console.error('Error while updating contact:', error);
    }
}

async function validateEditContactInput() {
    let nameInput = document.getElementById('contactNameEdit');
    let emailInput = document.getElementById('contactEmailEdit');
    let phoneInput = document.getElementById('contactPhoneEdit');

    if (!nameInput || !emailInput || !phoneInput) return false;

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();

    let hasError = false;

    if (!name) {
        nameInput.classList.add('error');
        hasError = true;
    }

    if (!email) {
        emailInput.classList.add('error');
        hasError = true;
    }

    if (!phone) {
        phoneInput.classList.add('error');
        hasError = true;
    }

    return !hasError;
}
