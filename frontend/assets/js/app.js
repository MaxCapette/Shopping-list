// TODO 1 : fetch tasks dans l'api (backend)
async function getTasks() {
    const response = await fetch("http://localhost:8000/api/tasks");
    const tasks = await response.json();
    return tasks;
}
async function getCategories() {
    const response = await fetch("http://localhost:8000/api/categories");
    const categories = await response.json();
    return categories;
}
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
async function deleteTask(event) {
    // récupérer l'élément li parent
    const li = event.target.closest("li");

    // récupérer l'id de la tache à supprimer (dans le dataset de l'élément li)
    const id = li.dataset.id;

    // faire une requête DELETE sur l'api
    const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "DELETE",
    });
    
    if (confirm('Êtes vous sur de supprimer la tâche ?')) {
        if (response.ok) {
            li.remove();
        } else {
            alert(`Une erreur est survenue lors de la suppression de la tache ${id}`);
        }
    }
}

document.querySelector("#create-task-btn").addEventListener("click", () => showTaskForm());


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
        
        categorySelect.innerHTML = ''; // clear the select options
        
    }
    
    getCategories().then((categories) => {
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;

            categorySelect.append(option);
        });
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



const form = document.querySelector(".modal-dialog form");
form.addEventListener("submit", processForm);

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
        // if there is an id, update the task
        response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
    } else {
        // if there is no id, create a new task
        response = await fetch("http://localhost:8000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
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
document.addEventListener("DOMContentLoaded", initTasklist);