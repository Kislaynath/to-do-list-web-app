let searchText = "";
let tasks =
JSON.parse(localStorage.getItem("tasks")) ||
[];
let filter = "all";

function addTask() {
    let text = document.getElementById("taskInput").value;
    let priority = document.getElementById("priority").value;
    let deadline = document.getElementById("deadline").value;

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        priority: priority,
        deadline: deadline,
        completed: false
    });
    SaveData();
    Showtask();
}

function Showtask(){
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let filteredTasks = tasks.filter(task => {
        let prioritycolor = "";
        if (task.priority === "high") prioritycolor = "red";
        else if (task.priority === "medium") prioritycolor = "orange";
        else if (task.priority === "low") prioritycolor = "green";
    let matchesFilter = true;
        if (filter === "completed") return task.completed === true;
        if (filter === "pending") return task.completed === false;
    let matchesSearch = task.text.toLowerCase().includes(searchText);


        return matchesFilter && matchesSearch;

    });

    filteredTasks.forEach((task) => {
        let index = tasks.indexOf(task);
        let li = document.createElement("li");

        li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}" >${task.text}</span>
         <br>
         proiority: ${task.priority}
         <br>
         deadline: ${task.deadline}
         <br>
         <button onclick="toggleTask(${index})">${task.completed ? "Mark as Pending" : "Mark as Completed"}</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }
          taskList.appendChild(li);
    });
    updateCounter();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    SaveData();
    Showtask();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    SaveData();
    Showtask();
}

function editTask(index) {
    let newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        SaveData();
        Showtask();
    }
}

function ClearAll() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        SaveData();
        Showtask();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function filterTasks(Type) {
    filter = Type;
    Showtask();
}

function updateCounter() {
    let completed = tasks.filter(task => task.completed).length;
    document.getElementById("taskCounter").innerHTML = `Total Tasks: ${tasks.length} | Completed: ${completed}`;
}

function SaveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function searchTasks() {
    searchText = document.getElementById("searchInput").value.toLowerCase();

Showtask();
}