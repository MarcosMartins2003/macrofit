// Define o número alvo para a animação do contador de calorias e inicializa variáveis
const targetNumber = 2263; 
const display = document.getElementById('counter');
let currentNumber = 0;

// Função para animar a contagem do primeiro contador
function animateCount() {
    const increment = Math.ceil(targetNumber / 100); // Define o incremento para a animação
    const interval = setInterval(() => {
        currentNumber += increment; // Incrementa o número atual
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber; // Garante que o número não ultrapasse o alvo
            clearInterval(interval); // Para a animação
        }
        display.textContent = `${currentNumber}KCAL`; // Atualiza o elemento HTML com o valor atual
    }, 20); // Intervalo de 20ms para a atualização
}

// Configuração similar para o segundo contador
const targetNumber2 = 1890; 
const display2 = document.getElementById('counter2');
let currentNumber2 = 0;

function animateCount2() {
    const increment = Math.ceil(targetNumber2 / 100);
    const interval = setInterval(() => {
        currentNumber2 += increment;
        if (currentNumber2 >= targetNumber2) {
            currentNumber2 = targetNumber2;
            clearInterval(interval);
        }
        display2.textContent = `${currentNumber2}KCAL`;
    }, 20);
}

// Adiciona funcionalidade ao botão "chevron-down"
document.querySelector('.chevron-down').addEventListener('click', function () {
    var moreInfo = document.getElementById('more-info');
    var chevron = document.querySelector('.chevron-down');
    
    // Alterna a visibilidade do conteúdo e altera o ícone do botão
    if (moreInfo.style.display === 'none') {
      moreInfo.style.display = 'block';
      chevron.src = 'img/lucide-chevron-down-11.svg';
    } else {
      moreInfo.style.display = 'none';
      chevron.src = 'img/lucide-chevron-down1.svg';
    }
});

// Configuração similar para outro botão "chevron-down2"
document.querySelector('.chevron-down2').addEventListener('click', function () {
    var moreInfo = document.getElementById('more-info2');
    var chevron = document.querySelector('.chevron-down2');
    
    if (moreInfo.style.display === 'none') {
      moreInfo.style.display = 'block';
      chevron.src = 'img/lucide-chevron-down-11.svg';
    } else {
      moreInfo.style.display = 'none';
      chevron.src = 'img/lucide-chevron-down1.svg';
    }
});

// Contador de consumo de água
let targetWater = 3; // Meta em litros
let counter = 0; // Inicializa o contador
const counterElement = document.getElementById('counterWater');

// Incrementa o contador de água
function incrementCounter() {
    if (counter < targetWater) {
        counter += 1;
        counterElement.textContent = counter + 'L'; // Atualiza o elemento HTML
    }
}

// Incrementa o contador automaticamente até atingir a meta
const interval = setInterval(() => {
    incrementCounter();
    if (counter >= targetWater) {
        clearInterval(interval); // Para o incremento quando a meta é alcançada
    }
}, 400);

// Preenche uma lista de tarefas com dados recebidos de uma fonte de dados
function fillTodoList(dataSnapshot) {
    dataSnapshot.forEach(function(item) {
        var value = item.val();
        var li = document.createElement('li');
        var spanLi = document.createElement('span');
        spanLi.appendChild(document.createTextNode(value.name)); // Adiciona o nome do item na lista
        li.appendChild(spanLi);
        ulTodoList.appendChild(li); // Adiciona o item na lista não ordenada
    });
}

// Preenche os resultados com dados de uma fonte e classifica o IMC
function fillResults(dataSnapshot) {
    dataSnapshot.forEach(function(item) {
        var value = item.val();
        var get = value.get || 'Não disponível';
        var tmb = value.tmb || 'Não disponível';
        var imc = value.imc || 'Não disponível';

        document.getElementById('get-result').textContent = get + ' KCAL';
        document.getElementById('tmb-result').textContent = tmb + ' KCAL';
        document.getElementById('imc-result').textContent = imc;

        var imcClassification = '';
        if (imc < 18.5) {
            imcClassification = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            imcClassification = 'Peso normal';
        } else if (imc >= 25 && imc < 29.9) {
            imcClassification = 'Sobrepeso';
        } else {
            imcClassification = 'Obesidade';
        }

        var imcClassificationElement = document.querySelector('#imc-result + p');
        if (imcClassificationElement) {
            imcClassificationElement.textContent = imcClassification; // Exibe a classificação do IMC
        }
    });
}

// Recupera e exibe os resultados armazenados no localStorage
function displayResults() {
    var resultData = JSON.parse(localStorage.getItem('profileResults'));
    if (resultData) {
        document.getElementById('get-result').textContent = resultData.get + ' KCAL';
        document.getElementById('tmb-result').textContent = resultData.tmb + ' KCAL';
        document.getElementById('imc-result').textContent = resultData.imc;

        var imcClassification = '';
        if (parseFloat(resultData.imc) < 18.5) {
            imcClassification = 'Abaixo do peso';
        } else if (parseFloat(resultData.imc) >= 18.5 && parseFloat(resultData.imc) < 24.9) {
            imcClassification = 'Peso normal';
        } else if (parseFloat(resultData.imc) >= 25 && parseFloat(resultData.imc) < 29.9) {
            imcClassification = 'Sobrepeso';
        } else {
            imcClassification = 'Obesidade';
        }

        var imcClassificationElement = document.querySelector('#imc-result + p');
        if (imcClassificationElement) {
            imcClassificationElement.textContent = imcClassification;
        }
    } else {
        console.error('Nenhum dado encontrado no localStorage');
    }
}

// Evento que ocorre ao carregar a página
window.onload = function() {
    displayResults(); // Exibe os resultados armazenados
    animateCount(); // Inicia a animação do primeiro contador
    animateCount2(); // Inicia a animação do segundo contador
    incrementCounter(); // Atualiza o contador de água
};
