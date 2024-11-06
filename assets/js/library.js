// Slideshow automático
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Muda a cada 3 segundos
}

// Acordeão (caixas expansivas)
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        const content = item.querySelector('.accordion-content');
        const isOpen = content.style.display === 'block';
        // Fecha todos os conteúdos
        document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
        // Abre ou fecha o conteúdo atual
        content.style.display = isOpen ? 'none' : 'block';
    });
});
