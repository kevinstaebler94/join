// let users = {
//     'name' : 'Testname',
//     'password' : '1234',
//     'email' : 'Testname@dev.com'
// };
// let tasks = {};
// let contacts = {};

const BASE_URL = 'https://join-439-default-rtdb.europe-west1.firebasedatabase.app/'; // main URL
// const BASE_URL = 'https://join-contacts-fcc04-default-rtdb.europe-west1.firebasedatabase.app' // URL Oli
// const BASE_URL = 'https://test-project-9b5dc-default-rtdb.europe-west1.firebasedatabase.app/'; // URL Kevin

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
        greeting: {greeting: true}
    });
    putData(path, userData, userId);
}

async function changeElement(greeting) {
    let path = '/users/' + loggedInUser;
    let userId = 'greeting';
    let userData = ({
        greeting: greeting
    });
    await putData(path, userData, userId);
}

async function changeUsers(userId, greeting, email, password, name, login, tasks, contacts) {
    let path = '/users';
    let userData = ({
        name: name,
        email: email,
        password: password,
        login: login,
        greeting: {greeting: greeting},
        tasks: tasks,
        contacts: contacts
    });
    await putData(path, userData, userId);
}

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

async function pushSubtasks(loggedInUser, taskId, done, currentSubtask, subtaskId) {
    let path = '/users/' + loggedInUser + '/tasks/' + taskId + '/subtask';
    let userData = ({
        done: done,
        subtask: currentSubtask
    });
    await putData(path, userData, subtaskId);
}

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

function changeTasks(taskId, column, category) {
    let path = '/users/' + loggedInUser + '/tasks';
    let title = document.getElementById('titleInputEdit');
    let description = document.getElementById('taskDescriptionEdit');
    let date = document.getElementById('dateInputEdit');
    let contacts = assignedArr;
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

async function pushContacts(loggedInUser) {
    let isValid = await validateContactInput();
    if (!isValid) return;

    let emailValid = await validateAddEmailFormat();
    if (!emailValid) return false;

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
        console.log("saved:", userData);
        clearInputFields();
        closeContactsModal();
        window.location.reload();
    } catch (error) {
        console.error("error while saving:", error);
    }

    clearInputFields();
    await renderContacts();
    currentContactId = adjustEmail(contactEmail.value);
    await openContactById(currentContactId);
    showSuccessOverlayImg();
}

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

async function deleteTask(loggedInUser, taskId) {
    let path = '/users/' + loggedInUser + '/tasks/' + taskId;
    deleteData(path);
    closeModal();
}

async function deleteContact(contactId) {
    let path = '/users/' + loggedInUser + '/contacts/' + contactId;
    await deleteData(path);
}

function adjustEmail(email) {
    return email.replace(/\./g, "_").replace(/@/g, "-at-");
}

function getTimeStamp() {
    const d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());
    let time = "-" + h + ":" + m + ":" + s;
    return time;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}