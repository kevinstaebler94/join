function openAddTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    overlay.classList.remove('dNone');
    addTaskModal.classList.remove('dNone');
    getAddTaskStructure();
}

function openFilledTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let filledTaskModal = document.getElementById('filledTaskModal');
    overlay.classList.remove('dNone');
    filledTaskModal.classList.remove('dNone');
    getFilledStructure();
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

function getFilledStructure() {
    let filledTaskModal = document.getElementById('filledTaskModal');
    filledTaskModal.innerHTML = `<div id="filledTask1" class="filledTaskModal marginBottom">
                                <div class="modalTaskHeadSection">
                                    <h3 class="taskCategoryModal userStoryModal">User Story</h3>
                                    <div class="closeIconTaskContainer">
                                        <img onclick="closeModal()" class="closeIconTask" src="./assets/img/closeIcon.svg" alt="">
                                    </div>
                                </div>
                                <h4 class="taskTitleModal">Kochwelt Page & Recipe Recommender</h4>
                                    <p class="taskDescriptionModal">Build start page with recipe recommendation</p>
                                    <div class="subtasksContainerModal">
                                        <div class="progressBarContainerModal">
                                            <div class="progressBarModal halfFilledModal"></div>  
                                        </div>
                                        <span class="subtaskInfoModal">1/2 Subtasks</span>
                                    </div>
                                <div class="assignedToContainerModal">
                                    <div class="assignedUsersModal">
                                        <span class="assignedUserModal">KS</span>
                                        <span class="assignedUserModal">DB</span>
                                        <span class="assignedUserModal">OG</span>
                                    </div>
                                    <img src="/assets/img/prioMedium.svg" alt="" class="taskPrioMediumModal">
                                </div>
                            </div>`;
}