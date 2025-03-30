const BASE_URL_KEVIN = "https://test-project-9b5dc-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData(path="") {
  try {
    let response = await fetch(BASE_URL_KEVIN + path + ".json");
    if(!response.ok) throw new Error(`problem while fetching data, ${response.status}`);
    let responseToJson = await response.json();
    processUserData(responseToJson);
    return responseToJson;
  } catch (error) {
    console.warn(error.message);
  }
}

function processUserData(userData) {
  let usersArr = Object.entries(userData).map(([username, userInfo]) => ({
    username,
    email: userInfo.email,
    password: userInfo.password
  }))
  console.log(usersArr);
  usersArr
}

