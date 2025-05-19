async function initBoard() {
  await includeHTML();
  await getLoggedInUser();
  await renderTasks();
}

window.addEventListener("resize", () => {
  renderTasks();
});

function getColumnId(column) {
  return window.innerWidth <= 1023 ? column + "Mobile" : column;
}

async function renderTasks() {
  let tasks = await getData("/users/" + loggedInUser + "/tasks");
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];

  columns.forEach(
    (id) => (document.getElementById(getColumnId(id)).innerHTML = "")
  );
  let taskArr = Object.values(tasks || {});

  taskArr.forEach(task => {

    const targetId = getColumnId(task.column);
    const target = document.getElementById(targetId);
    if (!target) return
    let taskComponents = getTaskComponents(task);
    target.innerHTML += filledTaskTemplate(taskComponents, task);
  });

  columns.forEach((id) => {
    const column = document.getElementById(getColumnId(id));
    if (!column.innerHTML.trim()) {
      column.innerHTML = blankTask(id);
    }
  });
  await initProgressBar(tasks);
}

function getTaskComponents(task) {
  const capitalizedPrio =
    task.prio.charAt(0).toUpperCase() + task.prio.slice(1).toLowerCase();

  return taskComponents = {
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
  };
}

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

function blankTask(columnName) {
  return `
    <div class="blankTask marginBottom">
      <span>No tasks ${columnName.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
    </div>
  `;
}

function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("column", ev.target.closest(".dropZone").id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

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
      // let updatedTasks = await getData(`/users/${loggedInUser}/tasks`);
      renderTasks();
    }
  }
}

async function filterTasks() {
  let tasks = await getData(`/users/${loggedInUser}/tasks`);
  let input = document.getElementById('taskInputfield').value.toLowerCase();
  let tasksArr = Object.values(tasks || {});

  if (!input.trim()) {
    renderTasks();
    return;
  }
  let result = tasksArr.filter((task) =>
    task.title.toLowerCase().includes(input)
  );
  renderFilteredTasks(result);
}

async function renderFilteredTasks(filtered) {
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];
  columns.forEach((id) => (document.getElementById(id).innerHTML = ""));

  if (filtered.length === 0) {
    columns.forEach(
      (id) => (document.getElementById(id).innerHTML = blankTask(id))
    );
    return;
  }

  for (const task of filtered) {
    let taskData = await getData(`/users/${loggedInUser}/tasks/${task.id}`);

    let capitalizedPrio = taskData.prio.charAt(0).toUpperCase() + taskData.prio.slice(1);
    taskData.capitalizedPrio = capitalizedPrio;
    console.log(taskData);

    const targetId = task.column;
    const target = document.getElementById(targetId);
    target.innerHTML += filledTaskTemplate(taskData);
  }

  columns.forEach((id) => {
    const column = document.getElementById(id);
    if (!column.innerHTML.trim()) {
      column.innerHTML = blankTask(id);
    }
  });
}

async function handleTaskInput() {
  const input = document.getElementById('taskInputfield').value.trim();

  if (!input.length) {
    renderTasks();
    return;
  }
  await filterTasks();
}

function convertNameToInitial(contactData) {
  return contactData.map((name) =>
    name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
  );
}

async function handleCheckbox(checkbox) {
  let list = document.querySelectorAll(
    '.assignedToModal input[type="checkbox"]'
  );
  let label = checkbox.closest("label");
  let currentSubtask = label?.querySelector("p")?.textContent.trim();
  let taskId = checkbox.dataset.taskId;
  // let currentSubtask = checkbox.nextElementSibling?.textContent.trim();
  let done = checkbox.checked;
  let subtaskId = checkbox.dataset.subtaskId;
  let checkboxArr = Array.from(list);
  let checkboxTotal = checkboxArr.length;
  let isChecked = checkboxArr.filter((cb) => cb.checked === true).length;
  await pushSubtasks(loggedInUser, taskId, done, currentSubtask, subtaskId);
  await renderTasks();
  showProgressBar(isChecked, checkboxTotal, taskId);
}

async function showProgressBar(isChecked, checkboxTotal, taskId) {
  let progressBar = document.getElementById(`progressBar${taskId}`);
  if (progressBar) {
    let progress = (isChecked / checkboxTotal) * 100;
    setTimeout(() => {
      progressBar.style.width = `${progress}%`;
    }, 10);
  }
}

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

function getFilledTaskHTML(taskComponents, serializedSubtasks, serializedContacts, initials, progressBarHTML) {
  let compInitials = initials.slice(0, 3);
  let initial = compInitials.map((init) => `<span id="assignedUser" class="assignedUser">${init}</span>`);
  let shortenedTitle = shortenText(taskComponents.title, 40);
  let shortenedDescription = shortenText(taskComponents.description, 25);

  return `
    <div id="${taskComponents.id}" onclick="openFilledTaskModal('${taskComponents.id}', '${taskComponents.category}', '${taskComponents.title}', '${taskComponents.description}', '${taskComponents.date}', '${taskComponents.prio}', '${taskComponents.column}', '${serializedSubtasks}', '${serializedContacts}')" class="filledTask marginBottom" draggable="true" ondragstart="dragstartHandler(event)">
      <h3 class="taskCategory userStory">${taskComponents.category}</h3>
      <h4 class="taskTitle">${shortenedTitle}</h4>
      <p class="taskDescription">${shortenedDescription}</p>
      ${progressBarHTML}
      <div class="assignedToContainer">
        <div class="
        ">
          ${initial}
        </div>
        <img src="/assets/img/prio${taskComponents.capitalizedPrio}.svg" alt="" class="taskPrio">
      </div>
    </div>
  `;
}

async function initProgressBar(tasksData) {
  Object.entries(tasksData).forEach(([taskId, tasksData]) => {
    let subtask = tasksData.subtask || [];
    let isChecked = subtask.filter((st) => st.done === true).length;
    let checkboxTotal = subtask.length;
    showProgressBar(isChecked, checkboxTotal, taskId);
  });
}

function shortenText(text, maxLen) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

function handleAddTask() {
  if (window.innerWidth <= 1023) {
    // Weiterleitung zur Seite bei kleinerem Display
    window.location.href = 'add_task.html'; // Pfad ggf. anpassen
  } else {
    // Modal öffnen bei größeren Displays
    openAddTaskModal();
  }
}

