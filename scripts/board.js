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

/**
 * Disables drag-and-drop functionality for all draggable elements and drop zones.
 * Removes event listeners and sets `draggable` attributes to false.
 */
function disableDragging() {
  document.querySelectorAll("[draggable]").forEach((el) => {
    el.setAttribute("draggable", false);
    el.removeEventListener("dragstart", dragstartHandler);
  });

  document.querySelectorAll(".dropZone").forEach((zone) => {
    zone.removeEventListener("dragover", dragoverHandler);
    zone.removeEventListener("drop", dropHandler);
  });
}

/**
 * Enables drag-and-drop functionality for all task cards and drop zones.
 * Adds appropriate event listeners and sets `draggable` attributes to true.
 */
function enableDragging() {
  document.querySelectorAll(".taskCard").forEach((el) => {
    el.setAttribute("draggable", true);
    el.addEventListener("dragstart", dragstartHandler);
  });

  document.querySelectorAll(".dropZone").forEach((zone) => {
    zone.addEventListener("dragover", dragoverHandler);
    zone.addEventListener("drop", dropHandler);
  });
}

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
    return column;
  } else {
    document
      .querySelectorAll('[draggable="false"]')
      .forEach((el) => (el.draggable = true));
    return column;
  }
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
  getRenderedTasks(tasks, countArr);
  fillBlankTask(columns);
  initProgressBar(tasks);
}

/**
 * Renders all tasks by inserting them into their respective columns.
 * Calls functions to generate task templates and associated contact visuals.
 *
 * @param {Object} tasks - Object containing task data.
 * @param {Array} countArr - Array used to track displayed contacts per task.
 */
function getRenderedTasks(tasks, countArr) {
  let taskArr = Object.values(tasks || {});
  taskArr.forEach((task) => {
    const targetId = getColumnId(task.column);
    const target = document.getElementById(targetId);
    if (!target) return;
    let taskComponents = getTaskComponents(task);
    target.innerHTML += filledTaskTemplate(taskComponents, task);
    getRenderContacts(task, countArr);
    countArr = [];
  });
}

/**
 * Renders contact initials for each task.
 * Handles logic for styling contacts and showing a counter if there are more than 3.
 *
 * @param {Object} task - The task object containing assigned contacts.
 * @param {Array} countArr - Array to track which contacts are displayed.
 */
function getRenderContacts(task, countArr) {
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
}

/**
 * Inserts a placeholder into empty task columns to indicate no tasks are present.
 *
 * @param {Array<string>} columns - List of column identifiers.
 */
function fillBlankTask(columns) {
  columns.forEach((id) => {
    const column = document.getElementById(getColumnId(id));
    if (!column.innerHTML.trim()) {
      column.innerHTML = blankTask(id);
    }
  });
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
  let progressBarHTML = getProgressBarHTML(taskComponents, subtaskData, isChecked);
  let filledTaskHTML = getFilledTaskHTML(taskComponents, serializedSubtasks, serializedContacts, initials, progressBarHTML);
  return filledTaskHTML;
}

/**
 * Handles the dragstart event by storing task ID and source column.
 * @param {DragEvent} ev
 */
function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("column", ev.target.closest(".dropZone").id);
}

/**
 * Removes the visual highlight from all drop zones after a drag operation ends.
 */
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
  getFilteredTaskTemplate(filtered, columnIds, isMobile);
  columnIds.forEach((id) => {
    const col = document.getElementById(id);
    if (col && !col.innerHTML.trim()) col.innerHTML = blankTask(id);
  });
  initProgressBar(filteredTask);
}

/**
 * Renders filtered tasks into their columns and fills empty columns with placeholders.
 * Also initializes the progress bar based on the filtered tasks.
 *
 * @param {Array<Object>} filtered - Array of filtered task objects.
 * @param {Array<string>} columnIds - IDs of the columns to be updated.
 * @param {boolean} isMobile - Whether to render in mobile view or not.
 */
function getFilteredTaskTemplate(filtered, columnIds, isMobile) {
  getFilteredTaskTemplate(filtered, columnIds, isMobile);
  columnIds.forEach((id) => {
    const col = document.getElementById(id);
    if (col && !col.innerHTML.trim()) col.innerHTML = blankTask(id);
  });
  initProgressBar(filteredTask);
}

/**
 * Internal logic to render each filtered task into the appropriate column.
 * Adds contact styling and handles mobile/desktop rendering.
 *
 * @param {Array<Object>} filtered - Filtered task list.
 * @param {Array<string>} columnIds - List of column IDs.
 * @param {boolean} isMobile - Determines if the layout is mobile-specific.
 */
function getFilteredTaskTemplate(filtered, columnIds, isMobile) {
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
 * Updates subtask checkbox state and re-renders the board.
 * @param {HTMLInputElement} checkbox
 */
async function handleCheckbox(checkbox) {
  let subtaskInfo = document.getElementById("subtaskInfo" + checkbox.dataset.taskId);
  let list = document.querySelectorAll('.assignedToModal input[type="checkbox"]');
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
 * Displays a counter when more than three contacts are assigned to a task.
 * Shows "+X" where X is the number of hidden contacts.
 *
 * @param {Array<string>} contacts - List of contact names assigned to a task.
 * @param {string} taskId - ID of the task to which the contacts belong.
 */
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
  if (!tasksData) return;
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

/**
 * Closes the mobile task overlay by hiding the move-to wrapper.
 */
function closeTaskOverlay() {
  let mobileTaskOverlay = document.getElementById("moveToOverlayWrapper");
  mobileTaskOverlay.classList.add("displayNone");
}

/**
 * Closes both the mobile task overlay and any open modal.
 */
function returnToBoard() {
  closeTaskOverlay();
  closeModal();
}

/**
 * Opens the mobile task overlay and adds event listeners to columns
 * to handle task status changes when clicked.
 *
 * @param {string} taskId - The ID of the task being moved.
 */
async function openMobileTaskOverlay(taskId) {
  let columns = document.querySelectorAll(".taskContainer");
  let boardContentWrapperMobile = document.getElementById(
    "boardContentWrapperMobile"
  );
  boardContentWrapperMobile.classList.remove("dNone");
  columns.forEach((container) => {
    container.addEventListener("click", function () {
      let column = container.dataset.name;
      changeColumn(column, taskId);
    });
  });
}
