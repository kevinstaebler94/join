function getInitialStyle(task, contacts) {
  let contact;
  let initial;
  let taskId = task.id;
  if (contacts) {
    contacts.forEach((element) => {
      contact = element;
      initial = getInitials(contact);
      styleInitalNameBoard(contact, initial, taskId);
    });
  }
}

/**
 * Converts contact names to initials.
 * @param {Array} contactData - List of contact names
 * @returns {Array} - Initials of contacts
 */
function convertNameToInitial(contactData) {
  return contactData.map((name) =>
    name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
  );
}

/**
 * Styles the background color of user initials on the board.
 * @param {string} contact - Full name of the contact
 * @param {string} initial - Initials of the contact
 */
function styleInitalNameBoard(contact, initial, taskId) {
  let initalContainer = document.getElementById(
    "assignedUser" + initial + taskId
  );
  let color = getColorFromName(contact);
  if (!initalContainer) return;
  initalContainer.style.backgroundColor = color;
  initialColor[contact] = color;
}

function styleInitalHigherThree(contact, initial, taskId) {
  let initalContainer = document.getElementById(
    "assignedUser" + initial + taskId
  );
  let color = getColorFromName(contact);
  if (!initalContainer) {
    return;
  } else {
    initalContainer.style.backgroundColor = color;
    initialColor[contact] = color;
  }
}