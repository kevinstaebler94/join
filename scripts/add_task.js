let contactArr = [];
let assignedArr = [];
let prioBtn = 'medium';
let subtasksArr = [];
let newSubtaskArr = [];
let currentTaskId = 0;
let contacts;
let isOpen = false;
let addedSubtask = false;
let colors = [
    "#9327ff",
    "#1fd7c1",
    "#fc71ff",
    "#00bee8",
    "#ffbb2b",
    "#ffe62b",
    "#ff4646"
];
let initialColor = {};

/**
 * Unchecks a specific checkbox by index.
 * @param {number} nameIndex - Index of the checkbox to uncheck.
 */
function checkCheckbox(nameIndex) {
    let myCheckbox = document.getElementById(`checkbox${nameIndex}`);
    myCheckbox.checked = false;
}

/**
 * Toggles the open/closed state of a dropdown.
 */
function toggleOpen() {
    isOpen = !isOpen;
}

/**
 * Checks if dropdown is open and focuses the input if true.
 * @param {HTMLInputElement} assignedInput - Input element to focus.
 */
function checkIsOpen(assignedInput) {
    if (isOpen) {
        getContact();
        assignedInput.focus();
        assignedInput.value = '';
    } else {
        assignedInput.blur();
    }
}

/**
 * Toggles the name selection dropdown and updates UI.
 */
function toggleDropdownName() {
    toggleOpen();
    let customDropdownName = document.getElementById('customDropdownName');
    let dropdown = document.getElementById('dropdownListName');
    let dropdownIcon = document.getElementById('dropdownIconName');
    let listContainer = document.getElementById('contactListContainer');
    let assignedInput = document.getElementById('assignedInput');
    customDropdownName.classList.add('activeBorder');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
    listContainer.classList.toggle('dNone');
    checkIsOpen(assignedInput);
}

/**
 * Closes the name selection dropdown and updates UI.
 */
function closeDropdownName() {
    let customDropdownName = document.getElementById('customDropdownName');
    let dropdown = document.getElementById('dropdownListName');
    let dropdownIcon = document.getElementById('dropdownIconName');
    customDropdownName.classList.remove('activeBorder');
    dropdown.classList.add('dNone');
    dropdownIcon.classList.remove('rotate');
}

/**
 * Toggles the category dropdown UI.
 */
function toggleDropdownCategory() {
    let customDropdownCategory = document.getElementById('customDropdownCategory');
    let dropdown = document.getElementById('dropdownListCategory');
    let dropdownIcon = document.getElementById('dropdownIconCategory');
    customDropdownCategory.classList.toggle('activeBorder');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
}

/**
 * Sets the priority button based on selected value.
 * @param {string} priority - 'urgent', 'medium', or 'low'.
 */
function selectPriority(priority) {
    let urgentBtn = document.getElementById('priorityUrgentBtn');
    let mediumBtn = document.getElementById('priorityMediumBtn');
    let lowBtn = document.getElementById('priorityLowBtn');
    let urgentIcon = document.getElementById('urgentIcon');
    let mediumIcon = document.getElementById('mediumIcon');
    let lowIcon = document.getElementById('lowIcon');
    let urgentIconWhite = document.getElementById('urgentIconWhite');
    let mediumIconWhite = document.getElementById('mediumIconWhite');
    let lowIconWhite = document.getElementById('lowIconWhite');
    resetPriorityClassList(urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon, urgentIconWhite, mediumIconWhite, lowIconWhite);
    setPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon, urgentIconWhite, mediumIconWhite, lowIconWhite);
}

/**
 * Resets priority button classes to default state.
 */
function resetPriorityClassList(urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon, urgentIconWhite, mediumIconWhite, lowIconWhite) {
    urgentBtn.classList.add('hoverBtn');
    urgentBtn.classList.remove('activeUrgentBtn');
    urgentIcon.classList.remove('dNone');
    urgentIconWhite.classList.add('dNone');
    mediumBtn.classList.add('hoverBtn');
    mediumBtn.classList.remove('activeMediumBtn');
    mediumIcon.classList.remove('dNone');
    mediumIconWhite.classList.add('dNone');
    lowBtn.classList.add('hoverBtn');
    lowBtn.classList.remove('activeLowBtn');
    lowIcon.classList.remove('dNone');
    lowIconWhite.classList.add('dNone');
}

/**
 * Formats date input into DD/MM/YYYY format.
 * @param {HTMLInputElement} input - The date input element.
 */
function formatDate(input) {
    let value = input.value.replace(/\D/g, "");
    let formattedValue = "";
    if (value.length > 0) {
        formattedValue += value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += "/" + value.substring(2, 4);
    }
    if (value.length > 4) {
        formattedValue += "/" + value.substring(4, 8);
    }
    input.value = formattedValue;
}

/**
 * Updates the selected category label and closes the dropdown.
 * @param {string} myCategory - Selected category name.
 */
function selectCategory(myCategory) {
    let selectedCategory = document.getElementById('selectedCategory');
    selectedCategory.innerHTML = `${myCategory}`;
    toggleDropdownCategory();
}

/**
 * Initializes an event listener for the subtask input.
 */
function initSubtaskInputListener() {
    const subtaskInput = document.getElementById('subtaskInput');
    if (!subtaskInput) return;
    subtaskInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getSubtask();
        }
    });
}

/**
 * Deletes a subtask from the list by index and re-renders.
 * @param {number} subtaskIndex - Index of subtask to delete.
 */
function deleteSubtask(subtaskIndex) {
    subtasksArr.splice(subtaskIndex, 1);
    renderSubtasks();
}

/**
 * Shows edit icons on hover.
 * @param {HTMLElement} element - Element containing icons.
 */
function showEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.remove('dNone');
}

/**
 * Hides edit icons when not hovered.
 * @param {HTMLElement} element - Element containing icons.
 */
function hideEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.add('dNone');
}

/**
 * Displays an image overlay when a task is added, then redirects.
 */
function showAddedBoardImg() {
    let overlay = document.getElementById('overlayBoardImg');
    let addedBoardImg = document.getElementById('addedBoardImg');
    overlay.classList.remove('dNone');
    addedBoardImg.classList.remove('dNone');
    setTimeout(() => {
        window.location.href = "./board.html";
    }, 2000);
}

/**
 * Clears all input fields and UI elements for the add-task form.
 */
function clearAddTask() {
    let titleInput = document.getElementById('titleInput');
    let descriptionInput = document.getElementById('taskDescription');
    let dateInput = document.getElementById('dateInput');
    let assignedContainer = document.getElementById('assignedContainer');
    let subtaskInput = document.getElementById('subtaskInput');
    let subtaskList = document.getElementById('subtaskList');
    let assignedCounter = document.getElementById('assignedCounter');
    deleteTaskValues(titleInput, descriptionInput, dateInput, assignedContainer, subtaskInput, subtaskList, assignedCounter);
    clearRequired();
}

function clearRequired() {
    let titleInput = document.getElementById('titleInput');
    let requiredTitle = document.getElementById('requiredTitle');
    let dateInput = document.getElementById('dateInput');
    let requiredDate = document.getElementById('requiredDate');
    let categoryInput = document.getElementById('customDropdownCategory');
    let requiredCategory = document.getElementById('requiredCategory');
    titleInput.classList.remove('required');
    requiredTitle.innerHTML = '';
    dateInput.classList.remove('required');
    requiredDate.innerHTML = '';
    categoryInput.classList.remove('required');
    requiredCategory.innerHTML = '';
}

/**
 * Resets values in the add-task form fields and UI.
 */
function deleteTaskValues(titleInput, descriptionInput, dateInput, assignedContainer, subtaskInput, subtaskList, assignedCounter) {
    titleInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '';
    assignedContainer.innerHTML = '';
    assignedArr = [];
    subtaskInput.value = '';
    subtaskList.innerHTML = '';
    assignedCounter.innerHTML = '';
    selectPriority('medium');
    closeDropdownName();
    selectCategory('Select category');
    toggleDropdownCategory();
}

/**
 * Loads and stores contacts from backend for dropdown display.
 */
async function getContact() {
    let contacts = await getData("/users/" + loggedInUser + "/contacts");
    contactArr = [];
    for (let key in contacts) {
        if (contacts.hasOwnProperty(key)) {
            contactArr.push(contacts[key]);
            color = getColorFromName(contacts[key].name);
        }
    }
    renderFilteredContacts();
    updateCheckedListElements();
}

/**
 * Filters the displayed contacts based on user input.
 * @param {string} value - Text input to filter contacts.
 */
function filterContacts(value) {
    renderFilteredContacts(value);
}

/**
 * Adds selected contacts to the assigned array.
 * @param {string[]} assignedContacts - List of contact names to assign.
 */
function pushAssignedContacts(assignedContacts) {
    assignedContacts.forEach(assignedContact => {
        assignedArr.push(assignedContact);

    });
}

/**
 * Handles checking/unchecking assigned contact checkbox and updates UI.
 * @param {HTMLInputElement} checkboxElement - The checkbox element clicked.
 */
function checkAssignedContact(checkboxElement) {
    let assignedContainer = document.getElementById('assignedContainer');
    let checkedName = checkboxElement.dataset.name;
    let index = assignedArr.indexOf(checkedName);
    let listElement = document.getElementById('listName' + checkboxElement.dataset.name);
    checkCurrentCheckbox(checkboxElement, checkedName, index, listElement);
    assignedContainer.innerHTML = '';
    assignedArr.slice(0, 3).forEach(contact => {
        assignedContainer.innerHTML += `<p id="contactAssignedInitial${contact}" class="contactInitial">${getInitials(contact)}</p>`;
        getContactInitialColor(contact);

    });
    countAssignedAmount();
}

function countAssignedAmount() {
    let assignedCounter = document.getElementById('assignedCounter');
    let counterHigherThree = assignedArr.length - 3;
    if (assignedArr.length > 3) {
        assignedCounter.classList.remove('dNone');
    } else {
        assignedCounter.classList.add('dNone');
    }
    assignedCounter.innerHTML = '+' + counterHigherThree;
}

/**
 * Updates checkbox state and assigned contacts list.
 */
function checkCurrentCheckbox(checkboxElement, checkedName, index, listElement) {
    if (checkboxElement.checked) {
        assignedArr.push(checkedName);
        listElement.classList.add('checked');
    } else {
        if (index > -1) {
            assignedArr.splice(index, 1);
            listElement.classList.remove('checked');
        }
    }
}

function updateCheckedListElements() {
    let listElements = document.querySelectorAll('.listElement');
    listElements.forEach(listElement => {
        let checkbox = listElement.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            listElement.classList.add('checked');
        } else {
            listElement.classList.remove('checked');
        }
    });
}

/**
 * Returns initials from a full name.
 * @param {string} name - Full name string.
 * @returns {string} - Uppercase initials.
 */
function getInitials(name) {
    if (!name) {
        return;
    }
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}