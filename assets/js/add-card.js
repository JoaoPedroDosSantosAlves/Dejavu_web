// Selecionando elementos necessários
const taskModal = document.getElementById('taskModal');
const closeModalButton = document.getElementById('closeModalButton');
const saveTaskButton = document.getElementById('saveTaskButton');
const taskNameInput = document.getElementById('taskName');
const taskImageInput = document.getElementById('taskImage'); // Input para imagem
const addTaskButton = document.getElementById('addTaskButton');
const cardsContainer = document.getElementById('cardsContainer'); // Contêiner de cards
const confirmationModal = document.getElementById('confirmationModal'); // Modal de confirmação
const confirmDeleteButton = document.getElementById('confirmDeleteButton'); // Botão de confirmação de deletação
const cancelDeleteButton = document.getElementById('cancelDeleteButton'); // Botão de cancelamento

let currentCard = null; // Guardar o card atual a ser deletado

// Carregar cards ao carregar a página
document.addEventListener('DOMContentLoaded', loadCards);

// Função para abrir o modal de tarefas
function openModal() {
    taskModal.style.display = 'flex';  // Torna o modal visível
}

// Função para fechar o modal de tarefas
function closeModal() {
    taskModal.style.display = 'none';  // Torna o modal invisível
}

// Função para salvar a tarefa e adicionar o card
function saveTask() {
    const taskName = taskNameInput.value.trim();
    const taskImage = taskImageInput.files[0]; // Obtém a imagem selecionada

    if (taskName) { // Agora a imagem não é obrigatória
        // Salva o card no localStorage
        saveCardToLocalStorage(taskName, taskImage);

        // Limpa o campo do modal e fecha
        taskNameInput.value = '';  // Limpa o campo do nome
        taskImageInput.value = '';  // Limpa o campo da imagem
        closeModal();  // Fecha o modal
    } else {
        alert('Por favor, insira um nome para a tarefa.');
    }
}

// Função para salvar o card no localStorage
function saveCardToLocalStorage(taskName, taskImage) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Cria o card como objeto e salva no localStorage
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        const newCard = {
            name: taskName,
            image: e.target.result || null // Salva o src da imagem
        };
        cards.push(newCard);
        localStorage.setItem('cards', JSON.stringify(cards));

        // Exibe o card na tela
        displayCard(newCard);
    };

    if (taskImage) {
        reader.readAsDataURL(taskImage);
    } else {
        reader.onload({ target: { result: null } });
    }
}

// Função para exibir o card na tela
function displayCard(cardData) {
    // Criar o card dinamicamente
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Adiciona um evento de clique no card para redirecionar para a página de lista de tarefas
    card.addEventListener('click', () => {
        window.location.href = 'to-do-list.html';
    });
    
    // Verificar se uma imagem foi selecionada
    if (cardData.image) {
        const img = document.createElement('img');
        img.src = cardData.image; // Define o src da imagem
        card.appendChild(img);
    }
    
    // Criar o título do card
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = cardData.name;  // Adiciona o nome da tarefa como título
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
        
        // Armazena o card atual a ser deletado
        currentCard = cardData;

        // Exibe o modal de confirmação
        confirmationModal.style.display = 'flex';
    });
    
    card.appendChild(deleteButton);  // Adiciona o botão de deletar ao card
    
    // Adiciona o card à página
    cardsContainer.appendChild(card);
}

// Função para carregar os cards do localStorage
function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.forEach(displayCard); // Exibe cada card
}

// Função para remover um card do localStorage
function removeCardFromLocalStorage(taskName) {
    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards = cards.filter(card => card.name !== taskName); // Filtra o card a ser removido
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Função para fechar o modal de confirmação
function closeConfirmationModal() {
    confirmationModal.style.display = 'none';
}

// Função para confirmar a deletação
function confirmDeletion() {
    if (currentCard) {
        removeCardFromLocalStorage(currentCard.name); // Remove o card do localStorage
        // Remove o card da tela
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (card.querySelector('.card-title').textContent === currentCard.name) {
                card.remove();
            }
        });
    }
    closeConfirmationModal(); // Fecha o modal de confirmação
}

// Vinculando os eventos de clique
addTaskButton.addEventListener('click', openModal);  // Abre o modal ao clicar em "+ Adicionar"
closeModalButton.addEventListener('click', closeModal);  // Fecha o modal ao clicar no botão "Fechar"
saveTaskButton.addEventListener('click', saveTask);  // Salva a tarefa ao clicar no botão "Salvar Tarefa"
cancelDeleteButton.addEventListener('click', closeConfirmationModal);  // Fecha o modal de confirmação sem deletar
confirmDeleteButton.addEventListener('click', confirmDeletion);  // Confirma a deletação do card
