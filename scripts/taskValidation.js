/**
 * Validates task form inputs and either shows errors or pushes task.
 */
function checkValidation() {
    let titleInput = document.getElementById('titleInput');
    let requiredTitle = document.getElementById('requiredTitle');
    let dateInput = document.getElementById('dateInput');
    let requiredDate = document.getElementById('requiredDate');
    let selectedCategory = document.getElementById('selectedCategory');
    let categoryInput = document.getElementById('customDropdownCategory');
    let requiredCategory = document.getElementById('requiredCategory');
    styleRequiredFields(titleInput, requiredTitle, dateInput, requiredDate, selectedCategory, categoryInput, requiredCategory);
}

/**
 * Styles and marks required fields if they are empty or invalid.
 * Also triggers task submission and visual feedback if all fields are valid.
 * @param {HTMLInputElement} titleInput - Input element for task title.
 * @param {HTMLElement} requiredTitle - Element for showing title validation message.
 * @param {HTMLInputElement} dateInput - Input element for due date.
 * @param {HTMLElement} requiredDate - Element for showing date validation message.
 * @param {HTMLElement} selectedCategory - Dropdown element showing selected category.
 * @param {HTMLElement} categoryInput - Element representing the category input UI.
 * @param {HTMLElement} requiredCategory - Element for showing category validation message.
 */
function styleRequiredFields(titleInput, requiredTitle, dateInput, requiredDate, selectedCategory, categoryInput, requiredCategory) {
    if (titleInput.value == '') {
        titleInput.classList.add('required');
        requiredTitle.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
    } if (dateInput.value.length < 10) {
        dateInput.classList.add('required');
        requiredDate.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
    } if (selectedCategory.innerHTML == 'Select category') {
        categoryInput.classList.add('required');
        requiredCategory.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
    } else {
        pushTasks(loggedInUser, assignedArr);
        showAddedBoardImg();
    }
}

/**
 * Delays and then checks if the date input is valid.
 * If not, shows a required field message.
 */
function checkDateValidation() {
    setTimeout(() => {
        let dateInput = document.getElementById('dateInput');
        let requiredDate = document.getElementById('requiredDate');
        if (dateInput.value.length < 10) {
            dateInput.classList.add('required');
            requiredDate.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
        }
    }, 100);
}

/**
 * Removes the error styling and message for the task title input if it has content.
 */
function removeTitleRequired() {
    let titleInput = document.getElementById('titleInput');
    let requiredTitle = document.getElementById('requiredTitle');
    if (titleInput.value.length > 0) {
        titleInput.classList.remove('required');
        requiredTitle.innerHTML = '';
    }
}

/**
 * Removes the error styling and message for the date input if it has content.
 */
function removeDateRequired() {
    let dateInput = document.getElementById('dateInput');
    let requiredDate = document.getElementById('requiredDate');
    if (dateInput.value.length > 0) {
        dateInput.classList.remove('required');
        requiredDate.innerHTML = '';
    }
}

/**
 * Removes the error styling and message for the category input.
 */
function removeCategoryRequired() {
    let categoryInput = document.getElementById('customDropdownCategory');
    let requiredCategory = document.getElementById('requiredCategory');
    categoryInput.classList.remove('required');
    requiredCategory.innerHTML = '';
}