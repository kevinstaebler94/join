let contactArr = [];
let assignedArr = [];
let prioBtn = 'medium';
let subtasksArr = [];
let currentTaskId = 0;
let contacts;
let isOpen = false;
let colors = [
    "#9327ff", // lila
    "#1fd7c1", // grün
    "#fc71ff", // pink
    "#6e52ff", // blau
    "#ff7a02", // orange
    "#6e52ff", // gelb
];

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

window.addEventListener('mousedown', function (event) {
    const modal = document.getElementById('addTaskModal');
    if (!modal || modal.classList.contains('dNone')) return;
    setTimeout(() => {
        const wrappers = document.querySelectorAll('.customSelectWrapper');
        const contactListContainer = document.getElementById('contactListContainer');
        const assignedInput = document.getElementById('assignedInput');
        const clickInsideContactList = contactListContainer.contains(event.target);
        const clickInsideAssignedInput = assignedInput.contains(event.target);
        let clickInsideAnyWrapper = false;
        wrappers.forEach(wrapper => {
            if (wrapper.contains(event.target)) {
                clickInsideAnyWrapper = true;
            }
        });
        if (!clickInsideAnyWrapper && !clickInsideContactList && !clickInsideAssignedInput) {
            document.getElementById('dropdownListName').classList.add('dNone');
            document.getElementById('dropdownIconName').classList.remove('rotate');
            document.getElementById('customDropdownName').classList.remove('activeBorder');
            document.getElementById('customDropdownCategory').classList.remove('activeBorder');
            document.getElementById('dropdownListCategory').classList.add('dNone');
            document.getElementById('dropdownIconCategory').classList.remove('rotate');
            contactListContainer.classList.add('dNone');
            isOpen = false;
            if (assignedInput.value == '') {
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
    subtaskInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            getSubtask();
        }
    });
}


function getSubtask() {
    let subtaskInput = document.getElementById('subtaskInput');
    let subtaskList = document.getElementById('subtaskList');
    let subtaskObj = { subtask: subtaskInput.value, done: false };
    if (!subtaskInput.value) {
        subtaskInput.classList.add('required');
        return;
    } if (subtaskInput.value.length > 0) {
        subtaskInput.classList.remove('required');
        subtaskList.innerHTML += `<li>${subtaskInput.value}</li>`;
        subtasksArr.push(subtaskObj);
        subtaskInput.value = '';
    }

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
    let addedBoardImg = document.getElementById('addedBoardImg');
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
                                                <p>${contact.name}</p>
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

    if (checkboxElement.checked) {
        assignedArr.push(checkedName);
    } else {
        if (index > -1) {
            assignedArr.splice(index, 1);
        }
    }
    assignedContainer.innerHTML = '';
    assignedArr.forEach(contact => {
        assignedContainer.innerHTML += `<p class="contactInitial">${getInitials(contact)}</p>`;
    });
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}

document.addEventListener('DOMContentLoaded', function() {
    initSubtaskInputListener();
});