let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, finished: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
}

function toggleTask(index) {
    tasks[index].finished = !tasks[index].finished;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            filter === "unfinished" && task.finished ||
            filter === "finished" && !task.finished
        ) return;

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.textDecoration = task.finished ? "line-through" : "none";
        span.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = (e) => {
            e.stopPropagation();
            const newText = prompt("Edit tugas:", task.text);
            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                saveTasks();
                renderTasks(filter);
            }
        };

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


function filterTasks(filter) {
    renderTasks(filter);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
    }
}
