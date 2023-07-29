// TODO 1 : fetch tasks dans l'api (backend)
async function getTasks() {
    const response = await fetch("http://localhost:8000/api/tasks");
    const tasks = await response.json();
    return tasks;
}

function generateLiFromTask(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const p = document.createElement("p");
    p.textContent = task.title;

    const divDelete = document.createElement("div");
    divDelete.classList.add("delete");
    // divDelete.addEventListener("click", deleteTask);

    const divEdit = document.createElement("div");
    divEdit.classList.add("edit");
    // divEdit.addEventListener("click", () => showEditTaskForm(task)); 

    li.append(p, divDelete, divEdit);
    return li;
}
function initTasklist() {
    const tasklist = document.querySelector(".tasklist");
    tasklist.replaceChildren();
    getTasks().then((tasks) => {
        // boucle avec soit forof, soit foreach soit for (i)
        tasks.forEach((task) => {
            const li = generateLiFromTask(task);
            tasklist.append(li);
        });
    });
}


document.addEventListener("DOMContentLoaded", initTasklist);