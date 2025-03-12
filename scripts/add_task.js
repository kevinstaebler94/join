function toggleDropdownName() {
    let dropdown = document.getElementById('dropdownListName');
    let dropdownIcon = document.getElementById('dropdownIconName');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
}

function toggleDropdownCategory() {
    let dropdown = document.getElementById('dropdownListCategory');
    let dropdownIcon = document.getElementById('dropdownIconCategory');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
}

function selectPriority(priority) {
    let urgentBtn = document.getElementById('priorityUrgentBtn');
    let mediumBtn = document.getElementById('priorityMediumBtn');
    let lowBtn = document.getElementById('priorityLowBtn');
    let urgentIcon = document.getElementById('urgentIcon');
    let mediumIcon = document.getElementById('mediumIcon');
    let lowIcon = document.getElementById('lowIcon');
    removePriorityClassList(urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon);
    addPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon);
}

function removePriorityClassList(urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon) {
    urgentBtn.classList.remove('activeUrgentBtn');
    urgentIcon.classList.remove('whiteIcon');
    mediumBtn.classList.remove('activeMediumBtn');
    mediumIcon.classList.remove('whiteIcon');
    lowBtn.classList.remove('activeLowBtn');
    lowIcon.classList.remove('whiteIcon');
}

function addPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon) {
    if (priority === 'urgent') {
        urgentBtn.classList.add('activeUrgentBtn');
        urgentIcon.classList.add('whiteIcon');
    } else if (priority === 'medium') {
        mediumBtn.classList.add('activeMediumBtn');
        mediumIcon.classList.add('whiteIcon');
    } else if (priority === 'low') {
        lowBtn.classList.add('activeLowBtn');
        lowIcon.classList.add('whiteIcon');
    }
}