function initBoard() {
  includeHTML();
  renderTasks();
}

async function renderTasks() {
  let tasks = await getData("/tasks");
  let taskListContainer = document.getElementById("toDo");

  if (tasks) {
    for (let taskKey in tasks) {
      let task = tasks[taskKey];
      let taskId = task.id;
      console.log(taskId);
      taskListContainer.innerHTML += generateFilledTaskHTML(task, taskId);
    }


  } else {
    taskListContainer.innerHTML = `
      <div class="blankTask marginBottom">
        <span>No tasks To do</span>
      </div>
    `
  }
}

function generateFilledTaskHTML(task, taskId) {
  const capitalizedPrio = task.prio.charAt(0).toUpperCase() + task.prio.slice(1).toLowerCase();

  let taskComponents = {
    category: task.category,
    title: task.title,
    description: task.description,
    date: task.date,
    prio: task.prio,
    subtask: task.subtask,
    id: task.id
  }


  // capitalizedPrio: capitalizedPrio 
  //const subtask = taskComponents.subtask.filter(Boolean).map(subtask => `<span class="subtaskInfo">${subtask || ""}</span>`).join("");
  return filledTaskTemplate(taskComponents);
}

function filledTaskTemplate(taskComponents) {

  return `
    <div id="${taskComponents.id}" onclick="openFilledTaskModal('${taskComponents.id}', '${taskComponents.category}', '${taskComponents.title}', '${taskComponents.description}', '${taskComponents.date}', '${taskComponents.prio}', '${taskComponents.subtask}')" class="filledTask marginBottom" draggable="true" ondragstart="dragstartHandler(event)">
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
        <img src="/assets/img/prio.svg" alt="" class="taskPrio">
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