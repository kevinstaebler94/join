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
                        <input class="inputFields" type="tel" placeholder="+49..." id="contactPhone" required>
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
 * Renders the HTML structure for the edit contact modal.
 */
function getEditContactsModalStructure() {
    let container = document.getElementById('contactsEditModal');
    container.innerHTML = `
    <div class="modalMainContent" id="modalEditContent">
        <div class="headlineSection">
        <div class="modalMobileCloseButtonWrapper">
        <button class="modalMobileCloseButton" onclick="closeEditContactsModal()"><img src="./assets/img/plusIconWhite.svg"></button>
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
                        <span id="editNamePlaceholderError" class="errorMsg">Placeholder</span>
                        <div id="nameErrorEdit" class="inputError dNone">Fehlertext</div>
                    </div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="email" placeholder="Email" id="contactEmailEdit" required>
                        <img class="inputIcon" src="./assets/img/mail.svg">
                        <span id="editEmailPlaceholderError" class="errorMsg">Placeholder</span>
                        <div id="emailErrorEdit" class="inputError dNone">Fehlertext</div>
                    </div>
                    <div class="inputFieldWrapper">
                        <input class="inputFields" type="tel" placeholder="+49..." id="contactPhoneEdit" required>
                        <img class="inputIcon" src="./assets/img/phone.svg">
                        <span id="editPhonePlaceholderError" class="errorMsg">Placeholder</span>
                        <div id="phoneErrorEdit" class="inputError dNone">Fehlertext</div>
                    </div>
                </div>
                <div class="buttonsContainer">
                <button onclick="deleteContact('${currentContactId}')" class="modalCancelButton">Delete</button>
                <button onclick="updateContacts()" class="modalSafeButton" type="button">Save <img src="./assets/img/createIcon.svg"></button>
                </div>
            </div>
        </div>
    </div>`
}