const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editTaskId = null; // Variável para controlar a edição de tarefas

// Função para adicionar ou editar uma tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
    if (!taskInput.value || !dateInput.value || !timeInput.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const task = {
        id: editTaskId || Date.now(),
        name: taskInput.value,
        date: dateInput.value,
        time: timeInput.value,
        notified: false, // Para controlar se a notificação já foi enviada
        completed: false
    };

    if (editTaskId) {
        // Editando uma tarefa existente
        const index = tasks.findIndex(t => t.id === editTaskId);
        tasks[index] = task;
        editTaskId = null;
    } else {
        // Adicionando uma nova tarefa
        tasks.push(task);
    }

    saveTasks();
    renderTasks();
    taskForm.reset();
});

// Função para renderizar tarefas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
                ${task.name} - ${task.date} às ${task.time}
            </span>
            <div class="button-group">
                <button onclick="deleteTask(${task.id})">Deletar</button>
                <button onclick="editTask(${task.id})">Editar</button>
                <button onclick="completeTask(${task.id})">
                    ${task.completed ? 'Desmarcar' : 'Concluir'}
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Função para deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Função para editar tarefa
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    taskInput.value = task.name;
    dateInput.value = task.date;
    timeInput.value = task.time;
    editTaskId = task.id;
}

// Função para marcar tarefa como concluída
function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para verificar e enviar notificações
function checkNotifications() {
    const now = new Date();

    tasks.forEach(task => {
        if (!task.notified && !task.completed) {
            const taskDateTime = new Date(`${task.date}T${task.time}`);
            if (now >= taskDateTime) {
                alert(`Hora de realizar a tarefa: "${task.name}"`);
                task.notified = true; // Marcar como notificada
                saveTasks();
            }
        }
    });
}

// Verificar notificações a cada minuto
setInterval(checkNotifications, 60000);

renderTasks();
