// let users = {
//     'name' : 'Testname',
//     'password' : '1234',
//     'email' : 'Testname@dev.com'
// };
// let tasks = {};
// let contacts = {};

//const BASE_URL = 'https://join-439-default-rtdb.europe-west1.firebasedatabase.app/'; // main URL
const BASE_URL = 'https://join-contacts-fcc04-default-rtdb.europe-west1.firebasedatabase.app' // URL Oli
//const BASE_URL = 'https://test-project-9b5dc-default-rtdb.europe-west1.firebasedatabase.app/'; // URL Kevin

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
        password: password.value.trim()

    });
    putData(path, userData, userId);
}

function pushTasks(contacts) {
    let path = '/tasks';
    let title = document.getElementById('titleInput');
    let description = document.getElementById('taskDescription');
    let date = document.getElementById('dateInput');
    let category = document.getElementById('selectedCategory');
    let subTask = subtasksArr;
    let newTaskId = currentTaskId + 1;
    let taskId = title.value + newTaskId;
    let userData = ({
        title: title.value,
        description: description.value,
        date: date.value,
        prio: prioBtn,
        contact: contacts,
        category: category.innerHTML,
        subtask: subTask
    });
    currentTaskId = newTaskId;
    putData(path, userData, taskId);
}

async function pushContacts() {
    let isValid = await validateContactInput();
    if (!isValid) return;

    let path = '/contacts';
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
}

async function deleteTask(taskId) {
    let path = `/tasks/${taskId}`;
    deleteData(path);
}

async function deleteContact(contactId) {
    let path = `/contacts/${contactId}`;
    deleteData(path);
}

function adjustEmail(email) {
    return email.replace(/\./g, "_").replace(/@/g, "-at-");
}