

// let contactData = [];

// const BASE_URL = "https://join-contacts-fcc04-default-rtdb.europe-west1.firebasedatabase.app/";

// function onloadFunc() {
//     postContactsData("/contacts", { "name": "Kevin Stäbler", "email": "kevin.staebler@beispiel.de", "number": "+49 2222 222 22 2" });
// }

// async function getContactsData(path = "") {
//     let response = await fetch(BASE_URL + path + ".json");
//     let responseToJson = await response.json();
// }

// async function postContactsData(path = "", data = {}) {
//     let response = await fetch(BASE_URL + path + ".json", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }

// async function pushContactData() {
//     let name = document.getElementById('contactName');
//     let email = document.getElementById('contactEmail');
//     let phone = document.getElementById('contactPhone');
//     let contactData = ({
//         name: name.value.trim(),
//         email: email.value.trim(),
//         number: phone.value.trim()
//     });
//     try {
//         await postContactsData('/contacts', contactData);
//     } catch (error) {
//         console.error("Fehler beim Speichern:", error);
//     }

//     clearInputFields();
// }

// function clearInputFields() {
//     document.getElementById('contactName').value = "";
//     document.getElementById('contactEmail').value = "";
//     document.getElementById('contactPhone').value = "";
// }