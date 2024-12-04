// Atualiza o peso exibido no display com base na quantidade fornecida
function changeWeight(quantityToChange) {
    let weightDisplayName = 'weight-display'; // ID do elemento que mostra o peso
    let weightDisplay = document.getElementById(weightDisplayName); // Referência ao elemento HTML
    let currentWeight = parseInt(weightDisplay.textContent, 10); // Pega o peso atual como número
    let newWeight = currentWeight + quantityToChange; // Calcula o novo peso
    weightDisplay.textContent = `${newWeight}kg`; // Atualiza o conteúdo do display
}

// Atualiza a altura exibida no display com base na quantidade fornecida
function changeHeight(quantityToChange) {
    let heightDisplayName = 'height-display'; // ID do elemento que mostra a altura
    let heightDisplay = document.getElementById(heightDisplayName); // Referência ao elemento HTML
    let currentHeight = parseInt(heightDisplay.textContent, 10); // Pega a altura atual como número
    let newHeight = currentHeight + quantityToChange; // Calcula a nova altura
    heightDisplay.textContent = `${newHeight}cm`; // Atualiza o conteúdo do display
}

// Destaca o ícone de seleção quando o mouse passa sobre a opção
function hoverCard(card) {
    const img = card.querySelector('img'); // Seleciona a imagem dentro do cartão
    img.src = './img/icons-check-highlighted.svg'; // Substitui a imagem pelo ícone destacado
}

// Retorna o ícone ao estado padrão quando o mouse sai da opção
function unhoverCard(card) {
    const img = card.querySelector('img'); // Seleciona a imagem dentro do cartão
    if (!card.classList.contains('physical-activity-card-selected')) {
        img.src = './img/icons-check.svg'; // Retorna a imagem ao ícone padrão
    }
}

// Seleciona uma opção de nível de atividade física
function selectCard(card) {
    const cards = document.querySelectorAll('.physical-activity-card, .physical-activity-card-selected');
    
    cards.forEach(c => {
        const img = c.querySelector('img');
        if (c === card) {
            c.classList.add('physical-activity-card-selected', 'selected'); // Define a classe de selecionado
            img.src = './img/icons-check-highlighted.svg'; // Atualiza o ícone para o estado selecionado
        } else {
            c.classList.remove('physical-activity-card-selected', 'selected'); // Remove a classe de selecionado de outros cartões
            img.src = './img/icons-check.svg'; // Atualiza o ícone para o estado padrão
        }
    });
}

// Seleciona o gênero e atualiza a interface visualmente
let selectedCard = null;
function selectGender(currentCard) {
    const img = currentCard.querySelector('.gender-card'); // Referência ao ícone do cartão
    
    if (selectedCard && selectedCard !== currentCard) {
        const previousImg = selectedCard.querySelector('.gender-card');
        previousImg.src = previousImg.src.replace('-selected', ''); // Remove o estado selecionado do ícone anterior
        selectedCard.style.backgroundColor = ''; // Reseta a cor do cartão anterior
    }

    img.src = img.getAttribute('data-selected-src'); // Atualiza o ícone para o estado selecionado

    // Define a cor de fundo com base no gênero selecionado
    currentCard.style.backgroundColor = img.src.includes('female') ? '#EF476F' : '#26547C';

    selectedCard = currentCard; // Salva o cartão selecionado
}

// Atualiza a exibição das páginas com base no dispositivo e no índice salvo
function showElements() {
    const mobileElements = document.querySelectorAll('.mobile-1, .mobile-2, .mobile-3');
    const tabletElements = document.querySelectorAll('.tablet-1, .tablet-2');
    const nextButton = document.querySelector('.next-page-btn');
    const generateButton = document.querySelector('.generate-btn');

    const isTablet = window.innerWidth >= 375 && window.innerWidth <= 768;
    const isDesktop = window.innerWidth > 768;

    const mobileIndex = parseInt(localStorage.getItem('mobile-page-index')) || 0;
    const tabletIndex = parseInt(localStorage.getItem('tablet-page-index')) || 0;

    // Configuração para dispositivos móveis
    if (!isTablet) {
        mobileElements.forEach(element => {
            element.style.display = element.classList.contains(`mobile-${mobileIndex + 1}`) ? 'flex' : 'none';
        });

        nextButton.style.display = mobileIndex === 2 ? 'none' : 'flex';
        generateButton.style.display = mobileIndex === 2 ? 'flex' : 'none';
    }

    // Configuração para tablets
    if (isTablet) {
        tabletElements.forEach(element => {
            element.style.display = element.classList.contains(`tablet-${tabletIndex + 1}`) ? 'flex' : 'none';
        });

        nextButton.style.display = tabletIndex === 1 ? 'none' : 'flex';
        generateButton.style.display = tabletIndex === 1 ? 'flex' : 'none';
    }

    // Configuração para desktops
    if (isDesktop) {
        mobileElements.forEach(element => element.style.display = 'flex');
        tabletElements.forEach(element => element.style.display = 'flex');
        nextButton.style.display = 'none';
        generateButton.style.display = 'flex';
    }
}

// Avança para a próxima página de informações
function nextPage() {
    const isTablet = window.innerWidth >= 375 && window.innerWidth <= 768;

    let currentIndex = parseInt(localStorage.getItem(isTablet ? 'tablet-page-index' : 'mobile-page-index')) || 0;
    currentIndex = (currentIndex + 1) % (isTablet ? 2 : 3); // Incrementa e reseta o índice
    localStorage.setItem(isTablet ? 'tablet-page-index' : 'mobile-page-index', currentIndex);

    showElements(); // Atualiza a exibição
}

// Funções para cálculo de IMC, TMB e GET (Gasto Energético Total)
function calculateIMC(weight, height) {
    return weight / (height * height); // Altura em metros
}

function calculateTMB(weight, height, age, gender) {
    return gender === 'male'
        ? 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
        : 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
}

function calculateGET(tmb, activityLevel) {
    const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        intense: 1.725,
        veryIntense: 1.9
    };
    return tmb * (multipliers[activityLevel] || 1.2); // Default é sedentário
}

// Calcula o perfil com base nos dados fornecidos
function calculateProfile() {
    const weight = parseInt(document.getElementById('weight-display').textContent, 10);
    const height = parseInt(document.getElementById('height-display').textContent, 10);
    const age = parseInt(document.getElementById('age-display').textContent, 10);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activityLevel = document.querySelector('input[name="activity"]:checked').value;

    const imc = calculateIMC(weight, height / 100);
    const tmb = calculateTMB(weight, height, age, gender);
    const get = calculateGET(tmb, activityLevel);

    localStorage.setItem('imc', imc.toFixed(2));
    localStorage.setItem('tmb', tmb.toFixed(2));
    localStorage.setItem('get', get.toFixed(2));

    window.location = './results.html';
}

// Inicialização da interface
document.addEventListener('DOMContentLoaded', showElements);
window.addEventListener('resize', showElements);
document.querySelector('.generate-btn')?.addEventListener('click', calculateProfile);

module.exports = {
    changeWeight,
    changeHeight,
    calculateIMC,
    calculateTMB,
    calculateGET,
    calculateProfile
  };