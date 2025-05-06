function openAddTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    overlay.classList.remove('dNone');
    addTaskModal.classList.remove('dNone');
    getAddTaskStructure();
}

function openFilledTaskModal(taskId, category, title, description, date, priority, column,subtaskObj, encodedContacts) {
    let overlay = document.getElementById('boardOverlay');
    let filledTaskModal = document.getElementById('filledTaskModal');
    overlay.classList.remove('dNone');
    filledTaskModal.classList.remove('dNone');
    getFilledStructure(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts);
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
    addTaskModal.innerHTML = `<img id="addedBoardImg" class="dNone" src="./assets/img/addedBoardImg.svg" alt=""><div class="mainContent">
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
                                    <label onfocusin="toggleDropdownName()" class="directionColumn customSelectWrapper">Assigned to
                                        <div id="customDropdownName" class="customDropdown"
                                            >
                                            <div class="dropdownHeader">
                                                
                                                <span id="selectedName"><input onfocus="this.select()" oninput="filterContacts(this.value)" id="assignedInput" class="assignedInput" value="Assigned to"></span>
                                                <img id="dropdownIconName" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                    </label>
                                    <div id="contactListContainer" class="listContainer dNone">
                                        <ul class="dropdownList ddListName dNone" id="dropdownListName">
                                            <span class="puffer"></span>
                                            <span id="listElements"></span>
                                        </ul>
                                    </div>
                                    <div id="assignedContainer" class="assignedContainer"></div>

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
                                        <div id="dropdownListCategory" class="listContainer dNone">
                                            <ul class="dropdownList"> 
                                                <span class="puffer"></span>
                                                <li class="listElement" onclick="selectCategory('Technical Task')">
                                                    Technical Task</li>
                                                <li class="listElement" onclick="selectCategory('User Story')">User
                                                    Story</li>
                                            </ul>
                                        </div>
                                    </label>
                                    <label class="directionColumn">Subtasks
                                        <input id="subtaskInput" class="inputFields" type="text" placeholder="Add new subtask">
                                        <img onclick="getSubtask()" class="plusIcon" src="./assets/img/plusIcon.svg" alt="plus-icon">
                                        <ul id="subtaskList" class="subtaskList"></ul>
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
                                <span class="submitBtn clearBtn hoverBtn" onclick="clearAddTask()">Clear
                                    <img class="submitIcons" src="./assets/img/cancelIcon.svg" alt="">
                                    <img class="submitIcons" src="./assets/img/cancelIconHover.svg" alt="">
                                </span>
                                <span class="submitBtn checkBtn hoverBtn" onclick="checkValidation()">Create Task
                                    <img class="submitIcons" src="./assets/img/createIcon.svg" alt="">
                                </span>
                            </div>
                        </div>
                    </div>`;
    selectPriority('medium')
}

function getFilledStructure(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts) {
    let filledTaskModal = document.getElementById('filledTaskModal');
    let subtasks = JSON.parse(decodeURIComponent(subtaskObj));
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
                                        <button onclick="openTaskEdit('${taskId}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${column}', '${subtaskObj}', '${encodedContacts}')">Edit</button>
                                    </div>
                                </div>
                            </div>`;
    getContactsModal(contacts);
    getSubtasksModal(subtasks, taskId);
}

function openTaskEdit(taskId, category, title, description, date, priority, column, encodedSubtasks, encodedContacts) {
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
                                            id="taskDescriptionEdit" >${description}</textarea>
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
                                    </label>
                                    <div id="contactListContainer" class="listContainer dNone">
                                        <ul class="dropdownList ddListName dNone" id="dropdownListName">
                                            <span class="puffer"></span>
                                            <span id="listElements"></span>
                                        </ul>
                                    </div>
                                    <div id="assignedContainer" class="assignedContainer"></div>

                                    <label id="subtaskLabel" class="directionColumn" onfocusin="getAddNewSubtask()" onfocusout="handleFocusOut()">
                                        Subtasks
                                        <input id="subtaskInput" class="inputFields" type="text" placeholder="Add new subtask">
                                        <span id="inputIconContainer">
                                            <img id="plusIcon" class="plusIcon" src="./assets/img/plusIcon.svg" alt="plus-icon">
                                        </span>
                                    </label>
                                    <ul id="subtaskListEdit" class="subtaskListEdit"></ul>
                                </form>
                                <button onclick="changeTasks('${taskId}', '${column}', '${category}')">OK</button>
                            </div>
                        </div>
                    </div>`;
    selectPriority(priority);
    getContactsEdit(contacts);
    getSubtaskEdit(subtasks, encodedSubtasks);
}

function handleFocusOut() {
    setTimeout(() => {
        resetSubtaskIcons();
    }, 100);
}

async function getContactsModal(contacts) {
    contacts.forEach(contact => {
        let contactContainer = document.getElementById('assignedContainerModal');
        contactContainer.innerHTML += `<div class="assignedToModal"><span class="assignedContactModal">${getInitials(contact)}</span><p>${contact}</p></div>`;
    });
}

function getContactsEdit(contacts) {
    contacts.forEach(contact => {
        let assignetContainer = document.getElementById('assignedContainer');

        assignetContainer.innerHTML += `<p class="contactInitial">${getInitials(contact)}</p>`;
    });
}

async function getSubtasksModal(subtasks, taskId) {
    let entries = Object.entries(subtasks?.subtask || {});

    entries.forEach(([subtaskId, subtask]) => {
        let subtaskContainer = document.getElementById('subtaskContainerModal');
        let isChecked = subtask.done ? 'checked' : '';
        subtaskContainer.innerHTML += `<div class="assignedToModal"><input type="checkbox" ${isChecked}
        onchange="handleCheckbox(this)" data-task-id="${taskId}" data-subtask-id="${subtaskId}"><p>${subtask.subtask}</p></div>`;
    });
}

function getSubtaskEdit(subtasks, encodedSubtasks) {
    subtasksArr.push(subtasks.subtask);
    for (let subtaskIndex = 0; subtaskIndex < subtasksArr[0].length; subtaskIndex++) {
        let sub = subtasksArr[0];
        let currentSubtask = sub[subtaskIndex];
        let subtaskList = document.getElementById('subtaskListEdit');
        subtaskList.innerHTML += `<li id="subtaskElement${currentSubtask.subtask}">
                                    <div class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
                                        <span onclick="getEditSubtask('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')" class="liText"><p class="liMarker"></p><p id="subtaskValue${subtaskIndex}">${currentSubtask.subtask}</p></span>
                                        <span  id="editIconContainer" class="iconContainer dNone">
                                            <img onclick="getEditSubtask('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')" class="editIcons"  src="./assets/img/edit.svg" alt="">
                                            <span class="iconDivider">|</span>
                                            <img onclick="deleteSubtask('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')" id="deleteIcon" class="editIcons" src="./assets/img/delete.svg" alt="">
                                        </span>
                                    </div>
                                </li>`;
    };


}

function showEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.remove('dNone');
}

function hideEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.add('dNone');
}

function getAddNewSubtask() {
    let inputIconContainer = document.getElementById('inputIconContainer');
    let plusIcon = document.getElementById('plusIcon');
    inputIconContainer.classList.add('inputIconContainer');
    plusIcon.classList.remove('plusIcon');
    inputIconContainer.innerHTML = `<img onclick="cancelValue()" id="plusIcon" class="editIcons" src="./assets/img/cancel.svg" alt="plus-icon">
                                    <span class="iconDivider">|</span>
                                    <img onclick="addNewSubtask()" id="doneIcon" class="editIcons" src="./assets/img/done.svg" alt="">`;
}

function addNewSubtask() {
    let subtaskListEdit = document.getElementById('subtaskListEdit');
    let inputValue = document.getElementById('subtaskInput');
    subtaskListEdit.innerHTML += `<li id="subtaskElement${inputValue.value}">
                                    <div class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
                                        <span onclick="getEditSubtask('${inputValue.value}')" class="liText"><p class="liMarker"></p><p id="subtaskValue${inputValue.value}">${inputValue.value}</p></span>
                                        <span  id="editIconContainer" class="iconContainer dNone">
                                            <img onclick="getEditSubtask('${inputValue.value}')" class="editIcons"  src="./assets/img/edit.svg" alt="">
                                            <span class="iconDivider">|</span>
                                            <img onclick="deleteSubtask('${inputValue.value}')" id="deleteIcon" class="editIcons" src="./assets/img/delete.svg" alt="">
                                        </span>
                                    </div>
                                </li>`;
    subtasksArr[0].push({subtask: inputValue.value, done: false});
    inputValue.value = '';
    subtaskInput.blur();
    setTimeout(() => {
        resetSubtaskIcons();
    }, 50);

}

function resetSubtaskIcons() {
    const inputIconContainer = document.getElementById('inputIconContainer');
    while (inputIconContainer.firstChild) {
        inputIconContainer.removeChild(inputIconContainer.firstChild);
    }
    const plusIcon = document.createElement('img');
    plusIcon.id = 'plusIcon';
    plusIcon.className = 'plusIcon';
    plusIcon.src = './assets/img/plusIcon.svg';
    plusIcon.alt = 'plus-icon';
    inputIconContainer.appendChild(plusIcon);
    inputIconContainer.classList.remove('inputIconContainer');
    document.getElementById('subtaskInput').blur();
}

function getEditSubtask(subtaskId, subtaskIndex, encodedSubtasks) {
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let subtaskElement = document.getElementById('subtaskElement' + subtaskId);
    subtaskElement.innerHTML = `<li id="subtaskElement${subtaskId}">
                                    <div class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
                                        <input id="editSubtaskInput" value="${subtaskId}">
                                        <span  id="editIconContainer" class="iconContainer dNone">
                                            <img class="editIcons" onclick="deleteSubtask('${subtaskId}')" src="./assets/img/delete.svg" alt="">
                                            <span class="iconDivider">|</span>
                                            <img onclick="editSubtask('${subtaskIndex}', '${encodedSubtasks}')" class="editIcons doneIcon" src="./assets/img/done.svg" alt="">
                                        </span>
                                    </div>
                                </li>`
}

function editSubtask(subtaskIndex, encodedSubtasks) {
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let subtaskList = document.getElementById('subtaskListEdit');
    let editSubtaskInput = document.getElementById('editSubtaskInput');
    subtasks.subtask[subtaskIndex] = { done: false, subtask: editSubtaskInput.value };
    console.log(subtasks);
    subtasksArr = [];
    subtaskList.innerHTML = '';
    getSubtaskEdit(subtasks, serializeObj(subtasks));
}

function serializeObj(subtasks) {
    let serializedSubtasks = encodeURIComponent(JSON.stringify(subtasks));
    return serializedSubtasks;
}

function deleteSubtask(subtaskId, subtaskIndex, encodedSubtasks) {
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let subtaskListEdit = document.getElementById('subtaskListEdit');
    subtasksArr[0].splice(subtaskIndex, 1);
    subtasks.subtask = subtasksArr[0];
    subtasksArr = [];
    subtaskListEdit.innerHTML = '';
    getSubtaskEdit(subtasks, serializeObj(subtasks));
}

function cancelValue() {
    let subtaskInput = document.getElementById('subtaskInput');
    subtaskInput.value = '';
    subtaskInput.blur();
    setTimeout(() => {
        resetSubtaskIcons();
    }, 50);
}

// FALSE FUNCTION???
// function toggleDropdownNameEdit() {
//     let customDropdownName = document.getElementById('customDropdownNameEdit');
//     let dropdown = document.getElementById('dropdownListName');
//     let dropdownIcon = document.getElementById('dropdownIconNameEdit');
//     customDropdownName.classList.add('activeBorder');
//     dropdown.classList.toggle('dNone');
//     dropdownIcon.classList.toggle('rotate');
//     getContactEdit();
// }

// FALSE FUNCTION???
// async function getContactEdit() {
//     let contacts = await getData("/contacts");
//     let dropdownListName = document.getElementById('dropdownListName');
//     dropdownListName.innerHTML = '';
//     for (let key in contacts) {
//         if (contacts.hasOwnProperty(key)) {
//             contactArr.push(contacts[key])
//         }
//         dropdownListName.innerHTML += `<label><li id="listName${contacts[key].name}" class="listElement">
//                                         <p id="${contacts[key].name}">${contacts[key].name}</p>
//                                         <input onclick="checkAssignedContactEdit(this)" id="checkboxEdit" type="checkbox" class="checkbox" name="selectedNames" data-name="${contacts[key].name}">
//                                     </li></label>`;
//     }
// }

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
    assignedArr.forEach(contact => {
        assignedContainer.innerHTML += `<p class="contactInitial">${getInitials(contact)}</p>`;
    });
}