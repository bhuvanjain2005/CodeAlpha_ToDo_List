let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority");
    const dueDate = document.getElementById("dueDate");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskInput.value,
        priority: priority.value,
        dueDate: dueDate.value,
        completed: false
    });

    taskInput.value = "";
    dueDate.value = "";

    saveTasks();
    renderTasks();
}

function renderTasks() {

    const taskList = document.getElementById("taskList");
    const searchBox = document.getElementById("searchInput");

    const search = searchBox
        ? searchBox.value.toLowerCase()
        : "";

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(search)
    );

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                🚀 Ready to be productive?
                <br><br>
                Add your first task above.
            </div>
        `;
        updateStats();
        return;
    }

    filteredTasks.forEach((task, index) => {

        let priorityClass = "priority-low";

        if (task.priority === "High") {
            priorityClass = "priority-high";
        } else if (task.priority === "Medium") {
            priorityClass = "priority-medium";
        }

        const div = document.createElement("div");

        div.innerHTML = `
        <div class="task-card ${task.completed ? 'completed-task' : ''}">

            <div class="task-left">

                <h3>${task.completed ? "✅" : "📌"} ${task.text}</h3>

                <p class="meta">

                    <span class="${priorityClass}">
                        ${task.priority}
                    </span>

                    &nbsp; | &nbsp;

                    📅 ${task.dueDate || "No Due Date"}

                </p>

            </div>

            <div class="actions">

                <button onclick="toggleTask(${index})">✓</button>

                <button onclick="editTask(${index})">✏</button>

                <button onclick="deleteTask(${index})">🗑</button>

            </div>

        </div>
        `;

        taskList.appendChild(div);
    });

    updateStats();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {

    const updated = prompt(
        "Edit Task",
        tasks[index].text
    );

    if (updated && updated.trim() !== "") {
        tasks[index].text = updated;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {

    if (confirm("Delete task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;

    const progress =
        total === 0
            ? 0
            : (completed / total) * 100;

    document.getElementById("progressBar")
        .style.width = progress + "%";
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", renderTasks);
}

renderTasks();
