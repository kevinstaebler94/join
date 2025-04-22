function openAddTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    overlay.classList.remove('dNone');
    addTaskModal.classList.remove('dNone');
    getAddTaskStructure();
}

function openFilledTaskModal(taskId, category, title, description, date, priority, encodedSubtasks, encodedContacts) {
    let overlay = document.getElementById('boardOverlay');
    let filledTaskModal = document.getElementById('filledTaskModal');
    overlay.classList.remove('dNone');
    filledTaskModal.classList.remove('dNone');
    getFilledStructure(taskId, category, title, description, date, priority, encodedSubtasks, encodedContacts);
}

function closeModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    let filledTaskModal = document.getElementById('filledTaskModal');
    overlay.classList.add('dNone');
    addTaskModal.classList.add('dNone');
    filledTaskModal.classList.add('dNone');
}

function getAddTaskStructure() {
    let addTaskModal = document.getElementById('addTaskModal');
    addTaskModal.innerHTML = `<div class="mainContent">
                        <div class="modalHeadSection">
                            <h1>Add Task</h1>
                            <div class="closeIconContainer">
                            <img onclick="closeModal()" class="closeIcon" src="./assets/img/closeIcon.svg" alt="">
                            </div>
                        </div>
                        
                        <div class="addTaskContent">
                            <div class="leftContainer">
                                <form class="leftAddTaskForm">
                                    <label class="directionColumn">
                                        <div class="dFlex">
                                            <p>Title</p>
                                            <p class="fontRed">*</p>
                                        </div>
                                        <input id="titleInput" class="inputFields" type="text"
                                            placeholder="Enter a title">
                                        <span id="requiredTitle"></span>
                                    </label>
                                    <label class="directionColumn">Description
                                        <textarea class="inputFields textArea resizeIcon" name="description"
                                            id="taskDescription" placeholder="Enter a Description"></textarea>
                                    </label>
                                    <label class="directionColumn">
                                        <div class="dFlex">
                                            <p>Due date</p>
                                            <p class="fontRed">*</p>
                                        </div>
                                        <input class="inputFields" type="text" id="dateInput" placeholder="dd/mm/yyyy"
                                            oninput="formatDate(this)" maxlength="10">
                                        <img class="dateIcon" src="./assets/img/dateIcon.svg" alt="">
                                        <span id="requiredDate" class="requiredDate"></span>
                                    </label>
                                </form>
                            </div>
                            <span class="dividingLine"></span>
                            <div class="rightContainer">
                                <form class="rightAddTaskForm" action="">
                                    <label class="directionColumn maxWidth">Priority
                                        <div class="btnContainer flexOne">
                                            <span onclick="selectPriority('urgent')" id="priorityUrgentBtn"
                                                class="priorityBtn hoverBtn">Urgent<img id="urgentIcon"
                                                    class="priorityIcon" src="./assets/img/prioUrgent.svg" alt=""><img
                                                    id="urgentIconWhite" class="priorityIconWhite dNone"
                                                    src="./assets/img/prioUrgentWhite.svg" alt=""></span>
                                            <span onclick="selectPriority('medium')" id="priorityMediumBtn"
                                                class="priorityBtn priorityMediumBtn hoverBtn">Medium<img
                                                    id="mediumIcon" class="priorityIconMedium"
                                                    src="./assets/img/prioMedium.svg" alt=""><img id="mediumIconWhite"
                                                    class="priorityIconWhite dNone"
                                                    src="./assets/img/prioMediumWhite.svg" alt=""></span>
                                            <span onclick="selectPriority('low')" id="priorityLowBtn"
                                                class="priorityBtn hoverBtn">Low<img id="lowIcon" class="priorityIcon"
                                                    src="./assets/img/prioLow.svg" alt=""><img id="lowIconWhite"
                                                    class="priorityIconWhite dNone" src="./assets/img/prioLowWhite.svg"
                                                    alt=""></span>
                                        </div>
                                    </label>
                                    <label class="directionColumn customSelectWrapper">Assigned to
                                        <div id="customDropdownName" class="customDropdown"
                                            onclick="toggleDropdownName()">
                                            <div class="dropdownHeader">
                                                <span id="selectedName">Assigned to</span>
                                                <img id="dropdownIconName" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                        <div class="listContainer">
                                            <ul class="dropdownList dNone" id="dropdownListName">
                                                <span class="puffer"></span>
                                                <span id="listElements"></span>
                                            </ul>
                                        </div>
                                    </label>
                                    <label class="directionColumn customSelectWrapper">
                                        <div class="dFlex">
                                            <p>Category</p>
                                            <p class="fontRed">*</p>
                                        </div>
                                        <div id="customDropdownCategory" class="customDropdown"
                                            onclick="toggleDropdownCategory()">
                                            <div class="dropdownHeader">
                                                <span id="selectedCategory">Select category</span>
                                                <img id="dropdownIconCategory" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                        <div class="listContainer">
                                            <ul class="dropdownList dNone" id="dropdownListCategory">
                                                <span class="puffer"></span>
                                                <li class="listElement" onclick="selectCategory('Technical Task')">
                                                    Technical Task</li>
                                                <li class="listElement" onclick="selectCategory('User Story')">User
                                                    Story</li>
                                            </ul>
                                        </div>
                                    </label>
                                    <label class="directionColumn">Subtasks
                                        <input class="inputFields" type="text" placeholder="Add new subtask">
                                        <img class="plusIcon" src="./assets/img/plusIcon.svg" alt="plus-icon">
                                    </label>
                                </form>
                            </div>
                        </div>
                        <div class="submitSection">
                            <div class="infoText">
                                <p>
                                <p class="fontRed">*</p>This field is required</p>
                            </div>

                            <div class="submitBtnContainer">
                                <span class="submitBtn clearBtn hoverBtn">Clear
                                    <img class="submitIcons" src="./assets/img/cancelIcon.svg" alt="">
                                    <img class="submitIcons" src="./assets/img/cancelIconHover.svg" alt="">
                                </span>
                                <!-- <a href="">
                                    <img class="submitBtn clearBtn" src="./assets/img/cancelIcon.svg" alt="">
                                    <img class="submitBtn clearBtn" src="./assets/img/cancelIconHover.svg" alt="">
                                </a>
                                <a href="">
                                    <img class="submitBtn addTaskBtn" src="./assets/img/addTaskIcon.svg" alt="">
                                    <img class="submitBtn addTaskBtn" src="./assets/img/addTaskHover.svg" alt="">
                                </a> -->

                                <span class="submitBtn checkBtn hoverBtn" onclick="checkValidation()">Create Task
                                    <img class="submitIcons" src="./assets/img/createIcon.svg" alt="">
                                </span>
                            </div>
                        </div>
                    </div>`;
}

function getFilledStructure(taskId, category, title, description, date, priority, encodedSubtasks, encodedContacts) {
    let filledTaskModal = document.getElementById('filledTaskModal');
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let contacts = JSON.parse(decodeURIComponent(encodedContacts));
    filledTaskModal.innerHTML = `<img id="addedBoardImg" class="dNone" src="./assets/img/addedBoardImg.svg" alt="">
                                <div id="filledTask1" class="filledTaskModal marginBottom">
                                <div class="modalTaskHeadSection">
                                    <h3 class="taskCategoryModal userStoryModal">${category}</h3>
                                    <div class="closeIconTaskContainer">
                                        <img onclick="closeModal()" class="closeIconTask" src="./assets/img/closeIcon.svg" alt="">
                                    </div>
                                </div>
                                    <h4 class="taskTitleModal">${title}</h4>
                                    <p class="taskDescriptionModal">${description}</p>
                                    <div class="dueContainerModal">
                                        <div class="dueInfo"><p>Due date:</p><span>${date}</span></div>
                                        <div class="dueInfo"><p>Priority:</p><span class="priorityContainer">${priority}<img src="/assets/img/prioMedium.svg" alt="" class="taskPrioMediumModal"></span></div>
                                    </div>
                                    <div id="assignedContainerModal" class="assignedContainerModal">
                                        <p>Assigned to:</p>
                                    </div>
                                    <div id="subtaskContainerModal" class="subtaskContainerModal">
                                        <p>Subtasks</p>
                                    </div>
                                    <div class="subtaskContainerModal">
                                        <ul id="subtaskModalList"></ul>
                                        <button onclick="deleteTask('${loggedInUser}', '${taskId}')">Delete</button>
                                        <span>|</span>
                                        <button onclick="openTaskEdit('${taskId}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${encodedSubtasks}', '${encodedContacts}')">Edit</button>
                                    </div>
                                </div>
                            </div>`;
                            
                            
    getContactsModal(contacts);
    getSubtasksModal(subtasks);
}

function openTaskEdit(taskId, category, title, description, date, priority, encodedSubtasks, encodedContacts) {
    let editTaskModal = document.getElementById('filledTaskModal');
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let contacts = JSON.parse(decodeURIComponent(encodedContacts));
    editTaskModal.innerHTML = `<div class="mainEditContent">
                        <div class="editHeadSection">
                            <div class="closeIconContainer">
                            <img onclick="closeModal()" class="closeIcon" src="./assets/img/closeIcon.svg" alt="">
                            </div>
                        </div>
                        
                        <div class="addTaskContent editTaskContent">
                            <div class="leftContainer">
                                <form class="leftAddTaskForm">
                                    <label class="directionColumn">
                                        <div class="dFlex">
                                            <p>Title</p>
                                        </div>
                                        <input id="titleInputEdit" class="inputFields" type="text"
                                            value="${title}">
                                    </label>
                                    <label class="directionColumn">Description
                                        <textarea class="inputFields textArea resizeIcon" name="description"
                                            id="taskDescriptionEdit" value="${description}"></textarea>
                                    </label>
                                    <label class="directionColumn">
                                        <div class="dFlex">
                                            <p>Due date</p>
                                        </div>
                                        <input class="inputFields" type="text" id="dateInputEdit" value="${date}"
                                            oninput="formatDate(this)" maxlength="10">
                                        <img class="dateIcon" src="./assets/img/dateIcon.svg" alt="">
                                    </label>
                                </form>
                            </div>
                            <span class="dividingLine"></span>
                            <div class="rightContainer">
                                <form class="rightAddTaskForm" action="">
                                    <label class="directionColumn maxWidth">Priority
                                        <div class="btnContainer flexOne">
                                            <span onclick="selectPriority('urgent')" id="priorityUrgentBtnEdit"
                                                class="priorityBtn hoverBtn">Urgent<img id="urgentIcon"
                                                    class="priorityIcon" src="./assets/img/prioUrgent.svg" alt=""><img
                                                    id="urgentIconWhite" class="priorityIconWhite dNone"
                                                    src="./assets/img/prioUrgentWhite.svg" alt=""></span>
                                            <span onclick="selectPriority('medium')" id="priorityMediumBtnEdit"
                                                class="priorityBtn priorityMediumBtn hoverBtn">Medium<img
                                                    id="mediumIcon" class="priorityIconMedium"
                                                    src="./assets/img/prioMedium.svg" alt=""><img id="mediumIconWhite"
                                                    class="priorityIconWhite dNone"
                                                    src="./assets/img/prioMediumWhite.svg" alt=""></span>
                                            <span onclick="selectPriority('low')" id="priorityLowBtnEdit"
                                                class="priorityBtn hoverBtn">Low<img id="lowIcon" class="priorityIcon"
                                                    src="./assets/img/prioLow.svg" alt=""><img id="lowIconWhite"
                                                    class="priorityIconWhite dNone" src="./assets/img/prioLowWhite.svg"
                                                    alt=""></span>
                                        </div>
                                    </label>
                                    <label class="directionColumn customSelectWrapper">Assigned to
                                        <div id="customDropdownNameEdit" class="customDropdown"
                                            onclick="toggleDropdownNameEdit()">
                                            <div class="dropdownHeader">
                                                <span id="selectedNameEdit">Assigned to</span>
                                                <img id="dropdownIconNameEdit" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                        <div class="listContainer">
                                            <ul class="dropdownList dNone" id="dropdownListName">
                                                <span class="puffer"></span>
                                                <span id="listElementsEdit"></span>
                                            </ul>
                                        </div>
                                        <div id="assignedContainerEdit" class="assignedContainer"></div>
                                    </label>
                                    <label class="directionColumn">Subtasks
                                        <input class="inputFields" type="text" placeholder="Add new subtask">
                                        <img class="plusIcon" src="./assets/img/plusIcon.svg" alt="plus-icon">
                                        <ul id="subtaskListEdit" class="subtaskListEdit"></ul>
                                    </label>
                                </form>
                                <button onclick="changeTasks('${taskId}')">OK</button>
                            </div>
                        </div>
                    </div>`;
    getContactsEdit(contacts);
    getSubtaskEdit(subtasks);
}

async function getContactsModal(contacts) {
    contacts.forEach(contact => {
        let contactContainer = document.getElementById('assignedContainerModal');
        contactContainer.innerHTML += `<div class="assignedToModal"><span class="assignedContactModal">${getInitials(contact)}</span><p>${contact}</p></div>`;
    });
}

function getContactsEdit(contacts) {
    contacts.forEach(contact => {
        let assignetContainer = document.getElementById('assignedContainerEdit');
        assignetContainer.innerHTML += `<p class="contactInitial">${getInitials(contact)}</p>`;
    });
}


async function getSubtasksModal(subtasks) {
    subtasks.forEach(subtask => {
        let subtaskContainer = document.getElementById('subtaskContainerModal');
        subtaskContainer.innerHTML += `<div class="assignedToModal"><input id="${subtasks}" type="checkbox" onchange="handleCheckbox(this)"><p>${subtask}</p></div>`;
    });
}

function getSubtaskEdit(subtasks) {
    subtasks.forEach(subtask => {
        let subtaskList = document.getElementById('subtaskListEdit');
        subtaskList.innerHTML += `<li>
                                    <div class="subtaskListElement">
                                        <span class="liText"><p class="liMarker"></p>${subtask}</span>
                                        <span class="iconContainer">
                                            <img class="editIcons" src="./assets/img/edit.svg" alt="">
                                            <span class="iconDivider">|</span>
                                            <img class="editIcons" src="./assets/img/delete.svg" alt="">
                                        </span>
                                    </div>
                                </li>`;
    });
}

function toggleDropdownNameEdit() {
    let customDropdownName = document.getElementById('customDropdownNameEdit');
    let dropdown = document.getElementById('dropdownListName');
    let dropdownIcon = document.getElementById('dropdownIconNameEdit');
    customDropdownName.classList.add('activeBorder');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
    getContactEdit();
}

async function getContactEdit() {
    let contacts = await getData("/contacts");
    let dropdownListName = document.getElementById('dropdownListName');
    dropdownListName.innerHTML = '';
    for (let key in contacts) {
        if (contacts.hasOwnProperty(key)) {
            contactArr.push(contacts[key])
        }
        dropdownListName.innerHTML += `<label><li id="listName${contacts[key].name}" class="listElement">
                                        <p id="${contacts[key].name}">${contacts[key].name}</p>
                                        <input onclick="checkAssignedContactEdit(this)" id="checkboxEdit" type="checkbox" class="checkbox" name="selectedNames" data-name="${contacts[key].name}">
                                    </li></label>`;
    }
}

function checkAssignedContactEdit(checkboxElement) {
    let assignedContainer = document.getElementById('assignedContainerEdit');
    let checkbox = document.getElementById('checkboxEdit');
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
    console.log(assignedArr);
    assignedArr.forEach(contact => {
        assignedContainer.innerHTML += `<p class="contactInitial">${getInitials(contact)}</p>`;
    });
}