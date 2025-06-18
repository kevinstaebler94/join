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
      `<span id="assignedUser${init + taskComponents.id
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

async function openMobileTaskOverlay(taskId) {
  let boardContentWrapperMobile = document.getElementById('boardContentWrapperMobile');
  let containerWrapper = document.getElementById('containerWrapper');
  boardContentWrapperMobile.classList.remove('dNone');
  containerWrapper.innerHTML = `<div class="subContainer">
                  <div onclick="changeColumn('toDo', '${taskId}')" id="toDoOverlay" data-name="toDo" class="taskContainer">
                    To do
                  </div>
                  <div onclick="changeColumn('inProgress', '${taskId}')" id="inProgressOverlay" data-name="inProgress" class="taskContainer">
                    In progress
                  </div>
                </div>
                <div class="subContainer">
                  <div onclick="changeColumn('awaitFeedback', '${taskId}')" id="awaitFeedbackOverlay" data-name="awaitFeedback" class="taskContainer">
                    Awaitfeedback
                  </div>
                  <div onclick="changeColumn('done', '${taskId}')" id="doneOverlay" data-name="done" class="taskContainer">
                    Done
                  </div>
                </div>`;
}