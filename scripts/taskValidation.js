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

function checkDateValidation() {
    setTimeout(() => {
        let dateInput = document.getElementById('dateInput');
        let requiredDate = document.getElementById('requiredDate');
        if (dateInput.value.length < 10) {
            dateInput.classList.add('required');
            // requiredDate.classList.remove('requiredDate');
            requiredDate.innerHTML = `<p class="fontRed requiredFont">This field is required</p>`;
        }
    }, 100);
}

function removeTitleRequired() {
    let titleInput = document.getElementById('titleInput');
    let requiredTitle = document.getElementById('requiredTitle');
    if (titleInput.value.length > 0) {
        titleInput.classList.remove('required');
        requiredTitle.innerHTML = '';
    }
}

function removeDateRequired() {
    let dateInput = document.getElementById('dateInput');
    let requiredDate = document.getElementById('requiredDate');
    if (dateInput.value.length > 0) {
        dateInput.classList.remove('required');
        requiredDate.innerHTML = '';
    }
}

function removeCategoryRequired() {
    let categoryInput = document.getElementById('customDropdownCategory');
    let requiredCategory = document.getElementById('requiredCategory');
    categoryInput.classList.remove('required');
    requiredCategory.innerHTML = '';
}