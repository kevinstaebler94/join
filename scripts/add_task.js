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
    "#9327ff", // lila
    "#1fd7c1", // grün
    "#fc71ff", // pink
    "#00bee8", // blau
    "#ffbb2b", // orange
    "#ffe62b", // gelb
    "#ff4646" // rot
];

let initialColor = {};

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.getElementById('dropdownListName').classList.add('dNone');
        document.getElementById('dropdownIconName').classList.remove('rotate');
        document.getElementById('customDropdownName').classList.remove('activeBorder');
        document.getElementById('contactListContainer').classList.add('dNone');
        document.getElementById('customDropdownCategory').classList.remove('activeBorder');
        document.getElementById('dropdownListCategory').classList.add('dNone');
        document.getElementById('dropdownIconCategory').classList.remove('rotate');
    }
});

function checkCheckbox(nameIndex) {
    let myCheckbox = document.getElementById(`checkbox${nameIndex}`);
    myCheckbox.checked = false;
}

function toggleOpen() {
    isOpen = !isOpen;
}

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
    if (isOpen) {

        getContact();
        assignedInput.focus();
        assignedInput.value = '';
    } else {
        assignedInput.blur();
    }
}

function closeDropdownName() { //check if needed
    let customDropdownName = document.getElementById('customDropdownName');
    let dropdown = document.getElementById('dropdownListName');
    let dropdownIcon = document.getElementById('dropdownIconName');
    customDropdownName.classList.remove('activeBorder');
    dropdown.classList.add('dNone');
    dropdownIcon.classList.remove('rotate');
}

function toggleDropdownCategory() {
    let customDropdownCategory = document.getElementById('customDropdownCategory');
    let dropdown = document.getElementById('dropdownListCategory');
    let dropdownIcon = document.getElementById('dropdownIconCategory');
    customDropdownCategory.classList.toggle('activeBorder');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
}

// window.addEventListener('mousedown', function (event) {
//     const modal = document.getElementById('addTaskModal');
//     if (!modal || modal.classList.contains('dNone')) return;
//     setTimeout(() => {
//         const wrappers = document.querySelectorAll('.customSelectWrapper');
//         const contactListContainer = document.getElementById('contactListContainer');
//         const assignedInput = document.getElementById('assignedInput');
//         const clickInsideContactList = contactListContainer.contains(event.target);
//         const clickInsideAssignedInput = assignedInput.contains(event.target);
//         let clickInsideAnyWrapper = false;
//         wrappers.forEach(wrapper => {
//             if (wrapper.contains(event.target)) {
//                 clickInsideAnyWrapper = true;
//             }
//         });
//         if (!clickInsideAnyWrapper && !clickInsideContactList && !clickInsideAssignedInput) {
//             document.getElementById('dropdownListName').classList.add('dNone');
//             document.getElementById('dropdownIconName').classList.remove('rotate');
//             document.getElementById('customDropdownName').classList.remove('activeBorder');
//             document.getElementById('customDropdownCategory').classList.remove('activeBorder');
//             document.getElementById('dropdownListCategory').classList.add('dNone');
//             document.getElementById('dropdownIconCategory').classList.remove('rotate');
//             contactListContainer.classList.add('dNone');
//             isOpen = false;
//             if (assignedInput.value == '') {
//                 assignedInput.value = 'Assigned to';
//             }
//         }
//     }, 30);
// });

window.addEventListener('mousedown', function (event) {
    const modal = document.getElementById('addTaskModal');

    // Wenn Modal existiert und geschlossen ist → abbrechen
    if (modal && modal.classList.contains('dNone')) return;

    setTimeout(() => {
        const wrappers = document.querySelectorAll('.customSelectWrapper');
        const contactListContainer = document.getElementById('contactListContainer');
        const assignedInput = document.getElementById('assignedInput');

        // Wenn keine Dropdowns auf der Seite vorhanden → abbrechen
        if (!wrappers.length && !contactListContainer && !assignedInput) return;

        let clickInsideAnyWrapper = false;
        wrappers.forEach(wrapper => {
            if (wrapper.contains(event.target)) {
                clickInsideAnyWrapper = true;
            }
        });

        const clickInsideContactList = contactListContainer?.contains(event.target) ?? false;
        const clickInsideAssignedInput = assignedInput?.contains(event.target) ?? false;

        if (!clickInsideAnyWrapper && !clickInsideContactList && !clickInsideAssignedInput) {
            document.getElementById('dropdownListName')?.classList.add('dNone');
            document.getElementById('dropdownIconName')?.classList.remove('rotate');
            document.getElementById('customDropdownName')?.classList.remove('activeBorder');
            document.getElementById('customDropdownCategory')?.classList.remove('activeBorder');
            document.getElementById('dropdownListCategory')?.classList.add('dNone');
            document.getElementById('dropdownIconCategory')?.classList.remove('rotate');
            contactListContainer?.classList.add('dNone');

            if (typeof isOpen !== 'undefined') {
                isOpen = false;
            }

            if (assignedInput && assignedInput.value === '') {
                assignedInput.value = 'Assigned to';
            }
        }
    }, 30);
});


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

function setPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon, urgentIconWhite, mediumIconWhite) {
    if (priority === 'urgent') {
        urgentBtn.classList.remove('hoverBtn');
        urgentBtn.classList.add('activeUrgentBtn');
        urgentIcon.classList.add('dNone');
        urgentIconWhite.classList.remove('dNone');
        prioBtn = 'urgent';
    } else if (priority === 'medium') {
        mediumBtn.classList.remove('hoverBtn');
        mediumBtn.classList.add('activeMediumBtn');
        mediumIcon.classList.add('dNone');
        mediumIconWhite.classList.remove('dNone');
        prioBtn = 'medium';
    } else if (priority === 'low') {
        lowBtn.classList.remove('hoverBtn');
        lowBtn.classList.add('activeLowBtn');
        lowIcon.classList.add('dNone');
        lowIconWhite.classList.remove('dNone');
        prioBtn = 'low';
    }
}

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

function selectCategory(myCategory) {
    let selectedCategory = document.getElementById('selectedCategory');
    selectedCategory.innerHTML = `${myCategory}`;
    toggleDropdownCategory();
}

function initSubtaskInputListener() {
    const subtaskInput = document.getElementById('subtaskInput');
    if (!subtaskInput) return;
    subtaskInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getSubtask();
        }
    });
}


function getSubtask() {
    let subtaskInput = document.getElementById('subtaskInput');
    let subtaskList = document.getElementById('subtaskList');
    let subtaskObj = { subtask: subtaskInput.value, done: false };
    let subtaskIndex = subtasksArr.length;
    if (!subtaskInput.value) {
        subtaskInput.classList.add('required');
        return;
    } if (subtaskInput.value.length > 0) {
        subtaskInput.classList.remove('required');
        subtaskList.innerHTML += `<li id="subtaskElement${subtaskIndex}">
    <div class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
        <span onclick="getEditSubtask(${subtaskIndex})" class="liText">
            <p class="liMarker"></p>
            <p id="subtaskValue${subtaskIndex}" class="subtaskWidth">${subtaskInput.value}</p>
        </span>
        <span id="editIconContainer" class="iconContainer dNone">
            <img onclick="getEditSubtask(${subtaskIndex})" class="editIcons" src="./assets/img/edit.svg" alt="">
            <span class="iconDivider">|</span>
            <img onclick="deleteSubtask(${subtaskIndex})" id="deleteIcon" class="editIcons" src="./assets/img/delete.svg" alt="">
        </span>
    </div>
</li>`;
        subtasksArr.push(subtaskObj);
        subtaskInput.value = '';
    }

}

function getEditSubtask(subtaskIndex) {
    let currentSubtask = subtasksArr[subtaskIndex];
    let subtaskElement = document.getElementById('subtaskElement' + subtaskIndex);
    subtaskElement.innerHTML = `<div class="newSubtaskListElement">
            <input id="editSubtaskInput${subtaskIndex}" class="newSubtaskInput" value="${currentSubtask.subtask}">
            <span class="iconContainer">
                <img onclick="deleteSubtask(${subtaskIndex})" class="editIcons" src="./assets/img/delete.svg" alt="">
                <span class="iconDivider">|</span>
                <img onclick="editSubtask(${subtaskIndex})" class="editIcons doneIcon" src="./assets/img/done.svg" alt="">
            </span>
        </div>`;
}

function editSubtask(subtaskIndex) {
    let input = document.getElementById('editSubtaskInput' + subtaskIndex);
    let newValue = input.value.trim();
    if (!newValue) return;
    subtasksArr[subtaskIndex].subtask = newValue;
    let subtaskElement = document.getElementById('subtaskElement' + subtaskIndex);
    subtaskElement.innerHTML = `
        <div class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
            <span onclick="getEditSubtask(${subtaskIndex})" class="liText">
                <p class="liMarker"></p>
                <p id="subtaskValue${subtaskIndex}" class="subtaskWidth">${newValue}</p>
            </span>
            <span id="editIconContainer" class="iconContainer dNone">
                <img onclick="getEditSubtask(${subtaskIndex})" class="editIcons" src="./assets/img/edit.svg" alt="">
                <span class="iconDivider">|</span>
                <img onclick="deleteSubtask(${subtaskIndex})" class="editIcons" src="./assets/img/delete.svg" alt="">
            </span>
        </div>`;
}

function deleteSubtask(subtaskIndex) {
    subtasksArr.splice(subtaskIndex, 1);
    renderSubtasks();
}

function renderSubtasks() {
    const subtaskList = document.getElementById('subtaskList');
    subtaskList.innerHTML = '';
    subtasksArr.forEach((subtaskObj, subtaskIndex) => {
        subtaskList.innerHTML += `
            <li id="subtaskElement${subtaskIndex}">
                <div class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
                    <span onclick="getEditSubtask(${subtaskIndex})" class="liText">
                        <p class="liMarker"></p>
                        <p id="subtaskValue${subtaskIndex}" class="subtaskWidth">${subtaskObj.subtask}</p>
                    </span>
                    <span id="editIconContainer" class="iconContainer dNone">
                        <img onclick="getEditSubtask(${subtaskIndex})" class="editIcons" src="./assets/img/edit.svg" alt="">
                        <span class="iconDivider">|</span>
                        <img onclick="deleteSubtask(${subtaskIndex})" class="editIcons" src="./assets/img/delete.svg" alt="">
                    </span>
                </div>
            </li>`;
    });
}


function showEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.remove('dNone');
}

function hideEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.add('dNone');
}

function checkValidation() {
    let titleInput = document.getElementById('titleInput');
    let requiredTitle = document.getElementById('requiredTitle');
    let dateInput = document.getElementById('dateInput');
    let requiredDate = document.getElementById('requiredDate');
    let selectedCategory = document.getElementById('selectedCategory');
    if (titleInput.value == '') {
        titleInput.classList.add('required');
        requiredTitle.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
    } else if (dateInput.value.length < 10) {
        dateInput.classList.add('required');
        requiredDate.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
    } else if (selectedCategory.innerHTML == 'Select category') {
        titleInput.classList.add('required');
    } else {
        pushTasks(loggedInUser, assignedArr);
        showAddedBoardImg();
    }
}

function showAddedBoardImg() {
    let overlay = document.getElementById('overlayBoardImg');
    let addedBoardImg = document.getElementById('addedBoardImg');
    overlay.classList.remove('dNone');
    addedBoardImg.classList.remove('dNone');
    setTimeout(() => {
        window.location.href = "./board.html";;
    }, 3000);
}

function clearAddTask() {
    let titleInput = document.getElementById('titleInput');
    let descriptionInput = document.getElementById('taskDescription');
    let dateInput = document.getElementById('dateInput');
    let assignedContainer = document.getElementById('assignedContainer');
    let subtaskInput = document.getElementById('subtaskInput');
    let subtaskList = document.getElementById('subtaskList');
    deleteTaskValues(titleInput, descriptionInput, dateInput, assignedContainer, subtaskInput, subtaskList)
}

function deleteTaskValues(titleInput, descriptionInput, dateInput, assignedContainer, subtaskInput, subtaskList) {
    titleInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '';
    assignedContainer.innerHTML = '';
    assignedArr = [];
    subtaskInput.value = '';
    subtaskList.innerHTML = '';
    selectPriority('medium');
    closeDropdownName();
    selectCategory('Select category');
    toggleDropdownCategory();
}

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
}

function renderFilteredContacts(filter = '') {
    const dropdownListName = document.getElementById('dropdownListName');
    const filteredContacts = contactArr.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    dropdownListName.innerHTML = '';
    filteredContacts.forEach(contact => {
        let isChecked = assignedArr.includes(contact.name) ? 'checked' : '';
        dropdownListName.innerHTML += `<label class="customCheckbox">
                                            <li id="listName${contact.name}" class="listElement">
                                                <div class="nameContainer">
                                                    <span id="initalContainer${contact.name}" class="initalIcon">${getInitials(contact.name)}</span>
                                                    <p>${contact.name}</p>
                                                </div>
                                                <input onclick="checkAssignedContact(this)" 
                                                    id="${contact.name}" 
                                                    type="checkbox" 
                                                    class="checkbox" 
                                                    name="selectedNames" 
                                                    data-name="${contact.name}" 
                                                    ${isChecked}>
                                                    <span class="icon"></span>
                                            </li>
                                        </label>`;
        styleInitalName(contact.name);
    });
}

function filterContacts(value) {
    renderFilteredContacts(value);
}

function pushAssignedContacts(assignedContacts) {
    assignedContacts.forEach(assignedContact => {
        assignedArr.push(assignedContact);

    });
}

function checkAssignedContact(checkboxElement) {
    let assignedContainer = document.getElementById('assignedContainer');
    let checkedName = checkboxElement.dataset.name;
    let index = assignedArr.indexOf(checkedName);
    let listElement = document.getElementById('listName' + checkboxElement.dataset.name);
    if (checkboxElement.checked) {
        assignedArr.push(checkedName);
        listElement.classList.add('checked');
    } else {
        if (index > -1) {
            assignedArr.splice(index, 1);
            listElement.classList.remove('checked');
        }
    }
    assignedContainer.innerHTML = '';
    assignedArr.forEach(contact => {
        assignedContainer.innerHTML += `<p id="contactAssignedInitial${contact}" class="contactInitial">${getInitials(contact)}</p>`;
        getContactInitialColor(contact);
    });
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}

document.addEventListener('DOMContentLoaded', function () {
    initSubtaskInputListener();
});

function getColorFromName(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i) + (i + 1);
    }
    let index = sum % colors.length;
    return colors[index];
}

function styleInitalName(contact) {
    let initalContainer = document.getElementById('initalContainer' + contact);
    let color = getColorFromName(contact);
    initalContainer.style.backgroundColor = color;
    initialColor[contact] = color;

}

function getContactInitialColor(contact) {
    let contactAssignedInitial = document.getElementById('contactAssignedInitial' + contact);
    contactAssignedInitial.style.backgroundColor = initialColor[contact];
}