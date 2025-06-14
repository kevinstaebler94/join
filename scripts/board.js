let taskContainer = [];
let resizeTimeout;
/**
 * Initializes the board by loading HTML, fetching the logged-in user,
 * and rendering tasks.
 */
async function initBoard() {
  await includeHTML();
  await getLoggedInUser();
  await renderTasks();
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1170) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      checkWindowSize();
    }, 10);
  }
  if (window.innerWidth <= 1023) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      window.location.href = "./board.html";
    }, 500);
  }
});

/**
 * Returns the appropriate column ID depending on screen size.
 * @param {string} column - The base column name
 * @returns {string} - Adjusted column ID for desktop or mobile
 */
function getColumnId(column) {
  if (window.innerWidth <= 1023) {
    document
      .querySelectorAll('[draggable="true"]')
      .forEach((el) => (el.draggable = false));
    return column + "Mobile";
  }
  return column;
}

/**
 * Renders all tasks from Firebase into the board columns.
 */
async function renderTasks() {
  let tasks = await getData("/users/" + loggedInUser + "/tasks");
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];
  let countArr = [];
  columns.forEach((id) => {
    document.getElementById(getColumnId(id)).innerHTML = "";
  });

  let taskArr = Object.values(tasks || {});
  taskArr.forEach((task) => {
    const targetId = getColumnId(task.column);
    const target = document.getElementById(targetId);
    taskContainer.push(task.id);
    if (!target) return;
    let taskComponents = getTaskComponents(task);
    target.innerHTML += filledTaskTemplate(taskComponents, task);
    if (!task.contact) return;
    task.contact.forEach((contact) => {
      let initial = getInitials(contact);
      countArr.push(contact);
      if (task.contact.length > 3) {
        countInitials(countArr, task.id);
        styleInitalNameBoard(contact, initial, task.id);
      } else {
        styleInitalNameBoard(contact, initial, task.id);
      }
    });
    countArr = [];
  });
  columns.forEach((id) => {
    const column = document.getElementById(getColumnId(id));
    if (!column.innerHTML.trim()) {
      column.innerHTML = blankTask(id);
    }
  });
  initProgressBar(tasks);
}

/**
 * Extracts structured components from a task object.
 * @param {Object} task - The task object
 * @returns {Object} taskComponents - Normalized task data
 */
function getTaskComponents(task) {
  const prio = task?.prio || "";
  const capitalizedPrio =
    prio.charAt(0).toUpperCase() + prio.slice(1).toLowerCase();

  return (taskComponents = {
    category: task.category,
    title: task.title,
    description: task.description,
    date: task.date,
    prio: task.prio,
    subtask: task.subtask,
    id: task.id,
    capitalizedPrio: capitalizedPrio,
    contact: task.contact,
    column: task.column,
  });
}

/**
 * Generates HTML for a task including title, description, progress bar and assigned contacts.
 * @param {Object} taskComponents - Task data
 * @returns {string} - HTML string for the task
 */
function filledTaskTemplate(taskComponents) {
  let subtaskData = taskComponents.subtask ? taskComponents.subtask : [];
  let isChecked = subtaskData.filter((st) => st.done === true).length;
  let contactData = taskComponents.contact ? taskComponents.contact : [];
  let serializedSubtasks = encodeURIComponent(JSON.stringify(taskComponents));
  let serializedContacts = encodeURIComponent(JSON.stringify(contactData));
  let initials = convertNameToInitial(contactData);
  let progressBarHTML = getProgressBarHTML(
    taskComponents,
    subtaskData,
    isChecked
  );
  let filledTaskHTML = getFilledTaskHTML(
    taskComponents,
    serializedSubtasks,
    serializedContacts,
    initials,
    progressBarHTML
  );

  return filledTaskHTML;
}

/**
 * Generates placeholder HTML when no tasks are available.
 * @param {string} columnName - The name of the column
 * @returns {string} - HTML string for blank task
 */
function blankTask(columnName) {
  return `
    <div class="blankTask marginBottom">
      <span>No tasks ${columnName.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
    </div>
  `;
}

/**
 * Handles the dragstart event by storing task ID and source column.
 * @param {DragEvent} ev
 */
function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("column", ev.target.closest(".dropZone").id);
}

function dragendHandler() {
  document
    .querySelectorAll(".dropZone")
    .forEach((zone) => zone.classList.remove("highlight"));
}

/**
 * Prevents default behavior to allow drop.
 * @param {DragEvent} ev
 */
function dragoverHandler(ev) {
  ev.preventDefault();
  document
    .querySelectorAll(".dropZone")
    .forEach((zone) => zone.classList.remove("highlight"));
  const currentZone = ev.target.closest(".dropZone");
  if (currentZone) currentZone.classList.add("highlight");
}

/**
 * Handles dropping of a task into a new column and updates the database.
 * @param {DragEvent} ev
 */
async function dropHandler(ev) {
  ev.preventDefault();
  const taskId = ev.dataTransfer.getData("text");
  const taskElement = document.getElementById(taskId);
  const dropZone = ev.target.closest(".dropZone");

  if (dropZone && taskElement) {
    const newColumn = dropZone.id;
    let task = await getData(`/users/${loggedInUser}/tasks/${taskId}`);

    if (task) {
      task.column = newColumn;
      await putData(`/users/${loggedInUser}/tasks/`, task, task.id);
      renderTasks();
    }
  }
  document
    .querySelectorAll(".dropZone")
    .forEach((zone) => zone.classList.remove("highlight"));
}

/**
 * Filters tasks based on input text and renders the results.
 * @param {string} id - The input field ID
 */
async function filterTasks(id) {
  let tasks = await getData(`/users/${loggedInUser}/tasks`);
  let input = document.getElementById(id).value.toLowerCase();
  let tasksArr = Object.values(tasks || {});

  if (!input.trim()) {
    renderTasks();
    return;
  }
  let result = tasksArr.filter(
    (task) =>
      task.title.toLowerCase().includes(input) ||
      task.description?.toLowerCase().includes(input)
  );
  renderFilteredTasks(result, tasks);
}

/**
 * Renders tasks based on the filter results.
 * @param {Array} filtered - Array of filtered task objects
 */
async function renderFilteredTasks(filtered, filteredTask) {
  const isMobile = window.innerWidth <= 768;
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];
  const columnIds = columns.map((col) => (isMobile ? col + "Mobile" : col));
  columnIds.forEach((id) => (document.getElementById(id).innerHTML = ""));

  if (!filtered.length)
    return columnIds.forEach(
      (id) => (document.getElementById(id).innerHTML = blankTask(id))
    );

  for (const task of filtered) {
    const prio = task?.prio || "";
    task.capitalizedPrio = prio.charAt(0).toUpperCase() + prio.slice(1);
    const targetId = isMobile ? task.column + "Mobile" : task.column;
    const target = document.getElementById(targetId);
    if (target) target.innerHTML += filledTaskTemplate(task);
    getInitialStyle(task, task.contact);
  }

  columnIds.forEach((id) => {
    const col = document.getElementById(id);
    if (col && !col.innerHTML.trim()) col.innerHTML = blankTask(id);
  });

  initProgressBar(filteredTask);
}

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
 * Filters tasks based on input or resets view.
 * @param {string} id - The input field ID
 */
async function handleTaskInput(id) {
  const input = document.getElementById(id).value.trim();

  if (!input.length) {
    renderTasks();
    return;
  }
  await filterTasks(id);
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
 * Updates subtask checkbox state and re-renders the board.
 * @param {HTMLInputElement} checkbox
 */
async function handleCheckbox(checkbox) {
  let subtaskInfo = document.getElementById(
    "subtaskInfo" + checkbox.dataset.taskId
  );
  let list = document.querySelectorAll(
    '.assignedToModal input[type="checkbox"]'
  );
  let label = checkbox.closest("label");
  let currentSubtask = label?.querySelector("p")?.textContent.trim();
  let taskId = checkbox.dataset.taskId;
  let done = checkbox.checked;
  let subtaskId = checkbox.dataset.subtaskId;
  let checkboxArr = Array.from(list);
  let checkboxTotal = checkboxArr.length;
  let isChecked = checkboxArr.filter((cb) => cb.checked === true).length;
  subtaskInfo.innerHTML = `<span id="subtaskInfo${checkbox.dataset.taskId}" class="subtaskInfo">${isChecked}/${checkboxTotal} Subtasks</span>`;
  await pushSubtasks(loggedInUser, taskId, done, currentSubtask, subtaskId);
  showProgressBar(isChecked, checkboxTotal, taskId);
}

/**
 * Animates and displays the progress bar of a task.
 * @param {number} isChecked - Checked subtasks
 * @param {number} checkboxTotal - Total subtasks
 * @param {string} taskId - ID of the task
 */
async function showProgressBar(isChecked, checkboxTotal, taskId) {
  let progressBar = document.getElementById(`progressBar${taskId}`);
  if (progressBar) {
    let progress = (isChecked / checkboxTotal) * 100;
    setTimeout(() => {
      progressBar.style.width = `${progress}%`;
    }, 10);
  }
}

/**
 * Generates HTML for the progress bar container.
 */
function getProgressBarHTML(taskComponents, subtaskData, isChecked) {
  return subtaskData.length > 0
    ? `
    <div id="subtasksContainer${taskComponents.id}" class="subtasksContainer">
      <div class="progressBarContainer">
        <div id="progressBar${taskComponents.id}" class="progressBar progressBarCurrentWith"></div>  
      </div>
      <span id="subtaskInfo${taskComponents.id}" class="subtaskInfo">${isChecked}/${subtaskData.length} Subtasks</span>
    </div>
  `
    : "";
}

/**
 * Generates the HTML markup for a single task on the board.
 * @param {Object} taskComponents - The core task data including title, description, etc.
 * @param {string} serializedSubtasks - JSON stringified subtasks
 * @param {string} serializedContacts - JSON stringified contacts
 * @param {Array<string>} initials - Array of contact initials
 * @param {string} progressBarHTML - HTML for the subtask progress bar
 * @returns {string} - HTML string representing the task
 */
function getFilledTaskHTML(
  taskComponents,
  serializedSubtasks,
  serializedContacts,
  initials,
  progressBarHTML
) {
  let compInitials = initials.slice(0, 3);
  let initial = compInitials.map(
    (init) =>
      `<span id="assignedUser${
        init + taskComponents.id
      }" class="assignedUser">${init}</span>`
  );
  let shortenedTitle = shortenText(taskComponents.title, 40);
  let shortenedDescription = shortenText(taskComponents.description, 25);
  return `
    <div data-id="${taskComponents.id}" id="${taskComponents.id}"
     onclick="openFilledTaskModal('${taskComponents.id}', '${taskComponents.category}', '${taskComponents.title}', '${taskComponents.description}', '${taskComponents.date}', '${taskComponents.prio}', '${taskComponents.column}', '${serializedSubtasks}', '${serializedContacts}'), openMobileTaskOverlay('${taskComponents.id}')" class="filledTask marginBottom" draggable="true" ondragstart="dragstartHandler(event)" ondragend="dragendHandler(event)">
      <h3 class="taskCategory userStory">${taskComponents.category}</h3>
      <h4 class="taskTitle">${shortenedTitle}</h4>
      <p class="taskDescription">${shortenedDescription}</p>
      ${progressBarHTML}
      <div id="assignedToContainer${taskComponents.id}" class="assignedToContainer assignedGap">
        <div class="assignedUserContainer">
          ${initial}
          <span id="assignedCounter${taskComponents.id}" class="assignedCounter dNone"></span>
        </div>
        <img src="./assets/img/prio${taskComponents.capitalizedPrio}.svg" alt="" class="taskPrio">
      </div>
    </div>
  `;
}

function countInitials(contacts, taskId) {
  let assignedCounter = document.getElementById("assignedCounter" + taskId);
  let countHigherThree = contacts.length - 3;
  assignedCounter.classList.remove("dNone");
  assignedCounter.innerHTML = "+" + countHigherThree;
}

/**
 * Initializes the progress bar for all tasks based on their completed subtasks.
 * @param {Object} tasksData - Object containing all tasks keyed by their ID
 */
function initProgressBar(tasksData) {
  Object.entries(tasksData).forEach(([taskId, tasksData]) => {
    let subtask = tasksData.subtask || [];
    let isChecked = subtask.filter((st) => st.done === true).length;
    let checkboxTotal = subtask.length;
    showProgressBar(isChecked, checkboxTotal, taskId);
  });
}

/**
 * Shortens text to a maximum length, appending "..." if necessary.
 * @param {string} text - The original text
 * @param {number} maxLen - Maximum allowed length
 * @returns {string} - Shortened text
 */
function shortenText(text, maxLen) {
  return text?.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

/**
 * Handles the "Add Task" button depending on screen size.
 * On mobile, navigates to a new page; on desktop, opens a modal.
 */
function handleAddTask() {
  if (window.innerWidth <= 1170) {
    window.location.href = "add_task.html";
  } else {
    openAddTaskModal();
  }
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

/**
 * Checks the current visibility state of the add task modal.
 * If the modal is visible (not hidden), it triggers the add task handler.
 */
function checkWindowSize() {
  const modal = document.getElementById("addTaskModal");
  if (modal && modal.classList.contains("dNone")) {
    renderTasks();
    return;
  }
  handleAddTask();
}

function closeTaskOverlay() {
  let mobileTaskOverlay = document.getElementById("moveToOverlayWrapper");
  mobileTaskOverlay.classList.add("displayNone");
}

function returnToBoard() {
  closeTaskOverlay();
  closeModal();
}

async function openMobileTaskOverlay(taskId) {
  let task = await getData(`/users/${loggedInUser}/tasks/${taskId}`);
  let column = document.querySelectorAll(".taskContainer");
  column.forEach((container) => {
    container.addEventListener("click", () => {
      let column = container.dataset.name;
      changeColumn(column, taskId);
    });
  });
}
