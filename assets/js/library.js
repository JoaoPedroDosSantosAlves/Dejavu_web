let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}




setInterval(nextSlide, 3000); // Altere o valor para ajustar o intervalo do slide (em milissegundos)
showSlide(slideIndex);
