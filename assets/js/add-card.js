// Selecionando elementos necessários
const taskModal = document.getElementById('taskModal');
const closeModalButton = document.getElementById('closeModalButton');
const saveTaskButton = document.getElementById('saveTaskButton');
const taskNameInput = document.getElementById('taskName');
const taskImageInput = document.getElementById('taskImage');
const addTaskButton = document.getElementById('addTaskButton');
const cardsContainer = document.getElementById('cardsContainer');
const confirmationModal = document.getElementById('confirmationModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

let currentCard = null;

// Carregar cards ao carregar a página
document.addEventListener('DOMContentLoaded', loadCards);

// Função para abrir o modal de tarefas
function openModal() {
    taskModal.style.display = 'flex';
}

// Função para fechar o modal de tarefas
function closeModal() {
    taskModal.style.display = 'none';
}

// Função para salvar a tarefa e adicionar o card
function saveTask() {
    const taskName = taskNameInput.value.trim();
    const taskImage = taskImageInput.files[0];

    if (taskName) {
        saveCardToLocalStorage(taskName, taskImage);

        taskNameInput.value = '';
        taskImageInput.value = '';
        closeModal();
    } else {
        alert('Por favor, insira um nome para a tarefa.');
    }
}

// Função para salvar o card no localStorage com um ID único
function saveCardToLocalStorage(taskName, taskImage) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        const newCard = {
            id: Date.now().toString(),  // ID único baseado no timestamp
            name: taskName,
            image: e.target.result || null
        };
        cards.push(newCard);
        localStorage.setItem('cards', JSON.stringify(cards));

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
    const card = document.createElement('div');
    card.classList.add('card');

    // Adiciona um evento de clique no card para redirecionar para a página to-do-list.html com o ID do card
    card.addEventListener('click', () => {
        window.location.href = `to-do-list.html?id=${cardData.id}`;
    });

    if (cardData.image) {
        const img = document.createElement('img');
        img.src = cardData.image;
        card.appendChild(img);
    }

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = cardData.name;
    card.appendChild(cardTitle);

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = 'Ver tarefas ->';
    card.appendChild(cardText);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Deletar';

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        currentCard = cardData;
        confirmationModal.style.display = 'flex';
    });

    card.appendChild(deleteButton);
    cardsContainer.appendChild(card);
}

// Função para carregar os cards do localStorage
function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.forEach(displayCard);
}

// Função para remover um card do localStorage
function removeCardFromLocalStorage(taskName) {
    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards = cards.filter(card => card.name !== taskName);
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Função para fechar o modal de confirmação
function closeConfirmationModal() {
    confirmationModal.style.display = 'none';
}

// Função para confirmar a deletação
function confirmDeletion() {
    if (currentCard) {
        removeCardFromLocalStorage(currentCard.name);
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (card.querySelector('.card-title').textContent === currentCard.name) {
                card.remove();
            }
        });
    }
    closeConfirmationModal();
}

// Vinculando os eventos de clique
addTaskButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
saveTaskButton.addEventListener('click', saveTask);
cancelDeleteButton.addEventListener('click', closeConfirmationModal);
confirmDeleteButton.addEventListener('click', confirmDeletion);
