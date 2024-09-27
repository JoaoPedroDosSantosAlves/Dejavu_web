const calendar = document.getElementById('calendar');
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month = currentMonth, year = currentYear) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendar.innerHTML = '';

    // Exibir nome do mês e controles de navegação
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const header = document.createElement('div');
    header.innerHTML = `
        <button onclick="changeMonth(-1)">&#8249;</button>
        <span>${monthNames[month]} ${year}</span>
        <button onclick="changeMonth(1)">&#8250;</button>
    `;
    calendar.appendChild(header);

    // Preencher os dias do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const dateTasks = tasks.filter(task => task.date === dateStr);
        if (dateTasks.length > 0) {
            dayElement.style.backgroundColor = '#28a745'; // Verde para indicar tarefas
            dayElement.onclick = () => showTasks(dateTasks);
        }

        calendar.appendChild(dayElement);
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

function showTasks(tasks) {
    const taskList = tasks.map(task => 
        `<li>${task.name} ${task.startTime ? `de ${task.startTime}` : ''} ${task.endTime ? `a ${task.endTime}` : ''}</li>`
    ).join('');
    alert(`Tarefas do dia:\n${taskList}`);
}

renderCalendar();
