const calendar = document.getElementById('calendar'); 
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); // Alterna a classe 'active'
}

// Adiciona evento de clique para cada botão na sidebar
document.querySelectorAll('.sidebar button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.sidebar button').forEach(btn => {
            btn.classList.remove('active'); // Remove a classe active
        });
        
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active'); // Adiciona a classe active
    });
});

function renderCalendar(month = currentMonth, year = currentYear) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Primeiro dia do mês
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de dias no mês
    const today = new Date(); // Data atual
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Data atual em YYYY-MM-DD

    calendar.innerHTML = '';

    // Exibir nome do mês e controles de navegação
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
                        "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const header = document.createElement('div');
    header.innerHTML = `
        <button onclick="changeMonth(-1)">&#8249;</button>
        <span>${monthNames[month]} ${year}</span>
        <button onclick="changeMonth(1)">&#8250;</button>
    `;
    calendar.appendChild(header);

    // Preencher os dias vazios antes do primeiro dia do mês
    const emptyCells = (firstDayOfMonth + 6) % 7; // Ajustar para que comece no domingo
    for (let i = 0; i < emptyCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendar.appendChild(emptyCell);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Destacar o dia atual
        if (dateStr === todayStr) {
            dayElement.style.backgroundColor = '#ADD8E6'; // Azul claro para hoje
        }

        const dateTasks = tasks.filter(task => task.date === dateStr);
        if (dateTasks.length > 0) {
            dayElement.style.backgroundColor = '#ADD8E6'; // Azul para indicar tarefas
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

// Renderiza o calendário ao carregar a página
renderCalendar();
