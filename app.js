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
/* CARREGAR PLANILHA */
/* ========================= */

async function carregarPlanilha(){

  try{

    const resposta =
      await fetch(urlPlanilha);

    const dados =
      await resposta.json();

    console.log(dados);

    if(dados.length > 0){

      const linha = dados[0];

      /* ========================= */
      /* TENTAR VARIOS FORMATOS */
      /* ========================= */

      const dieselMotorista =
        parseFloat(
          linha.dieselMotorista ||
          linha.DIESELMOTORISTA ||
          linha.motorista ||
          linha.MOTORISTA ||
          0
        );

      const dieselCliente =
        parseFloat(
          linha.dieselCliente ||
          linha.DIESELCLIENTE ||
          linha.cliente ||
          linha.CLIENTE ||
          0
        );

      document.getElementById('dieselMotorista').value =
        dieselMotorista;

      document.getElementById('dieselCliente').value =
        dieselCliente;

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
    Number(
      document.getElementById('kmTotal').value
    );

  const media =
    Number(
      document.getElementById('tipoVeiculo').value
    );

  const dieselMotorista =
    parseFloat(
      document.getElementById('dieselMotorista').value
    ) || 0;

  const dieselCliente =
    parseFloat(
      document.getElementById('dieselCliente').value
    ) || 0;

  const litros =
    media > 0
      ? km / media
      : 0;

  /* ========================= */
  /* MOTORISTA */
  /* ========================= */

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

  /* ========================= */
  /* CLIENTE */
  /* ========================= */

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
/* HISTÓRICO */
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
          align-items:flex-start;
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
              background:#c62828;
              color:#fff;
              border:none;
              border-radius:6px;
              width:28px;
              height:28px;
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
