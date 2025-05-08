// Ambil referensi elemen
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Muat tugas dari localStorage saat halaman dimuat
window.onload = loadTasks;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    addTaskToList(task.text, task.completed);
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTaskToList(taskText, false);
  taskInput.value = "";
  saveTasks();
}

function addTaskToList(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.addEventListener("dblclick", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("li");
    tasks.forEach(task => {
        if (filter == "all") {
            task.style.display = "list-item";
        } else if (filter == "finished"){
            task.style.display = task.classList.contains("completed") ? "list-item" : "none";
        } else if (filter == "unfinished") {
            task.style.display = task.classList.contains("completed") ? "none" : "list-item";
        }
    })
}
