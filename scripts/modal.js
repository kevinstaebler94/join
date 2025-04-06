function openAddTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    overlay.classList.remove('dNone');
    addTaskModal.classList.remove('dNone');
    getAddTaskStructure();
}

function openFilledTaskModal(category, title, description, date, priority, subtask) {
    let overlay = document.getElementById('boardOverlay');
    let filledTaskModal = document.getElementById('filledTaskModal');
    overlay.classList.remove('dNone');
    filledTaskModal.classList.remove('dNone');
    getFilledStructure(category, title, description, date, priority);
    getSubtasksModal(subtask);
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

function getFilledStructure(category, title, description, date, priority) {
    let filledTaskModal = document.getElementById('filledTaskModal');
    filledTaskModal.innerHTML = `<div id="filledTask1" class="filledTaskModal marginBottom">
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
                                    <div class="assignedUsersModal">
                                        <p>Assigned to:</p>
                                        <div class="assignedToModal"><span class="assignedUserModal">KS</span><p>Kevin Staebler</p></div>
                                        <div class="assignedToModal"><span class="assignedUserModal">DB</span><p>Daniel Bumbuc</p></div>
                                        <div class="assignedToModal"><span class="assignedUserModal">OG</span><p>Oliver Geschine</p></div>
                                    </div>
                                    <div class="subtaskContainerModal">
                                        <p>Subtasks</p>
                                        <div class="assignedToModal"><input type="checkbox"><p>Subtask 1</p></div>
                                        <div class="assignedToModal"><input type="checkbox"><p>Subtask 2</p></div>
                                        <div class="assignedToModal"><input type="checkbox"><p>Subtask 3</p></div>
                                    </div>
                                    <div class="subtaskContainerModal">
                                        <ul id="subtaskModalList"></ul>
                                        <button onclick="deleteTask('dieser task wird gelöscht1')">Delete</button>
                                        <span>|</span>
                                        <button onclick="openTaskEdit()">Edit</button>
                                    </div>
                                    
                                </div>
                            </div>`;
}

async function getSubtasksModal(subtask) {
    let subtaskModalList = document.getElementById('subtaskModalList');
    subtaskModalList.innerHTML += `<li>${subtask}</li>`;
}

function openTaskEdit() {
    let editTaskModal = document.getElementById('filledTaskModal');
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
                                        <input id="titleInput" class="inputFields" type="text"
                                            placeholder="Enter a title">
                                    </label>
                                    <label class="directionColumn">Description
                                        <textarea class="inputFields textArea resizeIcon" name="description"
                                            id="taskDescription" placeholder="Enter a Description"></textarea>
                                    </label>
                                    <label class="directionColumn">
                                        <div class="dFlex">
                                            <p>Due date</p>
                                        </div>
                                        <input class="inputFields" type="text" id="dateInput" placeholder="dd/mm/yyyy"
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
                                        <div class="listContainer">
                                            <ul class="dropdownList dNone" id="dropdownListName">
                                                <span class="puffer"></span>
                                                <span id="listElements"></span>
                                            </ul>
                                        </div>
                                    </label>
                                    <label class="directionColumn">Subtasks
                                        <input class="inputFields" type="text" placeholder="Add new subtask">
                                        <img class="plusIcon" src="./assets/img/plusIcon.svg" alt="plus-icon">
                                    </label>
                                </form>
                                <button>OK</button>
                            </div>
                        </div>
                    </div>`;
}