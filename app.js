/* ========================= */
/* URL PLANILHA */
/* ========================= */

const urlPlanilha =
'https://opensheet.elk.sh/1eZH_9cMXeTlo5IJ9ybsC1l-gip-XGlaauQ2JNQy7DPA/PRIME-FRETE';

/* ========================= */
/* MOEDA */
/* ========================= */

function moeda(valor){

  return valor.toLocaleString('pt-BR',{

    style:'currency',
    currency:'BRL'

  });

}

/* ========================= */
/* CONVERTER NUMERO */
/* ========================= */

function numero(valor){

  if(!valor) return 0;

  return parseFloat(

    String(valor)
      .replace(',','.')
      .replace('R$','')
      .trim()

  ) || 0;

}

/* ========================= */
/* ARREDONDAR CENTENA */
/* SEMPRE PARA CIMA */
/* ========================= */

function arredondarCentena(valor){

  return Math.ceil(valor / 100) * 100;

}

/* ========================= */
/* CARREGAR PLANILHA */
/* ========================= */

async function carregarPlanilha(){

  try{

    const resposta =
      await fetch(urlPlanilha);

    const dados =
      await resposta.json();

    if(dados.length > 0){

      const linha = dados[0];

      const dieselMotorista =
        numero(

          linha.dieselMotorista ||
          linha.DIESELMOTORISTA ||
          linha.motorista ||
          linha.MOTORISTA

        );

      const dieselCliente =
        numero(

          linha.dieselCliente ||
          linha.DIESELCLIENTE ||
          linha.cliente ||
          linha.CLIENTE

        );

      document.getElementById('dieselMotorista').value =
        dieselMotorista.toFixed(2);

      document.getElementById('dieselCliente').value =
        dieselCliente.toFixed(2);

      calcularTudo();

    }

  }catch(erro){

    console.log(erro);

  }

}

/* ========================= */
/* CALCULAR */
/* ========================= */

function calcularTudo(){

  const km =
    numero(
      document.getElementById('kmTotal').value
    );

  const media =
    numero(
      document.getElementById('tipoVeiculo').value
    );

  const dieselMotorista =
    numero(
      document.getElementById('dieselMotorista').value
    );

  const dieselCliente =
    numero(
      document.getElementById('dieselCliente').value
    );

  const litros =
    media > 0
      ? km / media
      : 0;

  /* ========================= */
  /* MOTORISTA */
  /* ========================= */

  const custoMotorista =
    litros * dieselMotorista;

  let freteMotorista =
    custoMotorista / 0.35;

  freteMotorista =
    arredondarCentena(
      freteMotorista
    );

  const valorKmMotorista =
    km > 0
      ? freteMotorista / km
      : 0;

  /* ========================= */
  /* CLIENTE */
  /* ========================= */

  const custoCliente =
    litros * dieselCliente;

  let freteCliente =
    custoCliente / 0.33;

  freteCliente =
    arredondarCentena(
      freteCliente
    );

  const valorKmCliente =
    km > 0
      ? freteCliente / km
      : 0;

  /* ========================= */
  /* RESULTADOS */
  /* ========================= */

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

/* ========================= */
/* SALVAR */
/* ========================= */

function salvarCotacao(){

  const historico =
    JSON.parse(
      localStorage.getItem('historicoPrime')
    ) || [];

  historico.unshift({

    data:
      new Date().toLocaleString(),

    km:
      document.getElementById('kmTotal').value,

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

}

/* ========================= */
/* EXCLUIR ITEM */
/* ========================= */

function excluirHistorico(index){

  const historico =
    JSON.parse(
      localStorage.getItem('historicoPrime')
    ) || [];

  historico.splice(index,1);

  localStorage.setItem(

    'historicoPrime',

    JSON.stringify(historico)

  );

  carregarHistorico();

}

/* ========================= */
/* HISTORICO */
/* ========================= */

function carregarHistorico(){

  const lista =
    document.getElementById('historicoLista');

  lista.innerHTML = '';

  const historico =
    JSON.parse(
      localStorage.getItem('historicoPrime')
    ) || [];

  historico.forEach((item,index)=>{

    lista.innerHTML += `

      <div class="itemHistorico">

        <div style="
          display:flex;
          justify-content:space-between;
          gap:10px;
        ">

          <div>

            <strong>${item.data}</strong><br>

            KM: ${item.km}<br>

            Motorista:
            ${item.motorista}<br>

            Cliente:
            ${item.cliente}

          </div>

          <button

            onclick="excluirHistorico(${index})"

            style="
              width:28px;
              height:28px;
              border:none;
              border-radius:6px;
              background:#c62828;
              color:#fff;
              font-weight:bold;
            "

          >

            X

          </button>

        </div>

      </div>

    `;

  });

}

/* ========================= */
/* COMPARTILHAR */
/* ========================= */

function compartilharMotorista(){

  const texto =
`🚚 FRETE MOTORISTA

KM: ${document.getElementById('kmTotal').value}

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

KM: ${document.getElementById('kmTotal').value}

Valor:
${document.getElementById('freteCliente').innerText}`;

  if(navigator.share){

    navigator.share({

      text:texto

    });

  }

}

/* ========================= */
/* EVENTOS */
/* ========================= */

window.onload = function(){

  const campos =
    document.querySelectorAll('input, select');

  campos.forEach(campo=>{

    campo.addEventListener('input',()=>{

      calcularTudo();

    });

  });

  carregarHistorico();

  carregarPlanilha();

  calcularTudo();

}
