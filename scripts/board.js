function initBoard() {
  includeHTML();
  renderTasks();
}

async function renderTasks() {
  let tasks = await getData("/tasks");
  let taskListContainer = document.getElementById("toDo");
  let taskIdCounter = 1;
  
  if(tasks) {
    for (let taskKey in tasks) {
      let task = tasks[taskKey];
      task.taskDivId = taskIdCounter++;
      taskListContainer.innerHTML += generateFilledTaskHTML(task, taskIdCounter);
    }
    
  } else {
    taskListContainer.innerHTML = `
      <div class="blankTask marginBottom">
        <span>No tasks To do</span>
      </div>
    `
  }
}

function generateFilledTaskHTML(task, taskIdCounter) {
  const capitalizedPrio = task.prio.charAt(0).toUpperCase() + task.prio.slice(1).toLowerCase();

  const taskComponents = {
    id: taskIdCounter,
    category: task.category,
    title: task.title,
    description: task.description,
    date: task.date,
    prio: task.prio,
    subtask: task.subtask,
    capitalizedPrio: capitalizedPrio
  };
  return filledTaskTemplate(taskComponents);
}

function filledTaskTemplate(taskData) {
  return `
    <div id="taskId${taskData.id++}" onclick="openFilledTaskModal('${taskData.category}', '${taskData.title}', '${taskData.description}', '${taskData.date}', '${taskData.prio}', '${taskData.subtask}')" class="filledTask marginBottom" draggable="true" ondragstart="dragstartHandler(event)">
      <h3 class="taskCategory userStory">${taskData.category}</h3>
      <h4 class="taskTitle">${taskData.title}</h4>
      <p class="taskDescription">${taskData.description}</p>
      <div class="subtasksContainer">
        <div class="progressBarContainer">
          <div class="progressBar halfFilled"></div>  
        </div>
        <span class="subtaskInfo">1/2 Subtasks</span>
      </div>
      <div class="assignedToContainer">
        <div class="assignedUsers">
          <span class="assignedUser">KS</span>
          <span class="assignedUser">DB</span>
          <span class="assignedUser">OG</span>
        </div>
        <img src="/assets/img/prio${taskData.capitalizedPrio}.svg" alt="" class="taskPrio${taskData.capitalizedPrio}">
      </div>
    </div>
  `
}

function blankTask() {
  return `
    <div class="blankTask marginBottom">
      <span id="blankTask">No tasks To do</span>
    </div>
  `
}

function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dropZone = ev.target.closest(".dropZone"); // sucht die nächstgelegene dropzone, verschachteln einzelner tasks wird dadurch vermieden

  if (dropZone) {
    dropZone.appendChild(document.getElementById(data));
  }
}