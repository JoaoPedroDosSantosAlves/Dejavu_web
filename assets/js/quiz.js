const quizData = [
    {
        question: "Qual é a melhor prática para começar o dia de forma produtiva?",
        options: [
            "Deixar tarefas para mais tarde",
            "Fazer uma lista de tarefas",
            "Ver redes sociais",
            "Dormir até tarde"
        ],
        answer: 1
    },
    {
        question: "Qual dessas opções ajuda a manter o foco nas tarefas?",
        options: [
            "Trabalhar com pausas frequentes",
            "Ouvir música alta",
            "Realizar várias tarefas ao mesmo tempo",
            "Deixar o celular sempre ao lado"
        ],
        answer: 0
    },
    {
        question: "Qual é uma boa estratégia para melhorar a organização?",
        options: [
            "Anotar compromissos importantes",
            "Evitar planejar",
            "Focar apenas no trabalho",
            "Ignorar prazos"
        ],
        answer: 0
    },
    {
        question: "O que é essencial para uma boa gestão de tempo?",
        options: [
            "Deixar tudo para última hora",
            "Planejar suas atividades com antecedência",
            "Ficar o dia todo sem parar",
            "Fazer várias coisas ao mesmo tempo"
        ],
        answer: 1
    },
    
    {
        question: "Qual é uma boa prática para melhorar a qualidade do trabalho?",
        options: [
            "Fazer as tarefas sem revisar",
            "Revisar e planejar antes de começar",
            "Ignorar prazos e fazer tudo de última hora",
            "Focar em várias tarefas ao mesmo tempo"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    document.getElementById("question").innerText = questionData.question;
    const options = document.querySelectorAll(".option");
    options.forEach((option, index) => {
        option.innerText = questionData.options[index];
        option.classList.remove("selected", "correct", "incorrect");
    });
}

function selectAnswer(index) {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.classList.remove("selected"));
    options[index].classList.add("selected");

    // Verifica se a resposta selecionada está correta ou errada
    if (index === quizData[currentQuestion].answer) {
        options[index].classList.add("correct"); // Adiciona verde (correta)
        score++;
    } else {
        options[index].classList.add("incorrect"); // Adiciona vermelho (errada)
    }

    // Aguardar 1 segundo e avançar para a próxima pergunta
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000); // 1 segundo de delay antes de ir para a próxima pergunta
}




function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").innerText = score + "/" + quizData.length;  // Corrige a exibição da pontuação
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    loadQuestion();
}

// Inicializa o quiz ao carregar a página
window.onload = loadQuestion;
