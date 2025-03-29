

let contactData = [];

const BASE_URL = "https://join-contacts-fcc04-default-rtdb.europe-west1.firebasedatabase.app/";

function onloadFunc() {
    console.log("test");
    postContactsData("/contacts", { "name": "Kevin Stäbler", "email": "kevin.staebler@beispiel.de", "number": "+49 2222 222 22 2" });
}

async function getContactsData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
}

async function postContactsData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}