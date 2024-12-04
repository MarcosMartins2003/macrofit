// Importa as funções para teste
const {
    changeWeight,
    changeHeight,
    calculateIMC,
    calculateTMB,
    calculateGET,
  } = require('./new-profile.js'); 
  
  // Mock para manipulação do DOM
  document.body.innerHTML = `
    <div id="weight-display">60kg</div>
    <div id="height-display">170cm</div>
  `;
  
  describe('Testes de funcionalidades principais', () => {
  
    // Teste para a função changeWeight
    test('changeWeight deve alterar o peso exibido no display', () => {
      const weightDisplay = document.getElementById('weight-display');
      changeWeight(5); // Incrementa 5kg
      expect(weightDisplay.textContent).toBe('65kg'); // Verifica o novo valor
  
      changeWeight(-10); // Decrementa 10kg
      expect(weightDisplay.textContent).toBe('55kg'); // Verifica o novo valor
    });
  
    // Teste para a função changeHeight
    test('changeHeight deve alterar a altura exibida no display', () => {
      const heightDisplay = document.getElementById('height-display');
      changeHeight(5); // Incrementa 5cm
      expect(heightDisplay.textContent).toBe('175cm'); // Verifica o novo valor
  
      changeHeight(-10); // Decrementa 10cm
      expect(heightDisplay.textContent).toBe('165cm'); // Verifica o novo valor
    });
  
    // Teste para a função calculateIMC
    test('calculateIMC deve calcular corretamente o IMC', () => {
      const weight = 70; // em kg
      const height = 1.75; // em metros
      const imc = calculateIMC(weight, height);
      expect(imc).toBeCloseTo(22.86, 2); // Verifica o valor aproximado com 2 casas decimais
    });
  
    // Teste para a função calculateTMB
    test('calculateTMB deve calcular corretamente a TMB para homens', () => {
      const weight = 70; // em kg
      const height = 175; // em cm
      const age = 30; // em anos
      const gender = 'male'; // masculino
      const tmb = calculateTMB(weight, height, age, gender);
      expect(tmb).toBeCloseTo(1702.025, 2); // Valor esperado baseado na fórmula
    });
  
    test('calculateTMB deve calcular corretamente a TMB para mulheres', () => {
      const weight = 60; // em kg
      const height = 160; // em cm
      const age = 25; // em anos
      const gender = 'female'; // feminino
      const tmb = calculateTMB(weight, height, age, gender);
      expect(tmb).toBeCloseTo(1407.98, 2); // Valor esperado baseado na fórmula
    });
  
    // Teste para a função calculateGET
    test('calculateGET deve calcular corretamente o Gasto Energético Total', () => {
      const tmb = 1667.5; // Exemplo de TMB
      const activityLevel = 'moderate'; // Nível de atividade física
      const get = calculateGET(tmb, activityLevel);
      expect(get).toBeCloseTo(2584.625, 2); // Valor esperado: TMB * 1.55
    });
  
    test('calculateGET deve usar o multiplicador padrão para níveis desconhecidos', () => {
      const tmb = 1667.5;
      const activityLevel = 'unknown'; // Nível de atividade não reconhecido
      const get = calculateGET(tmb, activityLevel);
      expect(get).toBeCloseTo(2001, 2); // Valor esperado: TMB * 1.2 (sedentário)
    });
  
  });
  