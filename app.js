/* ========================= */
/* ARQUIVO: app.js */
/* ========================= */

/* FORMATAR MOEDA */

function moeda(valor){

  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

}

/* ========================= */
/* CALCULAR TABELA */
/* ========================= */

function calcularTabela(km, valorKm, media, diesel){

  const frete =
    km * valorKm;

  const litros =
    km / media;

  const custoDiesel =
    litros * diesel;

  const percentual =
    (custoDiesel / frete) * 100;

  return {

    frete,
    litros,
    custoDiesel,
    percentual

  };

}

/* ========================= */
/* CALCULAR TUDO */
/* ========================= */

function calcularTudo(){

  /* ========================= */
  /* MOTORISTA */
  /* ========================= */

  const kmMotorista =
    Number(
      document.getElementById('kmMotorista').value
    );

  const valorKmMotorista =
    Number(
      document.getElementById('valorKmMotorista').value
    );

  const mediaMotorista =
    Number(
      document.getElementById('veiculoMotorista').value
    );

  const dieselMotorista =
    Number(
      document.getElementById('dieselMotorista').value
    );

  /* ========================= */
  /* CLIENTE */
  /* ========================= */

  const kmCliente =
    Number(
      document.getElementById('kmCliente').value
    );

  const valorKmCliente =
    Number(
      document.getElementById('valorKmCliente').value
    );

  const mediaCliente =
    Number(
      document.getElementById('veiculoCliente').value
    );

  const dieselCliente =
    Number(
      document.getElementById('dieselCliente').value
    );

  /* ========================= */
  /* CALCULOS */
  /* ========================= */

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

  /* ========================= */
  /* RESULTADOS MOTORISTA */
  /* ========================= */

  document.getElementById('freteMotorista').innerText =
    moeda(motorista.frete);

  document.getElementById('custoMotorista').innerText =
    moeda(motorista.custoDiesel);

  document.getElementById('litrosMotorista').innerText =
    motorista.litros.toFixed(1) + ' L';

  document.getElementById('percentualMotorista').innerText =
    motorista.percentual.toFixed(1) + '%';

  /* ========================= */
  /* RESULTADOS CLIENTE */
  /* ========================= */

  document.getElementById('freteCliente').innerText =
    moeda(cliente.frete);

  document.getElementById('custoCliente').innerText =
    moeda(cliente.custoDiesel);

  document.getElementById('litrosCliente').innerText =
    cliente.litros.toFixed(1) + ' L';

  document.getElementById('percentualCliente').innerText =
    cliente.percentual.toFixed(1) + '%';

  /* ========================= */
  /* COMISSÃO */
  /* ========================= */

  const comissao =
    cliente.frete - motorista.frete;

  document.getElementById('comissaoEmpresa').innerText =
    moeda(comissao);

}

/* ========================= */
/* LIMPAR CAMPOS */
/* ========================= */

function limparCampos(){

  const inputs =
    document.querySelectorAll('input');

  inputs.forEach(input => {

    input.value = '';

  });

  calcularTudo();

}

/* ========================= */
/* SALVAR COTAÇÃO */
/* ========================= */

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

  alert('Cotação salva com sucesso!');

}

/* ========================= */
/* WHATSAPP */
/* ========================= */

function enviarWhatsapp(){

  calcularTudo();

  const texto = `

🚛 *COTAÇÃO DE FRETE*

━━━━━━━━━━

🚚 MOTORISTA

📍 KM:
${document.getElementById('kmMotorista').value}

💰 FRETE:
${document.getElementById('freteMotorista').innerText}

⛽ DIESEL:
${document.getElementById('custoMotorista').innerText}

━━━━━━━━━━

💵 CLIENTE

📍 KM:
${document.getElementById('kmCliente').value}

💰 FRETE:
${document.getElementById('freteCliente').innerText}

⛽ DIESEL:
${document.getElementById('custoCliente').innerText}

━━━━━━━━━━

📊 COMISSÃO EMPRESA

${document.getElementById('comissaoEmpresa').innerText}

━━━━━━━━━━

Sistema Prime

`;

  const url =
    `https://wa.me/?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');

}

/* ========================= */
/* CARREGAR DADOS */
/* ========================= */

window.onload = function(){

  const dados =
    JSON.parse(
      localStorage.getItem('cotacaoPrime')
    );

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

  /* ========================= */
  /* CALCULO AUTOMATICO */
  /* ========================= */

  const campos =
    document.querySelectorAll('input, select');

  campos.forEach(campo => {

    campo.addEventListener('input', () => {

      calcularTudo();

    });

  });

  /* ========================= */
  /* CALCULAR AO ABRIR */
  /* ========================= */

  calcularTudo();

}
