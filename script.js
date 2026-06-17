let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

if(taskInput.value.trim()===""){
alert("Enter a task");
return;
}

tasks.push({
text: taskInput.value,
priority: priority.value,
dueDate: dueDate.value,
completed:false
});

taskInput.value="";
dueDate.value="";

saveTasks();
renderTasks();
}

function renderTasks(){

const taskList=document.getElementById("taskList");
const search=document.getElementById("searchInput").value.toLowerCase();

taskList.innerHTML="";

tasks
.filter(task=>task.text.toLowerCase().includes(search))
.forEach((task,index)=>{

const div=document.createElement("div");

div.className=`task ${task.completed ? "completed" : ""}`;

div.innerHTML=`
<div class="task-info">
<h3>${task.text}</h3>
<small>
Priority: ${task.priority} |
Due: ${task.dueDate || "Not Set"}
</small>
</div>

<div class="actions">
<button onclick="toggleTask(${index})">✓</button>
<button onclick="editTask(${index})">✏</button>
<button onclick="deleteTask(${index})">🗑</button>
</div>
`;

taskList.appendChild(div);

});

updateStats();
}

function toggleTask(index){
tasks[index].completed=!tasks[index].completed;
saveTasks();
renderTasks();
}

function editTask(index){

const updated=prompt(
"Edit Task",
tasks[index].text
);

if(updated){
tasks[index].text=updated;
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

function updateStats(){

const total=tasks.length;

const completed=
tasks.filter(t=>t.completed).length;

const pending=total-completed;

document.getElementById("totalTasks").textContent=total;
document.getElementById("completedTasks").textContent=completed;
document.getElementById("pendingTasks").textContent=pending;

const progress=
total===0 ? 0 : (completed/total)*100;

document.getElementById("progressBar")
.style.width=progress+"%";
}

document
.getElementById("search")
.addEventListener("input", renderTasks);

renderTasks();
