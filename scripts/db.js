let users = {
    'name' : 'Testname',
    'password' : '1234',
    'email' : 'Testname@dev.com'
};
let tasks = {

};
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
    console.log('test');
}

async function postData(path='', users) {
        let response = await fetch(BASE_URL + path + '.json',{
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json',
            }, 
            body : JSON.stringify(users)
        });
        let data = await response.json();
        console.log(data);
        return data;
        
}

function pushUsers() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let userData = ({
        name:email.value.trim(),
        email:email.value.trim(),
        password:password.value.trim()
    
    });
    postData('/users', userData);
    console.log(users);
    
}