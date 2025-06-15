/**
 * Renders and initializes the HTML structure for the "Add Task" modal.
 * 
 * This function inserts a complete form structure into the DOM element with the ID "addTaskModal".
 * It includes input fields for title, description, due date, priority selection, assigned contacts,
 * category dropdown, and subtasks. It also initializes the default priority to "medium".
 * 
 * Elements are dynamically created and linked with relevant event listeners and functions,
 * such as `selectPriority`, `toggleDropdownName`, `toggleDropdownCategory`, `getSubtask`, 
 * `clearAddTask`, and `checkValidation`.
 * 
 * It assumes the corresponding styles and asset paths (e.g., `./assets/img/...`) exist and are properly loaded.
 */
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
                                <form name="leftTaskForm" class="leftAddTaskForm">
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

                                        <div class="calendarWrap" id="calendarWrap" data-input>
                                            <input class="inputFields" type="text" id="dateInput"
                                                placeholder="dd/mm/yyyy"
                                                oninput="formatDate(this), removeDateRequired()" onblur="checkDateValidation()" maxlength="10"
                                                data-input autocomplete="off">
                                            <img class="dateIcon" src="./assets/img/dateIcon.svg" alt="Open calendar"
                                                data-toggle>
                                        </div>

                                        <span id="requiredDate"></span>
                                    </label>
                                </form>
                            </div>
                            <span class="dividingLine"></span>
                            <div class="rightContainer">
                                <form name="rightTaskForm" class="rightAddTaskForm" action="">
                                    <label class="directionColumn maxWidth">Priority
                                        <div class="btnContainer flexOne">
                                            <span onclick="selectPriority('urgent')" id="priorityUrgentBtn"
                                                class="priorityBtn hoverBtn">Urgent<img id="urgentIcon"
                                                    class="priorityIcon" src="./assets/img/prioUrgent.svg" alt=""><img
                                                    id="urgentIconWhite" class="priorityIconWhite dNone"
                                                    src="./assets/img/prioUrgentWhite.svg" alt=""></span>
                                            <span onclick="selectPriority('medium')" id="priorityMediumBtn"
                                                class="priorityBtn priorityMediumBtn hoverBtn">Medium<img
                                                    id="mediumIcon" class="priorityIcon"
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
                                        <div id="customDropdownName" class="customDropdownName">
                                            <div class="dropdownHeader">
                                                <span id="selectedName"><input onfocus="this.select()" oninput="filterContacts(this.value)" id="assignedInput" class="assignedInput" value="Assigned to"></span>
                                                <img id="dropdownIconName" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                    </label>
                                    <div id="contactListContainer" class="contactListContainer dNone">
                                        <ul class="dropdownList ddListName dNone" id="dropdownListName">
                                            <span class="puffer"></span>
                                            <span id="listElements"></span>
                                        </ul>
                                    </div>
                                    <div class="assignedContentContainer assignedGap">
                                        <div id="assignedContainer" class="assignedContainer"></div>
                                        <span id="assignedCounter" class="assignedCounter dNone"></span>
                                    </div>
                                    <label class="directionColumn customSelectWrapper">
                                        <div class="dFlex">
                                            <p>Category</p>
                                            <p class="fontRed">*</p>
                                        </div>
                                        <div id="customDropdownCategory" class="customDropdownCategory"
                                            onclick="toggleDropdownCategory()">
                                            <div class="dropdownHeader">
                                                <span id="selectedCategory">Select category</span>
                                                <img id="dropdownIconCategory" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                        <div id="dropdownListCategory" class="categoryListContainer dNone">
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
                                        <input onkeydown="checkEnterToAddModal(event)" id="subtaskInput" class="inputFields" type="text" placeholder="Add new subtask">
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
    selectPriority('medium');
}

/**
 * Renders a detailed view of a selected task in a modal.
 *
 * @param {string} taskId - Unique identifier for the task.
 * @param {string} category - Task category (e.g., "User Story").
 * @param {string} title - Task title.
 * @param {string} description - Task description.
 * @param {string} date - Due date of the task.
 * @param {string} priority - Task priority level ("low", "medium", "urgent").
 * @param {string} column - The board column where the task is located.
 * @param {string} subtaskObj - Encoded JSON string of subtasks.
 * @param {string} encodedContacts - Encoded JSON string of assigned contacts.
 */
function getFilledStructure(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts) {
    let filledTaskModal = document.getElementById('filledTaskModal');
    let subtasks = JSON.parse(decodeURIComponent(subtaskObj));
    let contacts = JSON.parse(decodeURIComponent(encodedContacts));
    let capitalizedPriority = priority.charAt(0).toUpperCase() + priority.slice(1);
    filledTaskModal.innerHTML = `<img id="addedBoardImg" class="dNone" src="./assets/img/addedBoardImg.svg" alt="">
                                <div id="filledTask1" class="filledTaskModal marginBottom">
                                <div class="modalTaskHeadSection">
                                    <h3 class="taskCategoryModal userStoryModal">${category}</h3>
                                    <div class="closeIconTaskContainer">
                                        <img onclick="closeModal()" class="closeIconTask" src="./assets/img/closeIcon.svg" alt="">
                                    </div>
                                </div>
                                <div class="taskMainContent">
                                    <h4 class="taskTitleModal">${title}</h4>
                                    <p class="taskDescriptionModal">${description}</p>
                                    <div class="infoContainer"><p class="titleLine marginDate">Due date:</p><span>${date}</span></div>
                                    <div class="infoContainer"><p class="titleLine marginPriority">Priority:</p><span class="priorityContainer">${capitalizedPriority}<img src="./assets/img/prio${capitalizedPriority}.svg" alt="" class="taskPrioModal"></span></div>
                                    <p class="titleLine mBottom">Assigned to:</p>
                                    <div id="assignedContainerModal" class="assignedContainerModal overflowScroll"></div>
                                    <p class="titleLine marginTopBottom">Subtasks</p>
                                    <div id="subtaskContainerModal" class="subtaskContainerModal overflowScroll"></div>
                                    <div class="subtaskContainerModal">
                                        <ul id="subtaskModalList" class="subtaskModalList"></ul>
                                        <div class="modalBtnContainer">
                                            <span class="modalBtn deleteBtnWrapper" onclick="deleteTask('${loggedInUser}', '${taskId}')">
                                                <img class="defaultBtn" src="./assets/img/delete.svg" alt="Delete">
                                                <img class="hoverBtn" src="./assets/img/deleteHover.svg" alt="Delete Hover">
                                                Delete
                                            </span>
                                            <span>|</span>
                                            <span class="modalBtn deleteBtnWrapper" onclick="openTaskEdit('${taskId}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${column}', '${subtaskObj}', '${encodedContacts}')">
                                                <img class="defaultBtn" src="./assets/img/edit.svg">
                                                <img class="hoverBtn" src="./assets/img/editHover.svg">
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    getContactsModal(contacts);
    getSubtasksModal(subtasks, taskId);

}

/**
 * Opens a modal with editable form fields to allow a task to be modified.
 *
 * @param {string} taskId - Task ID to edit.
 * @param {string} category - Task category.
 * @param {string} title - Task title.
 * @param {string} description - Task description.
 * @param {string} date - Task due date.
 * @param {string} priority - Task priority.
 * @param {string} column - The column the task belongs to.
 * @param {string} encodedSubtasks - Encoded JSON string of subtasks.
 * @param {string} encodedContacts - Encoded JSON string of assigned contacts.
 */
function openTaskEdit(taskId, category, title, description, date, priority, column, encodedSubtasks, encodedContacts) {
    let editTaskModal = document.getElementById('filledTaskModal');
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let contacts = JSON.parse(decodeURIComponent(encodedContacts));
    editTaskModal.classList.remove('modalHeight');
    editTaskModal.classList.add('modalHeightEdit')
    editTaskModal.innerHTML = `<div class="mainEditContent">
                        <div class="editHeadSection">
                            <div class="closeIconContainer">
                            <img onclick="closeModal()" class="closeIcon" src="./assets/img/closeIcon.svg" alt="">
                            </div>
                        </div>
                        
                        <div class="addTaskContentEdit editTaskContent modalScrollbar">
                            <div class="leftContainerEdit">
                                <form name="leftTaskForm" class="leftAddTaskFormEdit">
                                    <label class="directionColumn">
                                        <div class="dFlex">
                                            <p>Title</p>
                                        </div>
                                        <input id="titleInputEdit" class="inputFieldsEdit" type="text"
                                            value="${title}">
                                    </label>
                                    <label class="directionColumn">Description
                                        <textarea class="inputFieldsEdit textArea resizeIcon" name="description"
                                            id="taskDescriptionEdit" >${description}</textarea>
                                    </label>
                                    <label class="directionColumn">
                                    <div class="calendarWrap" id="calendarWrap" data-input>
                                        <div class="dFlex">
                                            <p>Due date</p>
                                        </div>
                                        <input class="inputFieldsEdit" type="text" id="dateInputEdit" value="${date}"
                                            oninput="formatDate(this)" maxlength="10" data-input>
                                        <img class="dateIconEdit" src="./assets/img/dateIcon.svg" alt="">
                                        </div>
                                    </label>
                                </form>
                            </div>
                            <div class="rightContainerEdit">
                                <form name="rightTaskForm" class="rightAddTaskForm" action="">
                                    <label class="directionColumn maxWidth">Priority
                                        <div class="btnContainerEdit flexOne">
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
                                    <label onfocusin="toggleDropdownName()"
                                        class="directionColumn customSelectWrapper dropdownNameLabel">Assigned to
                                        <div id="customDropdownName" class="customDropdownNameEdit">
                                            <div class="dropdownHeader">

                                                <span id="selectedName"><input onfocus="this.select()"
                                                        oninput="filterContacts(this.value)" id="assignedInput"
                                                        class="assignedInput" value="Assigned to"></span>
                                                <img id="dropdownIconName" class="dropdownIcon"
                                                    src="./assets/img/dropDownIcon.svg" alt="dropdown-icon">
                                            </div>
                                        </div>
                                    </label>
                                    <div id="contactListContainer" class="editListContainer dNone">
                                        <ul class="dropdownListEdit ddListName dNone" id="dropdownListName">
                                            <span class="puffer"></span>
                                            <span id="listElements"></span>
                                        </ul>
                                    </div>
                                    <div class="assignedContentContainer assignedGap">
                                        <div id="assignedContainer" class="assignedContainer"></div>
                                        <span id="assignedCounter" class="assignedCounter dNone"></span>
                                    </div>
                                    <label id="subtaskLabel" class="directionColumn" onfocusin="getAddNewSubtask()" onfocusout="handleFocusOut()">
                                        Subtasks
                                        <input onkeydown="checkEnterToAdd(event)" id="subtaskInputModal" class="inputFieldsEdit" type="text" placeholder="Add new subtask">
                                        <span id="inputIconContainer" class="inputIconContainer">
                                            <img id="plusIcon" class="plusIconEdit" src="./assets/img/plusIcon.svg" alt="plus-icon">
                                        </span>
                                    </label>
                                    <ul id="subtaskListEdit" class="subtaskListEdit"></ul>
                                </form> 
                            </div>
                        </div>
                        <span class="submitBtn checkBtn hoverBtn changeBtn" onclick="changeTasks('${taskId}', '${column}', '${category}')">Ok
                                    <img class="submitIcons" src="./assets/img/createIcon.svg" alt="">
                        </span>
                        
                    </div>`;
    selectPriority(priority);
    getContactsEdit(contacts);
    getSubtaskEdit(subtasks, encodedSubtasks);
    initFlatpickrInModal();
}

/**
 * Renders a list of subtasks for editing, including edit/delete buttons.
 *
 * @param {Array} subtasks - Array of subtask objects.
 * @param {string} encodedSubtasks - Encoded version of the subtask array.
 */
function renderSubtasksEdit(subtasks, encodedSubtasks) {
    for (let subtaskIndex = 0; subtaskIndex < subtasksArr[0].length; subtaskIndex++) {
        let sub = subtasksArr[0];
        let currentSubtask = sub[subtaskIndex];
        let subtaskList = document.getElementById('subtaskListEdit');
        subtaskList.innerHTML += `<li id="subtaskElement${currentSubtask.subtask}">
                                    <div id="subtaskContainer${currentSubtask.subtask}" class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
                                        <span onclick="getEditSubtaskModal('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')" class="liText"><p>•</p><p id="subtaskValue${currentSubtask.subtask}" class="subtaskWidth">${currentSubtask.subtask}</p></span>
                                        <span  id="editIconContainer" class="iconContainer dNone">
                                            <span onclick="getEditSubtaskModal('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')" class="editIcons"><img class="iconSize" src="./assets/img/edit.svg" alt=""></span>
                                            <span class="iconDivider">|</span>
                                            <span onclick="deleteSubtaskModal('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')" class="editIcons"><img class="iconSize" id="deleteIcon" src="./assets/img/delete.svg" alt=""></span>
                                        </span>
                                    </div>
                                    <div id="subtaskEditContainer${currentSubtask.subtask}" class="newSubtaskListElement dNone">
                                        <input id="editSubtaskInput${currentSubtask.subtask}" class="newSubtaskInput" value="${currentSubtask.subtask}">
                                        <span  id="editIconContainer" class="iconContainer">
                                            <span class="editIcons" onclick="deleteSubtaskModal('${currentSubtask.subtask}', '${subtaskIndex}', '${encodedSubtasks}')"><img class="iconSize" src="./assets/img/delete.svg" alt=""></span>
                                            <span class="iconDivider">|</span>
                                            <span onclick="editSubtaskModal('${currentSubtask.subtask}', '${subtaskIndex}')" class="editIcons doneIcon"><img class="iconSize" src="./assets/img/done.svg" alt=""></span>
                                        </span>
                                    </div>
                                </li>`;
    }
}

/**
 * Adds a new subtask from input and appends it to the editable subtask list.
 */
function addNewSubtaskModal() {
    let subtaskListEdit = document.getElementById('subtaskListEdit');
    let inputValue = document.getElementById('subtaskInputModal');
    let subtaskObj = { done: false, subtask: inputValue.value };
    let subtaskIndex;
    let serializedSubtasks = encodeURIComponent(JSON.stringify(subtaskObj));
    if (inputValue.value.startsWith(' ')) {
        inputValue.value = inputValue.value.trimStart();
    }
    if (inputValue.value == '') {
        return;
    }
    subtaskIndex = subtasksArr[0].push(subtaskObj) - 1;
    subtaskListEdit.innerHTML += `<li id="subtaskElement${inputValue.value}">
                                    <div id="subtaskContainer${inputValue.value}" class="subtaskListElement" onmouseover="showEditIcons(this)" onmouseout="hideEditIcons(this)">
                                        <span onclick="getEditSubtaskModal('${inputValue.value}')" class="liText"><p>•</p><p id="subtaskValue${inputValue.value}">${inputValue.value}</p></span>
                                        <span  id="editIconContainer" class="iconContainer dNone">
                                            <span onclick="getEditSubtaskModal('${inputValue.value}')" class="editIcons"><img src="./assets/img/edit.svg" alt="" class="iconSize"></span>
                                            <span class="iconDivider">|</span>
                                            <span onclick="deleteNewAddedSubtask('${subtaskIndex}', '${inputValue.value}')" class="editIcons"><img id="deleteIcon"  src="./assets/img/delete.svg" alt="" class="iconSize"></span>
                                        </span>
                                    </div>
                                    <div id="subtaskEditContainer${inputValue.value}" class="newSubtaskListElement dNone">
                                        <input id="editSubtaskInput${inputValue.value}" class="newSubtaskInput" value="${inputValue.value}">
                                        <span  id="editIconContainer" class="iconContainer">
                                        <span onclick="deleteNewAddedSubtask('${subtaskIndex}')" class="editIcons"><img src="./assets/img/delete.svg" alt="" class="iconSize"></span>
                                            
                                            <span class="iconDivider">|</span>
                                            <span onclick="editSubtaskModal('${inputValue.value}', '${subtaskIndex}')" class="editIcons doneIcon"><img src="./assets/img/done.svg" alt="" class="iconSize"></span>
                                            
                                        </span>
                                    </div>
                                </li>`;
    addedSubtask = true;
    inputValue.value = '';
    inputValue.blur();
    setTimeout(() => {
        resetSubtaskIcons();
    }, 50);
}