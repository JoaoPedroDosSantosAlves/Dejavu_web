const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

let currentIndex = 0; // Para rastrear a imagem atual no carrossel

// Função para adicionar a classe 'active' aos inputs ao focar
inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value !== "") return;
    inp.classList.remove("active");
  });
});

// Função para alternar entre modo de login e cadastro
toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

// Função para mover o slider manualmente via bullets
function moveSlider(index) {
  let currentImage = document.querySelector(`.img-${index}`);

  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  bullets[index - 1].classList.add("active");
}

// Adiciona evento de clique às bullets
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    clearInterval(autoSlide); // Para o slide automático ao clicar manualmente
    moveSlider(index + 1);    // Move o slider para o índice correto
    startAutoSlide();         // Reinicia o slide automático após interação manual
  });
});

// Função para mudar o slider automaticamente
function autoMoveSlider() {
  currentIndex = (currentIndex + 1) % images.length; // Atualiza o índice de forma cíclica
  moveSlider(currentIndex + 1); // Muda a imagem no carrossel
}

// Função para iniciar o carrossel automático
let autoSlide;
function startAutoSlide() {
  autoSlide = setInterval(autoMoveSlider, 3000); // Troca de imagem a cada 3 segundos
}

// Inicia o carrossel automático ao carregar a página
startAutoSlide();

