async function initBoard() {
  includeHTML();
  await getLoggedInUser(); 
  await renderTasks();
}

async function renderTasks() {
  let tasks = await getData('/users/' + loggedInUser + '/tasks'); 
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];

  columns.forEach(id => document.getElementById(id).innerHTML = "");
  let taskArr = Object.values(tasks || {});

  if (taskArr) {
    taskArr.forEach(task => {
      const targetId = task.column;
      const target = document.getElementById(targetId);
      target.innerHTML += generateFilledTaskHTML(task);
    })
  }
  columns.forEach(id => {
    const column = document.getElementById(id);
    if (!column.innerHTML.trim()) {
      column.innerHTML = blankTask(id);
    }
  })
}

function generateFilledTaskHTML(task) {
  const capitalizedPrio = task.prio.charAt(0).toUpperCase() + task.prio.slice(1).toLowerCase();
  let taskComponents = {
    category: task.category,
    title: task.title,
    description: task.description,
    date: task.date,
    prio: task.prio,
    subtask: task.subtaskObj.subtask,
    id: task.id,
    capitalizedPrio: capitalizedPrio,
    contact: task.contact
  }
  return filledTaskTemplate(taskComponents);
}

function filledTaskTemplate(taskComponents) {
  let subtaskData = taskComponents.subtask ? taskComponents.subtask : [];
  let contactData = taskComponents.contact ? taskComponents.contact : [];
  let serializedSubtasks = encodeURIComponent(JSON.stringify(subtaskData));
  let serializedContacts = encodeURIComponent(JSON.stringify(contactData));
  let initial = convertNameToInitial(contactData);
  
  return `
    <div id="${taskComponents.id}" onclick="openFilledTaskModal('${taskComponents.id}', '${taskComponents.category}', '${taskComponents.title}', '${taskComponents.description}', '${taskComponents.date}', '${taskComponents.prio}', '${serializedSubtasks}', '${serializedContacts}')" class="filledTask marginBottom" draggable="true" ondragstart="dragstartHandler(event)">
      <h3 class="taskCategory userStory">${taskComponents.category}</h3>
      <h4 class="taskTitle">${taskComponents.title}</h4>
      <p class="taskDescription">${taskComponents.description}</p>
      <div class="subtasksContainer">
        <div class="progressBarContainer">
          <div id="progressBar" class="progressBar"></div>  
        </div>
        <span class="subtaskInfo"></span>
      </div>
      <div class="assignedToContainer">
        <div class="assignedUsers">
          <span id="assignedUser" class="assignedUser">${initial}</span>
        </div>
        <img src="/assets/img/prio${taskComponents.capitalizedPrio}.svg" alt="" class="taskPrio">
      </div>
    </div>
  `
}

function blankTask(columnName) {
  return `
    <div class="blankTask marginBottom">
      <span>No tasks ${columnName.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
    </div>
  `
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
      let updatedTasks = await getData(`/users/${loggedInUser}/tasks`);
      renderTasks(updatedTasks);
    }
  }
}

async function filterTasks() {
  let tasks = await getData(`/users/${loggedInUser}/tasks`);
  let input = document.getElementById("taskInputfield").value.toLowerCase();
  let tasksArr = Object.values(tasks || {});

  if (!input.trim()) {
    renderTasks();
    return;
  }
  let result = tasksArr.filter(task =>
    task.title.toLowerCase().includes(input)
  );
  renderFilteredTasks(result);
}

async function renderFilteredTasks(filtered) {
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];
  columns.forEach(id => document.getElementById(id).innerHTML = "");

  if (filtered.length === 0) {
    columns.forEach(id => document.getElementById(id).innerHTML = blankTask(id));
    return;
  }

  for (const task of filtered) {
    let taskData = await getData(`/users/${loggedInUser}/tasks/${task.id}`);
    const targetId = task.column;
    const target = document.getElementById(targetId);
    target.innerHTML += generateFilledTaskHTML(taskData);
  }

  columns.forEach(id => {
    const column = document.getElementById(id);
    if (!column.innerHTML.trim()) {
      column.innerHTML = blankTask(id);
    }
  })
}

async function handleTaskInput() {
  const input = document.getElementById("taskInputfield").value.trim();

  if (!input.length) {
    renderTasks();
    return;
  }
}

function convertNameToInitial(contactData) {
  return contactData.map(name =>
    name
    .split(" ")
    .map(n => n.charAt(0).toUpperCase())
    .join("")
  ) 
}

function handleCheckbox() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percent = (checkedCount/total) * 100;
  updateProgressbar(percent); 
}

function updateProgressbar(percent) {
  let progressbar = document.getElementById("progressBar");
  progressbar.style.width = percent + "%";
}
