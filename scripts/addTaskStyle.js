/**
 * Applies specific styles for the selected priority.
 */
function setPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon, urgentIconWhite, mediumIconWhite) {
    if (priority === 'urgent') {
        urgentBtn.classList.remove('hoverBtn');
        urgentBtn.classList.add('activeUrgentBtn');
        urgentIcon.classList.add('dNone');
        urgentIconWhite.classList.remove('dNone');
        prioBtn = 'urgent';
    } else if (priority === 'medium') {
        mediumBtn.classList.remove('hoverBtn');
        mediumBtn.classList.add('activeMediumBtn');
        mediumIcon.classList.add('dNone');
        mediumIconWhite.classList.remove('dNone');
        prioBtn = 'medium';
    } else if (priority === 'low') {
        lowBtn.classList.remove('hoverBtn');
        lowBtn.classList.add('activeLowBtn');
        lowIcon.classList.add('dNone');
        lowIconWhite.classList.remove('dNone');
        prioBtn = 'low';
    }
}

/**
 * Returns a consistent color based on the contact name.
 * @param {string} name - Name to derive color from.
 * @returns {string} - Hex color code.
 */
function getColorFromName(name) {
    let sum = 0;
    if (!name) {
        return;
    }
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i) + (i + 1);
    }
    let index = sum % colors.length;
    return colors[index];
}

/**
 * Sets background color of a contact's initial container.
 * @param {string} contact - Name of the contact.
 */
function styleInitalName(contact) {
    let initalContainer = document.getElementById('initalContainer' + contact);
    let color = getColorFromName(contact);
    initalContainer.style.backgroundColor = color;
    initialColor[contact] = color;
}

/**
 * Applies background color to assigned contact initial element.
 * @param {string} contact - Name of the contact.
 */
function getContactInitialColor(contact) {
    let contactAssignedInitial = document.getElementById('contactAssignedInitial' + contact);
    contactAssignedInitial.style.backgroundColor = initialColor[contact];
}

/**
 * Styles and resets dropdown elements when clicked outside.
 * @param {HTMLElement} contactListContainer - Container for contact list.
 * @param {HTMLInputElement} assignedInput - Assigned contact input.
 */
function styleDropdown(contactListContainer, assignedInput) {
    document.getElementById('dropdownListName')?.classList.add('dNone');
    document.getElementById('dropdownIconName')?.classList.remove('rotate');
    document.getElementById('customDropdownName')?.classList.remove('activeBorder');
    document.getElementById('customDropdownCategory')?.classList.remove('activeBorder');
    document.getElementById('dropdownListCategory')?.classList.add('dNone');
    document.getElementById('dropdownIconCategory')?.classList.remove('rotate');
    contactListContainer?.classList.add('dNone');
    if (typeof isOpen !== 'undefined') {
        isOpen = false;
    }
    if (assignedInput && assignedInput.value === '') {
        assignedInput.value = 'Assigned to';
    }
}

function initFlatpickrInModal() {
    const calendarWrapper = document.querySelector("#calendarWrap");
    if (calendarWrapper && !calendarWrapper._flatpickr) {
        flatpickr(calendarWrapper, {
            wrap: true,
            dateFormat: "d/m/Y",
            allowInput: true,
            minDate: "today"
        });
    }
}