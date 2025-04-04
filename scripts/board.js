function initBoard() {
  includeHTML();
  renderTasks();
}

async function renderTasks() {
  let tasks = await getData("/tasks");
  let taskListContainer = document.getElementById("toDo");
  
  if(tasks) {
    let taskContent = "";

    for (let taskKey in tasks) {
      let task = tasks[taskKey];
      taskContent += filledTaskTemplate(task);
    }
    taskListContainer.innerHTML = taskContent;

  } else {
    taskListContainer.innerHTML = `
      <div class="blankTask marginBottom">
        <span>No tasks To do</span>
      </div>
    `
  }
}

function filledTaskTemplate(task) {
  return `
    <div onclick="openFilledTaskModal()" class="filledTask marginBottom">
      <h3 class="taskCategory userStory">${task.category}</h3>
      <h4 class="taskTitle">${task.title}</h4>
      <p class="taskDescription">${task.description}</p>
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
        <img src="/assets/img/prioMedium.svg" alt="" class="taskPrioMedium">
      </div>
    </div>
  `
}