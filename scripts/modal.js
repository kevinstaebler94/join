function openAddTaskModal() {
    let overlay = document.getElementById('boardOverlay');
    let addTaskModal = document.getElementById('addTaskModal');
    let boardHeaderWrapper = document.getElementById('boardHeaderWrapper');
    overlay.classList.remove('dNone');
    addTaskModal.classList.remove('dNone');
    boardHeaderWrapper.classList.add('minusMarginAddTask');
    getAddTaskStructure();
}

function openFilledTaskModal(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts) {
    let overlay = document.getElementById('boardOverlay');
    let filledTaskModal = document.getElementById('filledTaskModal');
    let boardHeaderWrapper = document.getElementById('boardHeaderWrapper');
    overlay.classList.remove('dNone');
    filledTaskModal.classList.remove('dNone');
    boardHeaderWrapper.classList.add('minusMargin');
    getFilledStructure(taskId, category, title, description, date, priority, column, subtaskObj, encodedContacts);

}

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
}

function handleFocusOut() {
    setTimeout(() => {
        resetSubtaskIcons();
    }, 100);
}

async function getContactsModal(contacts) {
    contacts.forEach(contact => {
        let contactContainer = document.getElementById('assignedContainerModal');
        contactContainer.innerHTML += `<div class="assignedToModal"><span id="contactInitialContainer${contact}" class="assignedContactModal">${getInitials(contact)}</span><p>${contact}</p></div>`;
        getContactInitialColorModal(contact);
    });
}

function getContactsEdit(contacts) {
    contacts.forEach(contact => {
        let assignetContainer = document.getElementById('assignedContainer');
        assignetContainer.innerHTML += `<p id="contactInitialContainer${contact}" class="contactInitial">${getInitials(contact)}</p>`;
        getContactInitialColorEdit(contact);
    });
}

async function getSubtasksModal(subtasks, taskId) {
    let entries = Object.entries(subtasks?.subtask || {});
    entries.forEach(([subtaskId, subtask]) => {
        let subtaskContainer = document.getElementById('subtaskContainerModal');
        let isChecked = subtask.done ? 'checked' : '';
        subtaskContainer.innerHTML += `<label class="assignedToModal customCheckbox"><input type="checkbox" ${isChecked}
        onchange="handleCheckbox(this)" data-task-id="${taskId}" data-subtask-id="${subtaskId}"><span class="icon"></span><p class="subtaskText">${subtask.subtask}</p></label>`;
    });
}

function getSubtaskEdit(subtasks, encodedSubtasks) {
    subtasksArr.push(subtasks.subtask);
    if (!subtasksArr[0]) {
        return;
    } else {
        renderSubtasksEdit(subtasks, encodedSubtasks);
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
                                    <img onclick="addNewSubtaskModal()" id="doneIcon" class="editIcons" src="./assets/img/done.svg" alt="">`;
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
    document.getElementById('subtaskInputModal').blur();
}

function getEditSubtaskModal(subtaskId) {
    let subtaskContainer = document.getElementById('subtaskContainer' + subtaskId);
    let subtaskEditContainer = document.getElementById('subtaskEditContainer' + subtaskId);
    subtaskContainer.classList.add('dNone');
    subtaskEditContainer.classList.remove('dNone');
}

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

function serializeObj(subtasks) {
    let serializedSubtasks = encodeURIComponent(JSON.stringify(subtasks));
    return serializedSubtasks;
}

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
    subtasksArr = [];
}

function deleteEditSubtask(subtaskId, subtaskIndex, encodedSubtasks) {
    let subtasks = JSON.parse(decodeURIComponent(encodedSubtasks));
    let subtaskListElement = document.getElementById('subtaskListElement' + subtaskIndex);
    newSubtaskArr[0].splice(subtaskIndex, 1);
    subtaskListElement.innerHTML = '';
}

function cancelValue() {
    let subtaskInput = document.getElementById('subtaskInput');
    subtaskInput.value = '';
    subtaskInput.blur();
    setTimeout(() => {
        resetSubtaskIcons();
    }, 50);
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
    assignedArr.forEach(contact => {
        assignedContainer.innerHTML += `<p class="contactInitial">${getInitials(contact)}</p>`;
    });
}

function getContactInitialColorModal(contact) {
    let contactInitialContainer = document.getElementById('contactInitialContainer' + contact);
    contactInitialContainer.style.backgroundColor = initialColor[contact];
}

function getContactInitialColorEdit(contact) {
    let contactInitialContainer = document.getElementById('contactInitialContainer' + contact);
    contactInitialContainer.style.backgroundColor = initialColor[contact];
}

document.addEventListener('keyup', function (event) {
    const input = document.getElementById('subtaskInput');
    const inputModal = document.getElementById('subtaskInputModal');

    if (event.key === 'Enter') {
        if (input && event.target === input) {
            getSubtask();
        } else if (inputModal && event.target === inputModal) {
            addNewSubtaskModal();
        }
    }
});