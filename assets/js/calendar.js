const calendar = document.getElementById('calendar');
const taskDetails = document.getElementById('task-details'); // Contêiner para exibir as tarefas do dia

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

// Função para renderizar o calendário e as tarefas do mês atual
function renderCalendar(month = currentMonth, year = currentYear) {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${cardId}`)) || [];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    calendar.innerHTML = '';

    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const header = document.createElement('div');
    header.innerHTML = `
    <button onclick="changeMonth(-1)" style="font-size: 12px; padding: 6px 3px; background-color: transparent; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;">&#8249;</button>
    <span>${monthNames[month]} ${year}</span>
    <button onclick="changeMonth(1)" style="font-size: 12px; padding: 6px 3px; margin-top:15px; background-color: transparent; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;">&#8250;</button>
`;

    calendar.appendChild(header);

    const emptyCells = (firstDayOfMonth + 6) % 7;
    for (let i = 0; i < emptyCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (dateStr === todayStr) {
            dayElement.style.backgroundColor = '#ADD8E6';
        }

        const dateTasks = tasks.filter(task => task.date === dateStr);
        if (dateTasks.length > 0) {
            dayElement.style.backgroundColor = '#FFD700';
            dayElement.onclick = () => showTasks(dateTasks);
        }

        calendar.appendChild(dayElement);
    }
}

// Função para exibir as tarefas no alerta pop-up
function showTasks(tasks) {
    let taskList = tasks.map((task, index) => {
        return `${index + 1}. ${task.name} ${task.time ? `às ${task.time}` : ''}`;
    }).join('\n');

    if (taskList) {
        alert(`Tarefas do dia:\n\n${taskList}`);
    } else {
        alert("Não há tarefas para este dia.");
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

// Função para atualizar o calendário após salvar tarefas
function updateCalendar() {
    renderCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});

renderCalendar();  // Garante que o calendário seja carregado corretamente na primeira vez
