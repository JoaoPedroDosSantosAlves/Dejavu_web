// Selecionar elementos do DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Obter o ID do card da URL
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

// Função para obter as tarefas específicas do card
let tasks = JSON.parse(localStorage.getItem(`tasks_${cardId}`)) || [];
let editTaskId = null;

// Som de alerta
const alertSound = new Audio('https://www.soundjay.com/button/beep-07.wav');

// Solicitar permissão para notificações
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                alert("Por favor, habilite as notificações para receber alertas.");
            }
        });
    }
});

// Função para adicionar ou editar uma tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!taskInput.value.trim()) {
        alert("Por favor, insira o nome da tarefa.");
        return;
    }

    const task = {
        id: editTaskId || Date.now(),
        name: taskInput.value.trim(),
        date: dateInput.value || null,
        time: timeInput.value || null,
        notified: false,
        completed: false
    };

    if (editTaskId) {
        const index = tasks.findIndex(t => t.id === editTaskId);
        tasks[index] = task;
        editTaskId = null;
    } else {
        tasks.push(task);
    }

    saveTasks();
    renderTasks();
    taskForm.reset();

    // Verificar e mostrar notificação imediatamente se a tarefa for para o passado
    checkTaskNotification(task);
    showNotification(task.name); // Exibe notificação imediata para a nova tarefa
});

// Função para verificar e exibir notificação para tarefas de datas passadas
function checkTaskNotification(task) {
    const now = new Date();
    if (task.date && task.time) {
        const taskDateTime = new Date(`${task.date}T${task.time}`);
        if (now >= taskDateTime && !task.notified) {
            showNotification(task.name);
            task.notified = true;
            saveTasks();
        }
    }
}

// Função para mostrar notificação e tocar som
function showNotification(taskName) {
    if (Notification.permission === 'granted') {
        const notification = new Notification('Lembrete de Tarefa', {
            body: `Hora de realizar a tarefa: "${taskName}"`,
            icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png'
        });

        alertSound.play().catch(err => {
            console.error("Erro ao tentar reproduzir o som:", err);
        });

        setTimeout(() => {
            notification.close();
        }, 30000);
    } else {
        console.log('Permissão para notificações não concedida.');
    }
}

// Função para verificar notificações de tarefas
function checkNotifications() {
    const now = new Date();

    tasks.forEach(task => {
        if (!task.notified && task.date && task.time && !task.completed) {
            const taskDateTime = new Date(`${task.date}T${task.time}`);
            if (now >= taskDateTime) {
                showNotification(task.name);
                task.notified = true;
                saveTasks();
            }
        }
    });
}

// Verificar notificações a cada minuto
setInterval(checkNotifications, 60000);

// Função para renderizar tarefas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
                ${task.name}
                ${task.date ? ` - ${task.date}` : ''} 
                ${task.time ? ` às ${task.time}` : ''}</span>
            <div>
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
    dateInput.value = task.date || '';
    timeInput.value = task.time || '';
    editTaskId = task.id;
}

// Função para marcar tarefa como concluída
function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(`tasks_${cardId}`, JSON.stringify(tasks));
    console.log(`Tarefas salvas para o card ${cardId}:`, tasks); // Verifique se as tarefas estão sendo salvas
}

// Renderizar tarefas ao carregar a página
renderTasks();
