function initBoard() {
  includeHTML();
  renderTasks();
}

async function renderTasks() {
  let taskList = await getData("/tasks");
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];

  columns.forEach(id => document.getElementById(id).innerHTML = "");
  let taskArr = Object.values(taskList || {});

  if(taskArr) {
    taskArr.forEach(task => {
      const targetId = task.column;
      // const targetId = 'toDo';
      const target = document.getElementById(targetId);
      target.innerHTML += generateFilledTaskHTML(task);
    })
  }
  columns.forEach(id => {
    const column = document.getElementById(id);
    if(!column.innerHTML.trim()) {
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
    subtask: task.subtask,
    id: task.id,
    capitalizedPrio: capitalizedPrio
  }
  return filledTaskTemplate(taskComponents);
}

function filledTaskTemplate(taskComponents) {
  let serializedSubtasks = encodeURIComponent(JSON.stringify(taskComponents.subtask));
  console.log(typeof serializedSubtasks);
  
  return `
    <div id="${taskComponents.id}" onclick="openFilledTaskModal('${taskComponents.id}', '${taskComponents.category}', '${taskComponents.title}', '${taskComponents.description}', '${taskComponents.date}', '${taskComponents.prio}', '${serializedSubtasks}')" class="filledTask marginBottom" draggable="true" ondragstart="dragstartHandler(event)">
      <h3 class="taskCategory userStory">${taskComponents.category}</h3>
      <h4 class="taskTitle">${taskComponents.title}</h4>
      <p class="taskDescription">${taskComponents.description}</p>
      <div class="subtasksContainer">
        <div class="progressBarContainer">
          <div class="progressBar halfFilled"></div>  
        </div>
        <span class="subtaskInfo"></span>
      </div>
      <div class="assignedToContainer">
        <div class="assignedUsers">
          <span id="assignedUser" class="assignedUser">KS</span>
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
    let task = await getData(`/tasks/${taskId}`);

    if(task) {
      task.column = newColumn;
      await putData("/tasks", task, task.id);
      await renderTasks();
    }
  }
}

async function filterTasks() {
  let tasks = await getData("/tasks");
  let input = document.getElementById("taskInputfield").value.toLowerCase();
  let tasksArr = Object.values(tasks || {});
  let result = tasksArr.filter(task => 
    task.title.toLowerCase().includes(input)
  );
  renderFilteredTasks(result);
}

async function renderFilteredTasks(filtered) {
  const columns = ["toDo", "inProgress", "awaitFeedback", "done"];
  columns.forEach(id => document.getElementById(id).innerHTML = "");

  if(filtered.length === 0) {
    columns.forEach(id => document.getElementById(id).innerHTML = blankTask(id));
    return;
  }
  
  for (const task of filtered) {
    let taskData = await getData(`/tasks/${task.id}`);
    const targetId = task.column;
    const target = document.getElementById(targetId);
    target.innerHTML += generateFilledTaskHTML(taskData)
    columns.forEach(id => {
      const column = document.getElementById(id);
      if(!column.innerHTML.trim()) {
        column.innerHTML = blankTask(id);
      }
    })
  }
}