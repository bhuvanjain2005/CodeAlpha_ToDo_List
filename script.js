let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority");
    const dueDate = document.getElementById("dueDate");

    if(taskInput.value.trim() === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        completed:false,
        priority:priority.value,
        dueDate:dueDate.value
    });

    taskInput.value="";
    dueDate.value="";

    saveTasks();
    renderTasks();
}

function renderTasks(){

    const taskList = document.getElementById("taskList");

    const search =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    taskList.innerHTML="";

    let filteredTasks = tasks.filter(task => {

        let matchesSearch =
        task.text.toLowerCase().includes(search);

        let matchesFilter =
        currentFilter==="all" ||
        (currentFilter==="completed" && task.completed) ||
        (currentFilter==="pending" && !task.completed);

        return matchesSearch && matchesFilter;
    });

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
        <div class="task-info">
            <div class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </div>

            <small>
                Priority:
                <span class="priority-${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>
                |
                Due: ${task.dueDate || 'Not Set'}
            </small>
        </div>

        <div class="actions">
            <button onclick="toggleTask(${tasks.indexOf(task)})">✔</button>
            <button onclick="editTask(${tasks.indexOf(task)})">✏</button>
            <button onclick="deleteTask(${tasks.indexOf(task)})">🗑</button>
        </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index){

    let newTask =
    prompt("Edit Task", tasks[index].text);

    if(newTask && newTask.trim() !== ""){
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete task?")){
        tasks.splice(index,1);
        saveTasks();
        renderTasks();
    }
}

function filterTasks(type){
    currentFilter = type;
    renderTasks();
}

function updateStats(){

    document.getElementById("taskCount")
    .innerText = `${tasks.length} Tasks`;

    let completed =
    tasks.filter(task => task.completed).length;

    let progress =
    tasks.length === 0
    ? 0
    : (completed/tasks.length)*100;

    document.getElementById("progressBar")
    .style.width = progress + "%";
}

document
.getElementById("searchInput")
.addEventListener("input", renderTasks);

renderTasks();