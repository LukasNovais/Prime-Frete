/* ========================= */
/* FORMATAR MOEDA */
/* ========================= */

function moeda(valor){

  return valor.toLocaleString('pt-BR',{
    style:'currency',
    currency:'BRL'
  });

}

/* ========================= */
/* ARREDONDAR */
/* ========================= */

function arredondarBaixo(valor){

  return Math.floor(valor);

}

function arredondarCima(valor){

  return Math.ceil(valor);

}

/* ========================= */
/* CALCULAR FRETE */
/* ========================= */

function calcularFrete(custoDiesel, percentual, tipo){

  let frete = 0;

  if(tipo === 'baixo'){

    frete =
      arredondarBaixo(
        custoDiesel / percentual
      );

  }else{

    frete =
      arredondarCima(
        custoDiesel / percentual
      );

  }

  return frete;

}

/* ========================= */
/* CALCULAR TUDO */
/* ========================= */

function calcularTudo(){

  /* ========================= */
  /* MOTORISTA */
  /* ========================= */

  const km =
    Number(
      document.getElementById('kmMotorista').value
    );

  const media =
    Number(
      document.getElementById('veiculoMotorista').value
    );

  const dieselMotorista =
    Number(
      document.getElementById('dieselMotorista').value
    );

  const dieselCliente =
    Number(
      document.getElementById('dieselCliente').value
    );

  /* ========================= */
  /* COPIAR */
  /* ========================= */

  document.getElementById('kmCliente').value =
    km;

  document.getElementById('veiculoCliente').selectedIndex =
    document.getElementById('veiculoMotorista').selectedIndex;

  /* ========================= */
  /* DIESEL */
  /* ========================= */

  const litros =
    media > 0
      ? km / media
      : 0;

  /* ========================= */
  /* CUSTO MOTORISTA */
  /* ========================= */

  const custoMotorista =
    litros * dieselMotorista;

  const freteMotorista =
    calcularFrete(
      custoMotorista,
      0.35,
      'baixo'
    );

  const valorKmMotorista =
    km > 0
      ? freteMotorista / km
      : 0;

  /* ========================= */
  /* CUSTO CLIENTE */
  /* ========================= */

  const custoCliente =
    litros * dieselCliente;

  const freteCliente =
    calcularFrete(
      custoCliente,
      0.33,
      'cima'
    );

  const valorKmCliente =
    km > 0
      ? freteCliente / km
      : 0;

  /* ========================= */
  /* RESULTADOS MOTORISTA */
  /* ========================= */

  document.getElementById('valorKmMotorista').value =
    valorKmMotorista.toFixed(2);

  document.getElementById('freteMotorista').innerText =
    moeda(freteMotorista);

  document.getElementById('custoMotorista').innerText =
    moeda(custoMotorista);

  document.getElementById('litrosMotorista').innerText =
    litros.toFixed(1) + ' L';

  document.getElementById('percentualMotorista').innerText =
    '35%';

  /* ========================= */
  /* RESULTADOS CLIENTE */
  /* ========================= */

  document.getElementById('valorKmCliente').value =
    valorKmCliente.toFixed(2);

  document.getElementById('freteCliente').innerText =
    moeda(freteCliente);

  document.getElementById('custoCliente').innerText =
    moeda(custoCliente);

  document.getElementById('litrosCliente').innerText =
    litros.toFixed(1) + ' L';

  document.getElementById('percentualCliente').innerText =
    '33%';

  /* ========================= */
  /* COMISSAO */
  /* ========================= */

  const comissao =
    freteCliente - freteMotorista;

  document.getElementById('comissaoEmpresa').innerText =
    moeda(comissao);

}

/* ========================= */
/* LIMPAR */
/* ========================= */

function limparCampos(){

  document
    .querySelectorAll('input')
    .forEach(input=>{

      input.value='';

    });

  calcularTudo();

}

/* ========================= */
/* SALVAR */
/* ========================= */

function salvarCotacao(){

  const historico =
    JSON.parse(
      localStorage.getItem('historicoPrime')
    ) || [];

  historico.push({

    data:
      new Date().toLocaleString(),

    km:
      document.getElementById('kmMotorista').value,

    motorista:
      document.getElementById('freteMotorista').innerText,

    cliente:
      document.getElementById('freteCliente').innerText

  });

  localStorage.setItem(
    'historicoPrime',
    JSON.stringify(historico)
  );

  alert('Cotação salva');

  limparCampos();

}

/* ========================= */
/* COMPARTILHAR */
/* ========================= */

async function compartilharCliente(){

  const texto =
`💰 COTAÇÃO FRETE

KM: ${document.getElementById('kmCliente').value}

Valor:
${document.getElementById('freteCliente').innerText}`;

  if(navigator.share){

    await navigator.share({

      text:texto

    });

  }

}

async function compartilharMotorista(){

  const texto =
`🚚 FRETE MOTORISTA

KM: ${document.getElementById('kmMotorista').value}

Valor:
${document.getElementById('freteMotorista').innerText}`;

  if(navigator.share){

    await navigator.share({

      text:texto

    });

  }

}

/* ========================= */
/* AUTO */
/* ========================= */

window.onload = function(){

  const campos =
    document.querySelectorAll('input, select');

  campos.forEach(campo=>{

    campo.addEventListener('input',()=>{

      calcularTudo();

    });

  });

  calcularTudo();

}
