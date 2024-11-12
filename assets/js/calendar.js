const calendar = document.getElementById('calendar');
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Obter o cardId da URL
const urlParams = new URLSearchParams(window.location.search);

const cardId = urlParams.get('id');

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Adiciona evento de clique para cada botão na sidebar
document.querySelectorAll('.sidebar button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.sidebar button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});

// Função para renderizar o calendário e as tarefas do mês atual
function renderCalendar(month = currentMonth, year = currentYear) {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${cardId}`)) || [];
    console.log(`Tarefas carregadas para o card ${cardId}:`, tasks);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    calendar.innerHTML = '';

    // Cabeçalho do calendário com o nome do mês e controles de navegação
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const header = document.createElement('div');
    header.innerHTML = ` 
        <button onclick="changeMonth(-1)">&#8249;</button>
        <span>${monthNames[month]} ${year}</span>
        <button onclick="changeMonth(1)">&#8250;</button>
    `;
    calendar.appendChild(header);

    // Preenche os dias vazios antes do primeiro dia do mês
    const emptyCells = (firstDayOfMonth + 6) % 7;
    for (let i = 0; i < emptyCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendar.appendChild(emptyCell);
    }

    // Preenche os dias do mês e adiciona eventos de clique para exibir as tarefas
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Destacar o dia atual
        if (dateStr === todayStr) {
            dayElement.style.backgroundColor = '#ADD8E6'; // Azul claro para hoje
        }

        // Verifica as tarefas para a data específica
        const dateTasks = tasks.filter(task => task.date === dateStr);
        if (dateTasks.length > 0) {
            dayElement.style.backgroundColor = '#ADD8E6'; // Azul para indicar tarefas
            dayElement.onclick = () => showTasks(dateTasks); // Exibe as tarefas ao clicar
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
    // Gera uma lista formatada de tarefas para o console e o alerta
    const taskListText = tasks.map((task, index) => {
        return `${index + 1}. ${task.name} ${task.startTime ? `de ${task.startTime}` : ''} ${task.endTime ? `a ${task.endTime}` : ''}`;
    }).join('\n');
    
    // Mostra a lista de tarefas no console de forma amigável
    console.log(`%cTarefas do dia:\n${taskListText}`, 'color: #2196F3; font-weight: bold; font-size: 20px;');
    
    // Exibe o alerta com as tarefas formatadas
    alert(`Tarefas do dia:\n${taskListText}`);
}

// Função para mostrar a notificação com as tarefas do dia
function showNotification(taskList) {
    if (Notification.permission === 'granted') {
        const notification = new Notification('Tarefas do dia', {
            body: taskList,
            icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png'
        });
        setTimeout(() => {
            notification.close();
        }, 30000);
    } else {
        console.log('Permissão para notificações não concedida.');
    }
}

// Solicita permissão para notificações
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                alert("Por favor, habilite as notificações para receber alertas.");
            }
        });
    }
});

// Renderiza o calendário ao carregar a página
renderCalendar();
