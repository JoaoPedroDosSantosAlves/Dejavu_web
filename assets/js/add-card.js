// Selecionando elementos necessários
const taskModal = document.getElementById('taskModal');
const closeModalButton = document.getElementById('closeModalButton');
const saveTaskButton = document.getElementById('saveTaskButton');
const taskNameInput = document.getElementById('taskName');
const taskImageInput = document.getElementById('taskImage'); // Input para imagem
const addTaskButton = document.getElementById('addTaskButton');
const cardsContainer = document.getElementById('cardsContainer'); // Contêiner de cards

// Função para abrir o modal
function openModal() {
    taskModal.style.display = 'flex';  // Torna o modal visível
}

// Função para fechar o modal
function closeModal() {
    taskModal.style.display = 'none';  // Torna o modal invisível
}

// Função para salvar a tarefa e adicionar o card
function saveTask() {
    const taskName = taskNameInput.value.trim();
    const taskImage = taskImageInput.files[0]; // Obtém a imagem selecionada

    if (taskName) { // Agora a imagem não é obrigatória
        // Criar o card dinamicamente
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Adiciona um evento de clique no card para redirecionar para a página de lista de tarefas
        card.addEventListener('click', () => {
            window.location.href = 'to-do-list.html';
        });
        
        // Verificar se uma imagem foi selecionada
        if (taskImage) {
            const img = document.createElement('img');
            const reader = new FileReader();
            
            reader.onload = function(e) {
                img.src = e.target.result; // Define o src da imagem
                card.appendChild(img);
            };
            
            reader.readAsDataURL(taskImage);  // Lê o arquivo da imagem
        }
        
        // Criar o título do card
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = taskName;  // Adiciona o nome da tarefa como título
        card.appendChild(cardTitle);  // Adiciona o título ao card
        
        // Criar a descrição do card
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = 'Ver tarefas ->';  // Texto de exemplo
        card.appendChild(cardText);  // Adiciona o texto ao card
        
        // Botão de deletar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Deletar';
        
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que o clique no botão delete redirecione
            card.remove(); // Remove o card ao clicar no botão
        });
        
        card.appendChild(deleteButton);  // Adiciona o botão de deletar ao card
        
        // Adiciona o card à página
        cardsContainer.appendChild(card);
        
        // Limpa o campo do modal e fecha
        taskNameInput.value = '';  // Limpa o campo do nome
        taskImageInput.value = '';  // Limpa o campo da imagem
        closeModal();  // Fecha o modal
    } else {
        alert('Por favor, insira um nome para a tarefa.');
    }
}

// Vinculando os eventos de clique
addTaskButton.addEventListener('click', openModal);  // Abre o modal ao clicar em "+ Adicionar"
closeModalButton.addEventListener('click', closeModal);  // Fecha o modal ao clicar no botão "Fechar"
saveTaskButton.addEventListener('click', saveTask);  // Salva a tarefa ao clicar no botão "Salvar Tarefa"
