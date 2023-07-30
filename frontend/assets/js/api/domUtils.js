import { deleteTask, getCategories } from "./api.js";

function generateLiFromTask(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const p = document.createElement("p");
    p.textContent = task.title;

    const em = document.createElement("em");
    if (task.category) {
        em.textContent = task.category.name;
    } else {
        em.textContent = "Pas de catégorie";
    }

    const divDelete = document.createElement("div");
    divDelete.classList.add("delete");
    divDelete.addEventListener("click", deleteTask);

    const divEdit = document.createElement("div");
    divEdit.addEventListener("click", () => showTaskForm(task)); 
    divEdit.classList.add("edit"); 

    li.append(p, em, divDelete, divEdit);
    return li;
}
function showTaskForm(task = null){
    const form = document.querySelector(".modal-dialog");
    form.classList.add("show");
    const h2 = form.querySelector("h2");
    const categorySelect = form.querySelector("#task-category");
    // console.log(task);
    if (task) {
        
        h2.textContent = "Modifier";
        const titleInput = document.querySelector("#task-title");
        titleInput.value = task.title;
        
        
        if (task.category) {
            categorySelect.value = task.category.id;
        } else {
            categorySelect.value = ""; // or set it to a default value
        }form.dataset.id = task.id;
    }else{
        h2.textContent = "Ajouter";
        form.dataset.id = "";  
    }
    let selectedValue = ""; // default to no selection
    if (task && task.category) {
        selectedValue = task.category.id; // if in edit mode, store the task's category id
    }
    categorySelect.innerHTML = ''; // clear the select options
    getCategories().then((categories) => {
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;

            categorySelect.append(option);
        });
        categorySelect.value = selectedValue;
    });
    const closeFormButton = document.querySelector("#close-form-button");
    closeFormButton.addEventListener("click", hideTaskForm);
}
function hideTaskForm() {
    const form = document.querySelector(".modal-dialog");
    form.classList.remove("show");
    form.removeAttribute("data-id"); // remove the data-id attribute
    document.querySelector("#task-title").value = "";
}
export {generateLiFromTask, showTaskForm, hideTaskForm };