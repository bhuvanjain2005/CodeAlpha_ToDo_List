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

    tasks
        .filter(task =>
            task.text.toLowerCase().includes(search)
        )
        .forEach((task, index) => {

            const div = document.createElement("div");

            div.innerHTML = `
            <div class="task-card">

                <div class="task-left">
                    <h3>${task.completed ? "✅" : "📌"} ${task.text}</h3>

                    <p class="meta">
                        Priority:
                        <span class="priority-${task.priority.toLowerCase()}">
                            ${task.priority}
                        </span>
                        |
                        Due: ${task.dueDate || "Not Set"}
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

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;

    const progress =
        total === 0
            ? 0
            : (completed / total) * 100;

    document.getElementById("progressBar")
        .style.width = progress + "%";
}

/* FIXED SEARCH LISTENER */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", renderTasks);
}

renderTasks();
