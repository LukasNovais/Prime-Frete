function moeda(valor){

  return valor.toLocaleString('pt-BR',{
    style:'currency',
    currency:'BRL'
  });

}

function calcularTudo(){

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

  document.getElementById('kmCliente').value =
    km;

  document.getElementById('veiculoCliente').selectedIndex =
    document.getElementById('veiculoMotorista').selectedIndex;

  const litros =
    media > 0
      ? km / media
      : 0;

  /* MOTORISTA */

  const custoMotorista =
    litros * dieselMotorista;

  const freteMotorista =
    Math.floor(
      custoMotorista / 0.35
    );

  const valorKmMotorista =
    km > 0
      ? freteMotorista / km
      : 0;

  /* CLIENTE */

  const custoCliente =
    litros * dieselCliente;

  const freteCliente =
    Math.ceil(
      custoCliente / 0.33
    );

  const valorKmCliente =
    km > 0
      ? freteCliente / km
      : 0;

  /* RESULTADOS */

  document.getElementById('valorKmMotorista').value =
    valorKmMotorista.toFixed(2);

  document.getElementById('valorKmCliente').value =
    valorKmCliente.toFixed(2);

  document.getElementById('freteMotorista').innerText =
    moeda(freteMotorista);

  document.getElementById('freteCliente').innerText =
    moeda(freteCliente);

  document.getElementById('custoMotorista').innerText =
    moeda(custoMotorista);

  document.getElementById('custoCliente').innerText =
    moeda(custoCliente);

  const comissao =
    freteCliente - freteMotorista;

  document.getElementById('comissaoEmpresa').innerText =
    moeda(comissao);

}

function limparCampos(){

  document
    .querySelectorAll('input')
    .forEach(input=>{

      input.value='';

    });

  calcularTudo();

}

function salvarCotacao(){

  const historico =
    JSON.parse(
      localStorage.getItem('historicoPrime')
    ) || [];

  historico.unshift({

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

  carregarHistorico();

  limparCampos();

}

function carregarHistorico(){

  const lista =
    document.getElementById('historicoLista');

  lista.innerHTML = '';

  const historico =
    JSON.parse(
      localStorage.getItem('historicoPrime')
    ) || [];

  historico.forEach(item=>{

    lista.innerHTML += `

      <div class="itemHistorico">

        <strong>${item.data}</strong><br>

        KM: ${item.km}<br>

        Motorista:
        ${item.motorista}<br>

        Cliente:
        ${item.cliente}

      </div>

    `;

  });

}

function compartilharMotorista(){

  const texto =
`🚚 FRETE MOTORISTA

KM: ${document.getElementById('kmMotorista').value}

Valor:
${document.getElementById('freteMotorista').innerText}`;

  if(navigator.share){

    navigator.share({

      text:texto

    });

  }

}

function compartilharCliente(){

  const texto =
`💰 COTAÇÃO FRETE

KM: ${document.getElementById('kmCliente').value}

Valor:
${document.getElementById('freteCliente').innerText}`;

  if(navigator.share){

    navigator.share({

      text:texto

    });

  }

}

window.onload = function(){

  const campos =
    document.querySelectorAll('input, select');

  campos.forEach(campo=>{

    campo.addEventListener('input',()=>{

      calcularTudo();

    });

  });

  carregarHistorico();

  calcularTudo();

}
