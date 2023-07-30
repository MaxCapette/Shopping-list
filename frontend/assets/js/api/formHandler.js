import { updateTask, createTask } from "./api.js";
import { generateLiFromTask, hideTaskForm } from "./domUtils.js";

async function processForm(event) {
    event.preventDefault();

    const titleInput = document.querySelector("#task-title");
    const title = titleInput.value;
    const categorySelect = document.querySelector("#task-category");
    const category = categorySelect.value; // get the selected categor
    const form = document.querySelector(".modal-dialog");
    // get the id from the form's data-id attribute
    const id = form.dataset.id;
    console.log(id);
    const task = {
        title: title,
        category_id: category,
        // add any other task properties you need
    };
    let response;
    console.log(task);
    if (id) {
        response = await updateTask(id, task); // Await the response
    } else {
        response = await createTask(task); // Await the response
    }
    console.log(response);
    if (response.ok) {
        // if the response is ok, add the new task to the task list
        const task = await response.json();
        const li = generateLiFromTask(task);
        const tasklist = document.querySelector(".tasklist");
        if (id) {
            // if there is an id, find the existing task in the list and replace it
            const existingLi = tasklist.querySelector(`li[data-id="${id}"]`);
            tasklist.replaceChild(li, existingLi);
        } else {
            // if there is no id, append the new task to the list
            tasklist.append(li);
        }
    } else {
        alert("Une erreur est survenue lors de la création de la tâche");
    }
    // clear the input field and hide the form
    titleInput.value = "";
    hideTaskForm();
}
export { processForm };