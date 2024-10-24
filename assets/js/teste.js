const addTaskButton = document.getElementById('addTaskButton');
const taskModal = document.getElementById('taskModal');
const closeModalButton = document.getElementById('closeModalButton');
const saveTaskButton = document.getElementById('saveTaskButton');
const cardsContainer = document.getElementById('cardsContainer');

document.querySelectorAll('.sidebar button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');
    });
});


// Função para salvar cards no localStorage
function saveCards() {
    const cards = Array.from(cardsContainer.children).map(card => ({
        title: card.querySelector('.card-title').innerText,
        text: card.querySelector('.card-text').innerText,
        imgSrc: card.querySelector('img') ? card.querySelector('img').src : null
    }));
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Função para carregar os cards do localStorage
function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const fixedCardIds = Array.from(cardsContainer.children).map(card => card.querySelector('.card-title').innerText);

    cards.forEach(({ title, text, imgSrc }) => {
        if (!fixedCardIds.includes(title)) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                ${imgSrc ? `<img src="${imgSrc}" alt="Imagem">` : ''}
                <h2 class="card-title">${title}</h2>
                <p class="card-text">${text}</p>
                <button class="delete-button">Deletar</button>
            `;

            // Adiciona o evento de clique no card
            card.onclick = () => {
                window.location.href = 'to-do-list.html'; // Redireciona para a página de lista de tarefas
            };

            cardsContainer.appendChild(card);
            
            const deleteButton = card.querySelector('.delete-button');
            deleteButton.onclick = (event) => {
                event.stopPropagation(); // Impede o redirecionamento ao clicar no botão de deletar
                cardsContainer.removeChild(card);
                saveCards(); // Atualiza o localStorage após deletar
            };
        }
    });
}

// Adiciona eventos de clique para os cards fixos já existentes
document.querySelectorAll('.card[data-fixed="true"]').forEach(card => {
    card.onclick = () => {
        window.location.href = 'to-do-list.html'; // Redireciona para a página de lista de tarefas
    };
});

addTaskButton.onclick = () => {
    taskModal.style.display = 'flex';
};

closeModalButton.onclick = () => {
    taskModal.style.display = 'none';
};

saveTaskButton.onclick = () => {
    const taskName = document.getElementById('taskName').value;
    const taskImage = document.getElementById('taskImage').files[0];

    if (taskName) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardContent = `
            <h2 class="card-title">${taskName}</h2>
            <p class="card-text">Ver tarefas -></p>
            <button class="delete-button">Deletar</button>
        `;

        if (taskImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                card.innerHTML = `
                    <img src="${e.target.result}" alt="Imagem">
                    ${cardContent}
                `;
                cardsContainer.appendChild(card);
                taskModal.style.display = 'none';
                saveCards(); // Salva os cards no localStorage
            };
            reader.readAsDataURL(taskImage);
        } else {
            card.innerHTML = cardContent;
            cardsContainer.appendChild(card);
            taskModal.style.display = 'none';
            saveCards(); // Salva os cards no localStorage
        }

        // Adiciona o evento de clique no novo card
        card.onclick = () => {
            window.location.href = 'to-do-list.html'; // Redireciona para a página de lista de tarefas
        };

        const deleteButton = card.querySelector('.delete-button');
        deleteButton.onclick = (event) => {
            event.stopPropagation(); // Impede o redirecionamento ao clicar no botão de deletar
            cardsContainer.removeChild(card);
            saveCards(); // Atualiza o localStorage após deletar
        };

        // Limpa os campos do modal
        document.getElementById('taskName').value = '';
        document.getElementById('taskImage').value = '';
    }
};

window.onclick = function(event) {
    if (event.target === taskModal) {
        taskModal.style.display = 'none';
    }
};

loadCards();

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Impede a navegação imediata
        const href = link.getAttribute('href');

        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.nav-button').forEach(button => {
            button.classList.remove('active');
        });

        // Adiciona a classe 'active' ao botão clicado
        link.querySelector('.nav-button').classList.add('active');

        // Aguarda um segundo e redireciona
        setTimeout(() => {
            window.location.href = href;
        }, 100); // Redireciona após um breve atraso
    });
});

// Para os botões sem link, adicione o evento diretamente
document.querySelectorAll('.sidebar .nav-button:not(a .nav-button)').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');
    });
});

