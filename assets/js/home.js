const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const startTimeInput = document.getElementById('start-time-input');
const endTimeInput = document.getElementById('end-time-input');
const categorySelect = document.getElementById('category-select');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentCategory = 'todas';

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        id: Date.now(),
        name: taskInput.value,
        date: dateInput.value || null,
        startTime: startTimeInput.value || null,
        endTime: endTimeInput.value || null,
        category: categorySelect.value,
        completed: false,
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks
        .filter(task => currentCategory === 'todas' || task.category === currentCategory)
        .forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
                    ${task.name} 
                    ${task.date ? `- ${task.date}` : ''} 
                    ${task.startTime ? `de ${task.startTime}` : ''} 
                    ${task.endTime ? `a ${task.endTime}` : ''}
                    [${task.category}]
                </span>
                <button onclick="deleteTask(${task.id})">Deletar</button>
                <button onclick="editTask(${task.id})">Editar</button>
                <button onclick="completeTask(${task.id})">
                    ${task.completed ? 'Desmarcar' : 'Concluir'}
                </button>
            `;
            taskList.appendChild(li);
        });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    taskInput.value = task.name;
    dateInput.value = task.date || '';
    startTimeInput.value = task.startTime || '';
    endTimeInput.value = task.endTime || '';
    categorySelect.value = task.category;
    deleteTask(id);
}

function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(category) {
    currentCategory = category;
    renderTasks();
}

// Notificações
setInterval(() => {
    const now = new Date();
    tasks.forEach(task => {
        if (task.endTime && task.date) {
            const endDate = new Date(`${task.date}T${task.endTime}`);
            const timeLeft = endDate - now;
            if (timeLeft > 0 && timeLeft < 3600000 && !task.completed) { // 1 hora
                alert(`Falta pouco tempo para você encerrar a tarefa "${task.name}"!`);
            }
        }
    });
}, 60000); // Checa a cada 1 minuto

renderTasks();







function renderTasks() {
    taskList.innerHTML = '';
    tasks
        .filter(task => currentCategory === 'todas' || task.category === currentCategory)
        .forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
                    ${task.name} 
                    ${task.date ? `- ${task.date}` : ''} 
                    ${task.startTime ? `de ${task.startTime}` : ''} 
                    ${task.endTime ? `a ${task.endTime}` : ''}
                    [${task.category}]
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




document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            window.location.href = "to-do-list.html"; // Redireciona para a página da lista de tarefas
        });
    });
});


