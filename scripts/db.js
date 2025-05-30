const BASE_URL = 'https://join-439-default-rtdb.europe-west1.firebasedatabase.app/'; // main URL
// const BASE_URL = 'https://join-contacts-fcc04-default-rtdb.europe-west1.firebasedatabase.app' // URL Oli
// const BASE_URL = 'https://test-project-9b5dc-default-rtdb.europe-west1.firebasedatabase.app/'; // URL Kevin

/**
 * Fetches data from Firebase Realtime Database at a given path.
 * @param {string} path - The relative path in the database.
 * @returns {Promise<Object|undefined>} - Returns fetched data or undefined on error.
 */
async function getData(path = '') {
    try {
        let response = await fetch(BASE_URL + path + '.json');
        if (!response.ok)
            throw new Error(`problem while fetching, ${response.status}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.warn(error.message);
    }
}

/**
 * Uploads (puts) data to Firebase Realtime Database at the specified path and userId.
 * @param {string} path - The relative path in the database.
 * @param {Object} users - Data object to upload.
 * @param {string} userId - Identifier for the data node.
 * @returns {Promise<Object>} - Returns response data.
 */
async function putData(path = '', users, userId) {
    let response = await fetch(`${BASE_URL}${path}/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(users),
    });
    let data = await response.json();
    return data;
}

/**
 * Deletes data at the specified path from Firebase Realtime Database.
 * @param {string} path - The relative path to delete.
 * @returns {Promise<Object>} - Returns response data.
 */
async function deleteData(path = '') {
    let response = await fetch(`${BASE_URL}${path}.json`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(),
    });
    let data = await response.json();
    window.location.reload();
    return data;
}

/**
 * Gathers user input and pushes new user data to the database.
 */
function pushUsers() {
    let path = '/users';
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let userId = adjustEmail(email.value);
    let userData = ({
        name: name.value,
        email: email.value.trim(),
        password: password.value.trim(),
        login: false,
        greeting: { greeting: true }
    });
    putData(path, userData, userId);
}

/**
 * Updates a user's greeting element in the database.
 * @param {Object} greeting - Greeting object to update.
 */
async function changeElement(greeting) {
    let path = '/users/' + loggedInUser;
    let userId = 'greeting';
    let userData = ({
        greeting: greeting
    });
    await putData(path, userData, userId);
}

async function changeColumn(column, taskId) {
    let path = '/users/' + loggedInUser;
    let userId = 'tasks/' + taskId + '/column';
    let userData = column;
    await putData(path, userData, userId);
    // window.location.reload();
    await renderTasks();
    returnToBoard();
}

async function changeContact(taskId, contactName) {
    let path = '/users/' + loggedInUser;
    let userId = '/tasks/' + taskId + '/contact/';
    let userData = contactName;
    await putData(path, userData, userId);
}

/**
 * Updates a user's full data including tasks and contacts.
 * @param {string} userId - User identifier.
 * @param {boolean} greeting - Greeting status.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @param {string} name - User name.
 * @param {boolean} login - Login status.
 * @param {Object} tasks - User tasks object.
 * @param {Object} contacts - User contacts object.
 */
async function changeUsers(userId, greeting, email, password, name, login, tasks, contacts) {
    let path = '/users';
    let userData = ({
        name: name,
        email: email,
        password: password,
        login: login,
        greeting: { greeting: greeting },
        tasks: tasks,
        contacts: contacts
    });
    await putData(path, userData, userId);
}

/**
 * Pushes a new task for the logged in user.
 * @param {string} loggedInUser - Current user ID.
 * @param {Array} contacts - Array of assigned contacts.
 */
function pushTasks(loggedInUser, contacts) {
    let path = '/users/' + loggedInUser + '/tasks';
    let title = document.getElementById('titleInput');
    let description = document.getElementById('taskDescription');
    let date = document.getElementById('dateInput');
    let category = document.getElementById('selectedCategory');
    let time = getTimeStamp();
    let taskId = title.value + time;
    let subtasks = subtasksArr;
    let userData = ({
        id: taskId,
        title: title.value,
        description: description.value,
        date: date.value,
        prio: prioBtn,
        contact: contacts,
        category: category.innerHTML,
        column: "toDo",
        subtask: subtasks
    });
    putData(path, userData, taskId);
}

/**
 * Pushes or updates a subtask for a specific task of a user.
 * @param {string} loggedInUser - Current user ID.
 * @param {string} taskId - Task identifier.
 * @param {boolean} done - Completion status of the subtask.
 * @param {string} currentSubtask - Subtask description.
 * @param {string} subtaskId - Identifier for the subtask.
 */
async function pushSubtasks(loggedInUser, taskId, done, currentSubtask, subtaskId) {
    let path = '/users/' + loggedInUser + '/tasks/' + taskId + '/subtask';
    let userData = ({
        done: done,
        subtask: currentSubtask
    });
    await putData(path, userData, subtaskId);
}

/**
 * Pushes a guest user's task to the database.
 * @param {Object} taskObj - Task object to push.
 * @param {string} guestUser - Guest user identifier.
 */
async function pushGuestTasks(taskObj, guestUser) {
    let path = '/users/' + guestUser + '/tasks';
    let userData = ({
        category: taskObj.category,
        id: taskObj.id,
        title: taskObj.title,
        description: taskObj.description,
        date: taskObj.date,
        prio: taskObj.prio,
        contact: taskObj.contact,
        column: taskObj.column,
        subtask: taskObj.subtask
    });
    await putData(path, userData, userData.id);
}

/**
 * Updates a task's details and deletes the old task.
 * @param {string} taskId - Original task ID.
 * @param {string} column - Task column (e.g. toDo, doing, done).
 * @param {string} category - Task category.
 */
function changeTasks(taskId, column, category) {
    let path = '/users/' + loggedInUser + '/tasks';
    let title = document.getElementById('titleInputEdit');
    let description = document.getElementById('taskDescriptionEdit');
    let date = document.getElementById('dateInputEdit');
    // let contacts = assignedArr;
    let contacts = assignedArr.length > 0 ? assignedArr : [null]; // oder null, oder ein Platzhalter
    let subTask = subtasksArr[0];
    let time = getTimeStamp();
    let newTaskId = title.value + time;
    let userData = ({
        id: newTaskId,
        title: title.value,
        description: description.value,
        date: date.value,
        prio: prioBtn,
        contact: contacts,
        subtask: subTask,
        column: column,
        category: category
    });

    putData(path, userData, newTaskId);
    deleteTask(loggedInUser, taskId);
}

/**
 * Validates and pushes a new contact for the logged in user.
 * @param {string} loggedInUser - Current user ID.
 * @returns {Promise<void|boolean>} - Returns false if email validation fails, otherwise void.
 */
async function pushContacts(loggedInUser) {
    let isValid = await validateContactInput();
    if (!isValid) return;

    let emailValid = await validateAddEmailFormat();
    if (!emailValid) return false;

    let phoneValid = await validatePhoneNumberFormat();
    if (!phoneValid) return false;

    let path = '/users/' + loggedInUser + '/contacts';
    let contactName = document.getElementById('contactName');
    let contactEmail = document.getElementById('contactEmail');
    let contactPhone = document.getElementById('contactPhone');
    let contactId = adjustEmail(contactEmail.value);
    let userData = ({
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value
    });
    try {
        await putData(path, userData, contactId);
        clearInputFields();
        closeContactsModal();
        await renderContacts();
        currentContactId = contactId;
        await openContactById(currentContactId);
        showSuccessOverlayImg();
    } catch (error) {
        console.error("error while saving:", error);
    }
}

/**
 * Pushes guest user contacts to the database.
 * @param {Object} contactObj - Contact object.
 * @param {string} guestUser - Guest user ID.
 */
async function pushGuestContacts(contactObj, guestUser) {
    let path = '/users/' + guestUser + '/contacts';
    let contactId = adjustEmail(contactObj.email);
    let userData = ({
        name: contactObj.name,
        email: contactObj.email,
        phone: contactObj.phone
    });
    await putData(path, userData, contactId);
}

/**
 * Deletes a task for the logged in user.
 * @param {string} loggedInUser - Current user ID.
 * @param {string} taskId - Task identifier.
 */
async function deleteTask(loggedInUser, taskId) {
    let path = '/users/' + loggedInUser + '/tasks/' + taskId;
    deleteData(path);
    closeModal();
}

/**
 * Deletes a contact for the logged in user.
 * @param {string} contactId - Contact identifier.
 */
async function deleteContact(contactId, contactName) {
    let tasks = await getData("/users/" + loggedInUser + "/tasks");
    let path = '/users/' + loggedInUser + '/contacts/' + contactId;
    let taskArrDatabase = [];
    for (let key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            let task = tasks[key];
            if (Array.isArray(task.contact) && task.contact.includes(contactName)) {
                task.contact = task.contact.filter(id => id !== contactName);
                changeContact(task.id, task.contact);
            }
        }

    }
    await deleteData(path);
}

function checkTaskContact(contactId) {
    let taskContact = contactId;
    console.log(taskContact);

}

async function deleteUser() {
    let path = '/users/' + loggedInUser;
    await deleteData(path);
}

/**
 * Adjusts email string for use as Firebase key by replacing '.' with '_' and '@' with '-at-'.
 * @param {string} email - Original email string.
 * @returns {string} - Adjusted email string.
 */
function adjustEmail(email) {
    return email.replace(/\./g, "_").replace(/@/g, "-at-");
}

/**
 * Generates a timestamp string in format "-HH:MM:SS".
 * @returns {string} - Timestamp string.
 */
function getTimeStamp() {
    const d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());
    let time = "-" + h + ":" + m + ":" + s;
    return time;
}

/**
 * Adds a leading zero to numbers less than 10.
 * @param {number} i - Number to format.
 * @returns {string} - Formatted number as string.
 */
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}