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