document.addEventListener('DOMContentLoaded', function () {
  initSubtaskInputListener();
});

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.getElementById('dropdownListName').classList.add('dNone');
    document.getElementById('dropdownIconName').classList.remove('rotate');
    document.getElementById('customDropdownName').classList.remove('activeBorder');
    document.getElementById('contactListContainer').classList.add('dNone');
    document.getElementById('customDropdownCategory').classList.remove('activeBorder');
    document.getElementById('dropdownListCategory').classList.add('dNone');
    document.getElementById('dropdownIconCategory').classList.remove('rotate');
  }
});

window.addEventListener('mousedown', function (event) {
  const modal = document.getElementById('addTaskModal');
  if (modal && modal.classList.contains('dNone')) return;
  setTimeout(() => {
    const wrappers = document.querySelectorAll('.customSelectWrapper');
    const contactListContainer = document.getElementById('contactListContainer');
    const assignedInput = document.getElementById('assignedInput');
    const clickInsideContactList = contactListContainer?.contains(event.target) ?? false;
    const clickInsideAssignedInput = assignedInput?.contains(event.target) ?? false;
    if (!wrappers.length && !contactListContainer && !assignedInput) return;
    let clickInsideAnyWrapper = false;
    wrappers.forEach(wrapper => {
      if (wrapper.contains(event.target)) {
        clickInsideAnyWrapper = true;
      }
    });
    if (!clickInsideAnyWrapper && !clickInsideContactList && !clickInsideAssignedInput) {
      styleDropdown(contactListContainer, assignedInput);
    }
  }, 30);
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('addTaskModal');
  if (modal && modal.classList.contains('dNone')) return;
  flatpickr("#calendarWrap", {
    wrap: true,
    dateFormat: "d/m/Y",
    allowInput: true,
    minDate: "today",
    disableMobile: true,
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 1023) {
    document
      .querySelectorAll('[draggable="true"]')
      .forEach((el) => (el.draggable = false));
  } else {
    document
      .querySelectorAll('[draggable="false"]')
      .forEach((el) => (el.draggable = true));
  }
})

document.addEventListener('dragstart', (e) => {
  if (window.innerWidth <= 1023) {
    e.preventDefault();
  }
});

window.addEventListener('resize', () => {
  if (window.location.href.includes("board.html")) {
    if (window.innerWidth <= 1023) {
      disableDragging();
    } else {
      enableDragging();
    }
  } else {
    return;
  }

});

window.addEventListener('resize', () => {
  if (window.location.href.includes("board.html")) {
    if (window.innerWidth >= 1023) {
      returnToBoard();
    }
  } else {
    return;
  }

});