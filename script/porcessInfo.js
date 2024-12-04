function processResults() {
    // Obtém o gênero selecionado com base na imagem marcada como "selected"
    var selectedGender = Array.from(document.querySelectorAll('.gender-card')).find(card => {
        const img = card.querySelector('img');
        return img && img.src.includes('selected');
    })?.querySelector('img').alt || 'Não selecionado';

    // Obtém a altura a partir do texto do elemento e converte para número inteiro
    var height = parseInt(document.getElementById('height-display').innerText.replace('cm', ''), 10);

    // Obtém o peso a partir do texto do elemento e converte para número inteiro
    var weight = parseInt(document.getElementById('weight-display').innerText.replace('kg', ''), 10);

    // Obtém o nível de atividade física selecionado com base na classe "selected"
    var selectedActivity = Array.from(document.querySelectorAll('.physical-activity-card'))
        .find(card => card.classList.contains('selected'))?.querySelector('.card-title')?.innerText || 'Não selecionado';

    // Define o fator de atividade com base no nível de atividade selecionado
    let activityFactor;
    switch (selectedActivity.toLowerCase()) {
        case 'sedentário':
            activityFactor = 1.2;
            break;
        case 'levemente ativo':
            activityFactor = 1.375;
            break;
        case 'moderadamente ativo':
            activityFactor = 1.55;
            break;
        case 'muito ativo':
            activityFactor = 1.725;
            break;
        default:
            activityFactor = 1.2; // Valor padrão para casos não tratados
            break;
    }

    // Calcula o IMC (peso dividido pela altura ao quadrado)
    var imc = (weight / ((height / 100) ** 2)).toFixed(2);

    // Calcula a TMB (Taxa Metabólica Basal) com fórmulas diferentes para homens e mulheres
    var tmb;
    if (selectedGender.toLowerCase() === 'masculino') {
        tmb = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * 25)).toFixed(2); // Fórmula masculina
    } else {
        tmb = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * 25)).toFixed(2); // Fórmula feminina
    }

    // Calcula o GET (Gasto Energético Total) multiplicando a TMB pelo fator de atividade
    var get = (tmb * activityFactor).toFixed(2);

    // Cria um objeto com os dados calculados
    var data = {
        gender: selectedGender,
        height: height + 'cm',
        weight: weight + 'kg',
        activity: selectedActivity,
        imc: imc,
        tmb: tmb,
        get: get
    };

    // Armazena os dados no localStorage
    localStorage.setItem('userData', JSON.stringify(data));
    console.log('Dados atualizados com sucesso:', data);

    // Redireciona o usuário para a página de resultados
    window.location.href = './results.html';

    // Atualiza os elementos da página atual (caso necessário) com os resultados
    document.getElementById('get-result').innerText = data.get + ' KCAL';
    document.getElementById('tmb-result').innerText = data.tmb + ' KCAL';
    document.getElementById('imc-result').innerText = data.imc;
}

window.onload = function() {
    // Recupera os dados armazenados no localStorage
    var data = JSON.parse(localStorage.getItem('userData'));

    if (data) {
        // Atualiza os elementos da página com os resultados armazenados
        document.getElementById('get-result').innerText = data.get + ' KCAL';
        document.getElementById('tmb-result').innerText = data.tmb + ' KCAL';
        document.getElementById('imc-result').innerText = data.imc;

        // Determina o status do IMC com base no valor calculado
        var imc = parseFloat(data.imc);
        var imcStatus = '';

        if (imc < 18.5) {
            imcStatus = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            imcStatus = 'Peso normal';
        } else if (imc >= 25 && imc < 29.9) {
            imcStatus = 'Sobrepeso';
        } else {
            imcStatus = 'Obesidade';
        }

        // Exibe o status do IMC abaixo do elemento de resultado
        document.querySelector('#imc-result + p').innerText = imcStatus;
    } else {
        // Exibe um alerta caso os dados não sejam encontrados
        alert('Dados não encontrados');
    }
};
