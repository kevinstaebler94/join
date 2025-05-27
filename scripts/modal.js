/**
 * Opens the modal for adding a new task.
 * Shows overlay, task modal, and adjusts header layout.
 */
function openAddTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    let boardHeaderWrapper = document.getElementById('boardHeaderWrapper');
    overlay.classList.remove('dNone');
    addTaskModal.classList.remove('dNone');
    boardHeaderWrapper.classList.add('minusMarginAddTask');
    getAddTaskStructure();
}

/**
 * Opens the modal to display a filled task.
 * @param {string} taskId - The ID of the task.
 * @param {string} category - The category of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The task's description.
 * @param {string} date - The due date of the task.
 * @param {string} priority - The task's priority (e.g., 'urgent').
 * @param {string} column - The board column the task is in.
 * @param {Object} subtaskObj - The object containing all subtasks.
 * @param {string} encodedContacts - URI-encoded string of contacts.
 */
function openFilledTaskModal(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts) {
    let overlay = document.getElementById('boardOverlay');
    let mobileTaskOverlay = document.getElementById("moveToOverlayWrapper");
    let filledTaskModal = document.getElementById('filledTaskModal');
    let boardHeaderWrapper = document.getElementById('boardHeaderWrapper');
    if(window.innerWidth < 1023) {
        mobileTaskOverlay.classList.remove("displayNone");
    }
    overlay.classList.remove('dNone');
    filledTaskModal.classList.remove('dNone');
    boardHeaderWrapper.classList.add('minusMargin');
    getFilledStructure(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts);

}

/**
 * Closes all modals and resets the layout.
 * Clears modal content and resets subtask arrays.
 */
function closeModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    let filledTaskModal = document.getElementById('filledTaskModal');
    let boardHeaderWrapper = document.getElementById('boardHeaderWrapper');
    addTaskModal.innerHTML = '';
    overlay.classList.add('dNone');
    addTaskModal.classList.add('dNone');
    filledTaskModal.classList.add('dNone');
    boardHeaderWrapper.classList.remove('minusMargin');
    boardHeaderWrapper.classList.remove('minusMarginAddTask');
    newSubtaskArr = [];
    assignedArr = [];
}

/**
 * Handles focus-out event with a delay to reset subtask icons.
 */
function handleFocusOut() {
    setTimeout(() => {
        resetSubtaskIcons();
    }, 100);
}

/**
 * Renders contact elements for the modal.
 * @param {string[]} contacts - List of contact names.
 */
async function getContactsModal(contacts) {
    contacts.forEach(contact => {
        let contactContainer = document.getElementById('assignedContainerModal');
        contactContainer.innerHTML += `<div class="assignedToModal"><span id="contactInitialContainer${contact}" class="assignedContactModal">${getInitials(contact)}</span><p>${contact}</p></div>`;
        getContactInitialColorModal(contact);
    });
}

/**
 * Renders contact initials in edit mode.
 * @param {string[]} contacts - List of contact names.
 */
function getContactsEdit(contacts) {
    contacts.forEach(contact => {
        let assignetContainer = document.getElementById('assignedContainer');
        assignetContainer.innerHTML += `<p id="contactInitialContainer${contact}" class="contactInitial">${getInitials(contact)}</p>`;
        getContactInitialColorEdit(contact);
    });
}

/**
 * Renders subtasks as checkbox elements in modal.
 * @param {Object} subtasks - The subtask object with ID and status.
 * @param {string} taskId - ID of the task the subtasks belong to.
 */
async function getSubtasksModal(subtasks, taskId) {
    let entries = Object.entries(subtasks?.subtask || {});
    entries.forEach(([subtaskId, subtask]) => {
        let subtaskContainer = document.getElementById('subtaskContainerModal');
        let isChecked = subtask.done ? 'checked' : '';
        subtaskContainer.innerHTML += `<label class="assignedToModal customCheckbox"><input type="checkbox" ${isChecked}
        onchange="handleCheckbox(this)" data-task-id="${taskId}" data-subtask-id="${subtaskId}"><span class="iconBlack"></span><p class="subtaskText">${subtask.subtask}</p></label>`;
    });
}

/**
 * Prepares and renders the subtask edit view.
 * @param {Object} subtasks - Object containing subtasks.
 * @param {string} encodedSubtasks - URI-encoded subtask data.
 */
function getSubtaskEdit(subtasks, encodedSubtasks) {
    subtasksArr.push(subtasks.subtask);
    if (!subtasksArr[0]) {
        return;
    } else {
        renderSubtasksEdit(subtasks, encodedSubtasks);
    };
}

/**
 * Displays subtask edit icons on hover.
 * @param {HTMLElement} element - The container element hovered over.
 */
function showEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.remove('dNone');
}

/**
 * Hides subtask edit icons on mouse leave.
 * @param {HTMLElement} element - The container element.
 */
function hideEditIcons(element) {
    let iconContainer = element.querySelector('.iconContainer');
    iconContainer.classList.add('dNone');
}

/**
 * Prepares the input icons when adding a new subtask.
 */
function getAddNewSubtask() {
    let inputIconContainer = document.getElementById('inputIconContainer');
    let plusIcon = document.getElementById('plusIcon');
    inputIconContainer.classList.add('inputIconContainer');
    plusIcon.classList.remove('plusIcon');
    inputIconContainer.innerHTML = `<img onclick="cancelValue()" id="plusIcon" class="editIcons" src="./assets/img/cancel.svg" alt="plus-icon">
                                    <span class="iconDivider">|</span>
                                    <img onclick="addNewSubtaskModal()" id="doneIcon" class="editIcons" src="./assets/img/done.svg" alt="">`;
}

/**
 * Resets the subtask icons to the initial state (plus icon only).
 */
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
    document.getElementById('subtaskInputModal').blur();
}

/**
 * Switches to subtask edit mode for the selected subtask.
 * @param {string} subtaskId - ID of the subtask to edit.
 */
function getEditSubtaskModal(subtaskId) {
    let subtaskContainer = document.getElementById('subtaskContainer' + subtaskId);
    let subtaskEditContainer = document.getElementById('subtaskEditContainer' + subtaskId);
    subtaskContainer.classList.add('dNone');
    subtaskEditContainer.classList.remove('dNone');
}

/**
 * Saves the edited subtask and returns to display mode.
 * @param {string} subtaskId - ID of the subtask.
 * @param {number} subtaskIndex - Index of the subtask in the array.
 */
function editSubtaskModal(subtaskId, subtaskIndex) {
    let subtaskContainer = document.getElementById('subtaskContainer' + subtaskId);
    let subtaskEditContainer = document.getElementById('subtaskEditContainer' + subtaskId);
    let subtaskValue = document.getElementById('subtaskValue' + subtaskId);
    let editSubtaskInput = document.getElementById('editSubtaskInput' + subtaskId);
    subtasksArr[0][subtaskIndex].subtask = editSubtaskInput.value;
    subtaskValue.innerHTML = editSubtaskInput.value;
    subtaskContainer.classList.remove('dNone');
    subtaskEditContainer.classList.add('dNone');
}

/**
 * Serializes subtask object to URI-encoded JSON.
 * @param {Object} subtasks - The subtask object.
 * @returns {string} - URI-encoded string of subtasks.
 */
function serializeObj(subtasks) {
    let serializedSubtasks = encodeURIComponent(JSON.stringify(subtasks));
    return serializedSubtasks;
}

/**
 * Deletes a subtask and updates the view.
 * @param {string} subtaskId - ID of the subtask.
 * @param {number} subtaskIndex - Index of subtask in the array.
 * @param {string} encodedSubtasks - Encoded subtask data.
 */
function deleteSubtaskModal(subtaskId, subtaskIndex, encodedSubtasks) {
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let subtaskListEdit = document.getElementById('subtaskListEdit');
    subtasksArr.push(subtasks.subtask);
    newSubtaskArr.push(subtasks.subtask);
    subtasksArr[0].splice(subtaskIndex, 1);
    newSubtaskArr[0].splice(subtaskIndex, 1);
    subtasks.subtask = subtasksArr[0];
    subtaskListEdit.innerHTML = '';
    getSubtaskEdit(subtasks, serializeObj(subtasks));
}

/**
 * Deletes a subtask directly from the edit list.
 * @param {string} subtaskId - ID of the subtask.
 * @param {number} subtaskIndex - Index of subtask in the array.
 * @param {string} encodedSubtasks - Encoded subtask data.
 */
function deleteEditSubtask(subtaskId, subtaskIndex, encodedSubtasks) {
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let subtaskListElement = document.getElementById('subtaskListElement' + subtaskIndex);
    newSubtaskArr[0].splice(subtaskIndex, 1);
    subtaskListElement.innerHTML = '';
}

/**
 * Cancels subtask input and resets icons after short delay.
 */
function cancelValue() {
    let subtaskInput = document.getElementById('subtaskInput');
    subtaskInput.value = '';
    subtaskInput.blur();
    setTimeout(() => {
        resetSubtaskIcons();
    }, 50);
}

/**
 * Handles contact assignment by toggling checkbox state.
 * Updates and displays currently assigned contacts.
 * @param {HTMLInputElement} checkboxElement - The clicked checkbox element.
 */
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

/**
 * Sets the background color of contact initials in the modal.
 * @param {string} contact - The name of the contact.
 */
function getContactInitialColorModal(contact) {
    let contactInitialContainer = document.getElementById('contactInitialContainer' + contact);
    contactInitialContainer.style.backgroundColor = initialColor[contact];
}

/**
 * Sets the background color of contact initials in the edit view.
 * @param {string} contact - The name of the contact.
 */
function getContactInitialColorEdit(contact) {
    let contactInitialContainer = document.getElementById('contactInitialContainer' + contact);
    contactInitialContainer.style.backgroundColor = initialColor[contact];
}

/**
 * Global keyup listener for handling "Enter" key events in inputs.
 * Adds or confirms subtasks depending on active input.
 */
