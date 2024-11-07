// Seleciona o container do carrossel e os itens
const carousel = document.querySelector('.carousel');
const membros = document.querySelectorAll('.membro');

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let currentIndex = 0;

// Definir a largura do item do carrossel dinamicamente
const slideWidth = membros[0].offsetWidth;
const totalSlides = membros.length;

// Função para avançar o slide
function goToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    currentTranslate = -currentIndex * slideWidth;
    setCarouselPosition();
}

// Função para voltar ao slide anterior
function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    currentTranslate = -currentIndex * slideWidth;
    setCarouselPosition();
}

// Função para definir a posição do carrossel
function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

// MouseDown (Início do arrasto)
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.pageX - carousel.offsetLeft;
    previousTranslate = currentTranslate;
});

// MouseMove (Movimento durante o arrasto)
carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.pageX - carousel.offsetLeft;
    const diff = currentPosition - startPosition;
    currentTranslate = previousTranslate + diff;
    setCarouselPosition();
});

// MouseUp (Fim do arrasto)
carousel.addEventListener('mouseup', () => {
    isDragging = false;
    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -100 && currentIndex < totalSlides - 1) {
        goToNextSlide();
    }
    if (movedBy > 100 && currentIndex > 0) {
        goToPrevSlide();
    }
});

// MouseLeave (Para evitar bugs ao sair da área do carrossel durante o arrasto)
carousel.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
    }
});

// Botões de navegação
document.querySelector('.carousel-nav.left').addEventListener('click', goToPrevSlide);
document.querySelector('.carousel-nav.right').addEventListener('click', goToNextSlide);
