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
async function updateTask(id, task) {
   // if there is an id, update the task
   const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
});
return response;
}
async function createTask(task) {
    // if there is no id, create a new task
const response = await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
});
return response;
}
export { getTasks, getCategories, deleteTask, updateTask, createTask };