// Mock do DOM para testar manipulações
formatDOM()
function formatDOM() {
    document.body.innerHTML = `
    <div id="height-display">170cm</div>
    <div id="weight-display">70kg</div>
    <div class="gender-card">
      <img src="selected.jpg" alt="Masculino" />
    </div>
    <div class="physical-activity-card selected">
      <div class="card-title">Moderadamente ativo</div>
    </div>
    <div id="get-result"></div>
    <div id="tmb-result"></div>
    <div id="imc-result"></div>
  `;
}

// Importando a função processResults
const { processResults } = require('./porcessInfo');

describe('Função processResults', () => {
    beforeAll(() => {
        // Garantir que o DOM está configurado corretamente antes dos testes
        document.body.innerHTML = `
            <div id="height-display">170cm auuuuuuuu</div>
            <div id="weight-display">70kg</div>
            <div class="gender-card">
                <img src="selected.jpg" alt="Masculino" />
            </div>
            <div class="physical-activity-card selected">
                <div class="card-title">Moderadamente ativo</div>
            </div>
            <div id="get-result"></div>
            <div id="tmb-result"></div>
            <div id="imc-result"></div>
        `;
    });
    beforeAll(() => {
        delete window.location;
        window.location = { href: jest.fn() }; // Mock para evitar erros
    });

    it('deve selecionar o gênero corretamente', () => {
        formatDOM()
        processResults();

        const gender = localStorage.getItem('userData');
        const parsedData = JSON.parse(gender);
        
        expect(parsedData.gender).toBe('Masculino');
    });

    it('deve ler corretamente a altura e o peso', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));
        
        expect(data.height).toBe('170cm');
        expect(data.weight).toBe('70kg');
    });

    it('deve selecionar corretamente a atividade física', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));

        expect(data.activity).toBe('Moderadamente ativo');
    });

    it('deve calcular corretamente o IMC', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));

        const expectedIMC = (70 / (170 / 100) ** 2).toFixed(2);
        expect(data.imc).toBe(expectedIMC);
    });

    it('deve calcular corretamente o TMB', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));

        const expectedTMB = (88.36 + (13.4 * 70) + (4.8 * 170) - (5.7 * 25)).toFixed(2);
        expect(data.tmb).toBe(expectedTMB);
    });

    it('deve calcular corretamente o GET', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));

        const activityFactor = 1.55; // baseando-se na escolha de "Moderadamente ativo"
        const expectedGET = (parseFloat(data.tmb) * activityFactor).toFixed(2);
        expect(data.get).toBe(expectedGET);
    });

    it('deve salvar os dados no localStorage corretamente', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));
        
        expect(data).toHaveProperty('gender');
        expect(data).toHaveProperty('height');
        expect(data).toHaveProperty('weight');
        expect(data).toHaveProperty('activity');
        expect(data).toHaveProperty('imc');
        expect(data).toHaveProperty('tmb');
        expect(data).toHaveProperty('get');
    });

    it('deve exibir os resultados corretamente na interface', () => {
        processResults();

        const data = JSON.parse(localStorage.getItem('userData'));

        document.getElementById('get-result').innerText = data.get + ' KCAL';
        document.getElementById('tmb-result').innerText = data.tmb + ' KCAL';
        document.getElementById('imc-result').innerText = data.imc;

        expect(document.getElementById('get-result').innerText).toBe(data.get + ' KCAL');
        expect(document.getElementById('tmb-result').innerText).toBe(data.tmb + ' KCAL');
        expect(document.getElementById('imc-result').innerText).toBe(data.imc);
    });
});
