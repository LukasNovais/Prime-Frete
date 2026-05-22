/* ========================= */
/* ARQUIVO: app.js */
/* ========================= */

/* FORMATAR DINHEIRO */

function moeda(valor){

  return valor.toLocaleString('pt-BR', {
    style:'currency',
    currency:'BRL'
  });

}

/* CALCULAR TABELA */

function calcularTabela(km, valorKm, media, diesel){

  const frete = km * valorKm;

  const litros = km / media;

  const custoDiesel = litros * diesel;

  const percentual = (custoDiesel / frete) * 100;

  return {
    frete,
    litros,
    custoDiesel,
    percentual
  };

}

/* CALCULAR TUDO */

function calcularTudo(){

  /* MOTORISTA */

  const kmMotorista =
    Number(document.getElementById('kmMotorista').value);

  const valorKmMotorista =
    Number(document.getElementById('valorKmMotorista').value);

  const mediaMotorista =
    Number(document.getElementById('veiculoMotorista').value);

  const dieselMotorista =
    Number(document.getElementById('dieselMotorista').value);

  /* CLIENTE */

  const kmCliente =
    Number(document.getElementById('kmCliente').value);

  const valorKmCliente =
    Number(document.getElementById('valorKmCliente').value);

  const mediaCliente =
    Number(document.getElementById('veiculoCliente').value);

  const dieselCliente =
    Number(document.getElementById('dieselCliente').value);

  /* CALCULOS */

  const motorista =
    calcularTabela(
      kmMotorista,
      valorKmMotorista,
      mediaMotorista,
      dieselMotorista
    );

  const cliente =
    calcularTabela(
      kmCliente,
      valorKmCliente,
      mediaCliente,
      dieselCliente
    );

  /* RESULTADOS MOTORISTA */

  document.getElementById('freteMotorista').innerText =
    moeda(motorista.frete);

  document.getElementById('custoMotorista').innerText =
    moeda(motorista.custoDiesel);

  document.getElementById('litrosMotorista').innerText =
    motorista.litros.toFixed(1) + ' L';

  document.getElementById('percentualMotorista').innerText =
    motorista.percentual.toFixed(1) + '%';

  /* RESULTADOS CLIENTE */

  document.getElementById('freteCliente').innerText =
    moeda(cliente.frete);

  document.getElementById('custoCliente').innerText =
    moeda(cliente.custoDiesel);

  document.getElementById('litrosCliente').innerText =
    cliente.litros.toFixed(1) + ' L';

  document.getElementById('percentualCliente').innerText =
    cliente.percentual.toFixed(1) + '%';

  /* COMISSÃO */

  const comissao =
    cliente.frete - motorista.frete;

  document.getElementById('comissaoEmpresa').innerText =
    moeda(comissao);

}

/* LIMPAR */

function limparCampos(){

  const inputs =
    document.querySelectorAll('input');

  inputs.forEach(input => {
    input.value = '';
  });

}

/* SALVAR */

function salvarCotacao(){

  const dados = {

    kmMotorista:
      document.getElementById('kmMotorista').value,

    valorKmMotorista:
      document.getElementById('valorKmMotorista').value,

    dieselMotorista:
      document.getElementById('dieselMotorista').value,

    kmCliente:
      document.getElementById('kmCliente').value,

    valorKmCliente:
      document.getElementById('valorKmCliente').value,

    dieselCliente:
      document.getElementById('dieselCliente').value

  };

  localStorage.setItem(
    'cotacaoPrime',
    JSON.stringify(dados)
  );

  alert('Cotação salva!');

}

/* WHATSAPP */

function enviarWhatsapp(){

  calcularTudo();

  const texto = `

🚛 *COTAÇÃO DE FRETE*

📍 KM MOTORISTA:
${document.getElementById('kmMotorista').value}

💰 FRETE MOTORISTA:
${document.getElementById('freteMotorista').innerText}

━━━━━━━━━━

📍 KM CLIENTE:
${document.getElementById('kmCliente').value}

💵 FRETE CLIENTE:
${document.getElementById('freteCliente').innerText}

━━━━━━━━━━

📊 COMISSÃO:
${document.getElementById('comissaoEmpresa').innerText}

`;

  const url =
    `https://wa.me/?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');

}

/* CARREGAR DADOS */

window.onload = function(){

  const dados =
    JSON.parse(localStorage.getItem('cotacaoPrime'));

  if(dados){

    document.getElementById('kmMotorista').value =
      dados.kmMotorista;

    document.getElementById('valorKmMotorista').value =
      dados.valorKmMotorista;

    document.getElementById('dieselMotorista').value =
      dados.dieselMotorista;

    document.getElementById('kmCliente').value =
      dados.kmCliente;

    document.getElementById('valorKmCliente').value =
      dados.valorKmCliente;

    document.getElementById('dieselCliente').value =
      dados.dieselCliente;

  }

}