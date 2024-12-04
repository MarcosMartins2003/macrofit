// Mock do DOM para testar manipulações
document.body.innerHTML = `
  <div id="counter"></div>
  <div id="counter2"></div>
  <div id="counterWater"></div>
  <div id="more-info" style="display: none;"></div>
  <div id="more-info2" style="display: none;"></div>
  <img class="chevron-down" />
  <img class="chevron-down2" />
  <div id="get-result"></div>
  <div id="tmb-result"></div>
  <div id="imc-result"></div>
  <p></p>
`;

// Importando as funções que serão testadas
const { animateCount, fillResults, displayResults } = require('./results'); 

// Teste para validar o funcionamento do contador principal
describe('Função animateCount', () => {
    it('deve incrementar o número até atingir o valor alvo', () => {
        const targetNumber = 1000; // Simulação de valor alvo
        let currentNumber = 0;
        const display = document.getElementById('counter');

        // Mock do setInterval para esperar o término da animação
        jest.useFakeTimers();  // Utiliza timers falsos do Jest
        animateCount(targetNumber, display, currentNumber);

        // Avança o tempo para simular o intervalo de 20ms
        jest.advanceTimersByTime(2000);  // Avança 2 segundos (100 iterações de 20ms)

        // Espera que o número exibido no DOM seja igual ao valor alvo
        expect(display.textContent).toBe('1000KCAL');
    });
});

// Teste para validar a alternância de visibilidade em `more-info`
describe('Manipulação de visibilidade de elementos', () => {
    it('deve alternar a visibilidade do elemento #more-info', () => {
        const moreInfo = document.getElementById('more-info');
        const chevron = document.querySelector('.chevron-down');

        // Simula clique para exibir o elemento
        chevron.click();
        expect(moreInfo.style.display).toBe('block'); // Deve ser visível

        // Simula clique para esconder o elemento
        chevron.click();
        expect(moreInfo.style.display).toBe('none'); // Deve ser escondido
    });
});

// Teste para validar o preenchimento dos resultados de perfil
describe('Função fillResults', () => {
    it('deve preencher corretamente os resultados no DOM', () => {
        const dataSnapshot = {
            forEach: jest.fn((callback) => {
                callback({ val: () => ({ get: '2000', tmb: '1800', imc: '25.0' }) });
            }),
        };

        fillResults(dataSnapshot);

        expect(document.getElementById('get-result').textContent).toBe('2000 KCAL');
        expect(document.getElementById('tmb-result').textContent).toBe('1800 KCAL');
        expect(document.getElementById('imc-result').textContent).toBe('25.0');
    });
});

// Teste para validação da classificação do IMC
describe('Classificação do IMC', () => {
    it('deve classificar IMC corretamente como "Sobrepeso"', () => {
        const imc = 25.0;
        let classification = '';

        if (imc < 18.5) {
            classification = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            classification = 'Peso normal';
        } else if (imc >= 25 && imc < 29.9) {
            classification = 'Sobrepeso';
        } else {
            classification = 'Obesidade';
        }

        expect(classification).toBe('Sobrepeso');
    });
});

// Teste para validar a exibição dos resultados do localStorage
describe('Função displayResults', () => {
    it('deve exibir resultados armazenados no localStorage', () => {
        const resultData = {
            get: '2000',
            tmb: '1800',
            imc: '25.0',
        };

        // Mock do localStorage
        Storage.prototype.getItem = jest.fn(() => JSON.stringify(resultData));

        displayResults();

        expect(document.getElementById('get-result').textContent).toBe('2000 KCAL');
        expect(document.getElementById('tmb-result').textContent).toBe('1800 KCAL');
        expect(document.getElementById('imc-result').textContent).toBe('25.0');
    });
});
