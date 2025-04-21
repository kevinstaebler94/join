// let users = {
//     'name' : 'Testname',
//     'password' : '1234',
//     'email' : 'Testname@dev.com'
// };
// let tasks = {};
// let contacts = {};

// const BASE_URL = 'https://join-439-default-rtdb.europe-west1.firebasedatabase.app/'; // main URL
// const BASE_URL = 'https://join-contacts-fcc04-default-rtdb.europe-west1.firebasedatabase.app' // URL Oli
const BASE_URL = 'https://test-project-9b5dc-default-rtdb.europe-west1.firebasedatabase.app/'; // URL Kevin

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
        login: false
    });
    putData(path, userData, userId);
}

async function changeUsers(userId, email, password, name, login, tasks) {
    let path = '/users';
    let userData = ({
        name: name,
        email: email,
        password: password,
        login: login,
        tasks: tasks
    });
    await putData(path, userData, userId);
}

function pushTasks(loggedInUser, contacts) {
    console.log(loggedInUser);

    let path = '/users/' + loggedInUser + '/tasks';
    let title = document.getElementById('titleInput');
    let description = document.getElementById('taskDescription');
    let date = document.getElementById('dateInput');
    let category = document.getElementById('selectedCategory');
    let subTask = subtasksArr;
    let time = getTimeStamp();
    let taskId = title.value + time;
    let userData = ({
        id: taskId,
        title: title.value,
        description: description.value,
        date: date.value,
        prio: prioBtn,
        contact: contacts,
        category: category.innerHTML,
        subtask: subTask,
        column: "toDo",
    });
    putData(path, userData, taskId);
}

async function pushGuestTasks(taskObj, guestUser) {
    let path = '/users/' + guestUser + '/tasks';
    let userData = ({
        id: taskObj.id,
        title: taskObj.title,
        description: taskObj.description,
        date: taskObj.date,
        prio: taskObj.prio,
        contact: taskObj.contact,
        subtask: taskObj.subtask,
        column: taskObj.column
    });
    await putData(path, userData, userData.id);
}

function changeTasks(taskId) {
    let path = '/users/' + loggedInUser + '/tasks';
    let title = document.getElementById('titleInputEdit');
    let description = document.getElementById('taskDescriptionEdit');
    let date = document.getElementById('dateInputEdit');
    let subTask = subtasksArr;
    let time = getTimeStamp();
    let newTaskId = title.value + time;
    let userData = ({
        id: newTaskId,
        title: title.value,
        description: description.value,
        date: date.value,
        prio: prioBtn,
        contact: contacts,
        subtask: subTask
    });
    putData(path, userData, newTaskId);
    deleteTask(taskId);
    closeModal();
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
    } catch (error) {
        console.error("error while saving:", error);
    }

    clearInputFields();
    await renderContacts();
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
    let path = `/contacts/${contactId}`;
    deleteData(path);
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