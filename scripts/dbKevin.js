const BASE_URL_KEVIN = "https://test-project-9b5dc-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData(path="") {
  try {
    let response = await fetch(BASE_URL_KEVIN + path + ".json");
    if(!response.ok) throw new Error(`problem while fetching data, ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return null;
  }
}

async function emailExists() {
  let email = document.getElementById("email").value.trim();
  let userData = await getData("/users");
  if(!userData) return;
  
  let userArr = processUserData(userData);
  let exists = userArr.some(user => user.email === email);

  return exists;
}

function processUserData(userData) {
  return Object.entries(userData).map(([username, userInfo]) => ({
    username,
    email: userInfo.email,
    password: userInfo.password
  }));
}