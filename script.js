let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask(){
    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: input.value,
        completed:false
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index){
    const newTask = prompt("Edit Task", tasks[index].text);

    if(newTask !== null && newTask.trim() !== ""){
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

renderTasks();