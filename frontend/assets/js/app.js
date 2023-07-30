// TODO 1 : fetch tasks dans l'api (backend)

import { getTasks } from "./api/api.js";
import { generateLiFromTask, showTaskForm } from "./api/domUtils.js";
import { processForm } from "./api/formHandler.js";



function initTasklist() {
    const tasklist = document.querySelector(".tasklist");
    tasklist.replaceChildren();
    getTasks().then((tasks) => {
        tasks.forEach((task) => {
            const li = generateLiFromTask(task);
            tasklist.append(li);
        });
    });
}


document.querySelector("#create-task-btn").addEventListener("click", () => showTaskForm());

const form = document.querySelector(".modal-dialog form");
form.addEventListener("submit", processForm);


document.addEventListener("DOMContentLoaded", initTasklist);