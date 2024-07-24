
function checkForLocalStorage() {
    let storage;
    try {
        storage = window.localStorage;
        const x = "BINGO BANGO BONGO";
        storage.setItem(x, x);
        storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
          );
        }
}

function saveUserData(favouriteCities) {
  if (checkForLocalStorage()) {
        const userJSON = JSON.stringify(favouriteCities);
        localStorage.setItem("userData", userJSON);
      }
}

function loadUserData() {
  if (checkForLocalStorage && localStorage.getItem("userData") !== null) {

    const userData = JSON.parse(localStorage.getItem("userData"));
      
      return userData;
  } else {
      const newUser = [];
    
      return newUser;
  }
  }

function reviveData() {

    const userData = JSON.parse(localStorage.getItem("userData"));

    const revivedProjectList = [];

    for (let i = 0; i < userData.projectList.length; i++) {
        const revivedTaskList = [];
        userData.projectList[i].taskList.forEach(tsk => revivedTaskList.push(new Task(tsk.taskId, tsk.projectId, tsk.title, tsk.description, tsk.dueDate, tsk.priority, tsk.noteList)));
        revivedProjectList.push(new Project(userData.projectList[i].projectId, userData.projectList[i].title, userData.projectList[i].description, revivedTaskList));
    }

    return new User(userData.name, revivedProjectList);

}

export { saveUserData, loadUserData };