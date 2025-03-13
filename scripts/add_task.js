function toggleDropdownName() {
    let customDropdownName = document.getElementById('customDropdownName');
    let dropdown = document.getElementById('dropdownListName');
    let dropdownIcon = document.getElementById('dropdownIconName');
    customDropdownName.classList.toggle('activeBorder');
    // dropdown.classList.toggle('dNone');
    // dropdown.classList.toggle('transformList');
    dropdownIcon.classList.toggle('rotate');
    toggleAnimation(dropdown);
}

function toggleDropdownCategory() {
    let customDropdownCategory = document.getElementById('customDropdownCategory');
    let dropdown = document.getElementById('dropdownListCategory');
    let dropdownIcon = document.getElementById('dropdownIconCategory');
    customDropdownCategory.classList.toggle('activeBorder');
    dropdown.classList.toggle('dNone');
    dropdownIcon.classList.toggle('rotate');
}

function toggleAnimation(dropdown) {
    

    if (dropdown.classList.contains("visible")) {
        dropdown.classList.remove("visible");
        setTimeout(() => {
            dropdown.classList.add("hidden");
        }, 300); // Timeout auf die Transition-Dauer setzen
    } else {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("visible");
    }
}

function selectPriority(priority) {
    let urgentBtn = document.getElementById('priorityUrgentBtn');
    let mediumBtn = document.getElementById('priorityMediumBtn');
    let lowBtn = document.getElementById('priorityLowBtn');
    let urgentIcon = document.getElementById('urgentIcon');
    let mediumIcon = document.getElementById('mediumIcon');
    let lowIcon = document.getElementById('lowIcon');
    resetPriorityClassList(urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon);
    setPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon);
}

function resetPriorityClassList(urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon) {
    urgentBtn.classList.add('hoverBtn');
    urgentBtn.classList.remove('activeUrgentBtn');
    urgentIcon.classList.remove('whiteIcon');
    mediumBtn.classList.add('hoverBtn');
    mediumBtn.classList.remove('activeMediumBtn');
    mediumIcon.classList.remove('whiteIcon');
    lowBtn.classList.add('hoverBtn');
    lowBtn.classList.remove('activeLowBtn');
    lowIcon.classList.remove('whiteIcon');
}

function setPriorityClassList(priority, urgentBtn, mediumBtn, lowBtn, urgentIcon, mediumIcon, lowIcon) {
    if (priority === 'urgent') {
        urgentBtn.classList.remove('hoverBtn');
        urgentBtn.classList.add('activeUrgentBtn');
        urgentIcon.classList.add('whiteIcon');
    } else if (priority === 'medium') {
        mediumBtn.classList.remove('hoverBtn');
        mediumBtn.classList.add('activeMediumBtn');
        mediumIcon.classList.add('whiteIcon');
    } else if (priority === 'low') {
        lowBtn.classList.remove('hoverBtn');
        lowBtn.classList.add('activeLowBtn');
        lowIcon.classList.add('whiteIcon');
    }
}