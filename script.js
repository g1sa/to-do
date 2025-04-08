const form = document.getElementById('task-form');
const taskName = document.getElementById('task-name');
const taskType = document.getElementById('task-type');
const taskDesc = document.getElementById('task-desc');
const taskBg = document.getElementById('task-bg');
const tasksContainer = document.getElementById('tasks-container');
const clearBtn = document.getElementById('clear-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

function renderTasks() {
  tasksContainer.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.style.backgroundColor = task.bg;

    taskCard.innerHTML = `
      <h3>${task.name}</h3>
      <p><strong>Type:</strong> ${task.type}</p>
      <p>${task.desc}</p>
      <div class="actions">
        <button onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    tasksContainer.appendChild(taskCard);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = {
    name: taskName.value,
    type: taskType.value,
    desc: taskDesc.value,
    bg: taskBg.value
  };

  if (editingTaskId !== null) {
    tasks[editingTaskId] = task;
    editingTaskId = null;
  } else {
    tasks.push(task);
  }

  saveTasks();
  form.reset();
});

clearBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    tasks = [];
    saveTasks();
  }
});

function editTask(index) {
  const task = tasks[index];
  taskName.value = task.name;
  taskType.value = task.type;
  taskDesc.value = task.desc;
  taskBg.value = task.bg;
  editingTaskId = index;
}

function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    saveTasks();
  }
}

renderTasks();
task.bg