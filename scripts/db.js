let users = {
    'name' : 'Testname',
    'password' : '1234',
    'email' : 'Testname@dev.com'
};
let tasks = {};
let contacts = {};

const BASE_URL = 'https://join-439-default-rtdb.europe-west1.firebasedatabase.app/';

async function getData(path='') {
    try {
        let response = await fetch(BASE_URL + path + '.json');
        if (!response.ok)
            throw new Error(`problem while fetching, ${response.status}`);
            let data = await response.json();
            console.log(data);
            return data;
    } catch (error) {
        console.warn(error.message);
    }
}

async function putUserData(path='', users, userId) {
        let response = await fetch(`${BASE_URL}${path}/${userId}.json`,{
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json',
            }, 
            body : JSON.stringify(users),
            
        });
        let data = await response.json();
        console.log(data);
        return data;
}

async function putTaskData(path='', users, userId) {
    let response = await fetch(`${BASE_URL}${path}/${userId}.json`,{
        method : 'PUT',
        headers : {
            'Content-type' : 'application/json',
        }, 
        body : JSON.stringify(users),
        
    });
    let data = await response.json();
    console.log(data);
    return data;
}


function pushUsers() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let userId = adjustEmail(email.value);
    let userData = ({
        name:email.value.trim(),
        email:email.value.trim(),
        password:password.value.trim()
    
    });
    putUserData('/users', userData, userId);
}

function pushTasks(contacts) {
    let title = document.getElementById('titleInput');
    let description = document.getElementById('taskDescription');
    let date = document.getElementById('dateInput');
    // let priority = 
    console.log(contacts);
    
    let category = document.getElementById('selectedCategory');
    // let subTask = 
    let taskId = 'test Task';
    let userData = ({
        title:title.value,
        description:description.value,
        date:date.value,
        contact:contacts,
        category:category.innerHTML
    
    });
    putTaskData('/tasks', userData, taskId);
}


function adjustEmail(email) {
    return email.replace(/\./g, "_").replace(/@/g, "-at-");
}