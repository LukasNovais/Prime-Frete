function moeda(valor){

  return valor.toLocaleString('pt-BR',{
    style:'currency',
    currency:'BRL'
  });

}

function calcularTabela(km, valorKm, media, diesel){

  const frete = km * valorKm;

  const litros =
    media > 0 ? km / media : 0;

  const custoDiesel =
    litros * diesel;

  const percentual =
    frete > 0
      ? (custoDiesel / frete) * 100
      : 0;

  return {
    frete,
    litros,
    custoDiesel,
    percentual
  };

}

function calcularTudo(){

  const kmMotorista =
    Number(document.getElementById('kmMotorista').value);

  const valorKmMotorista =
    Number(document.getElementById('valorKmMotorista').value);

  const mediaMotorista =
    Number(document.getElementById('veiculoMotorista').value);

  const dieselMotorista =
    Number(document.getElementById('dieselMotorista').value);

  const kmCliente =
    Number(document.getElementById('kmCliente').value);

  const valorKmCliente =
    Number(document.getElementById('valorKmCliente').value);

  const mediaCliente =
    Number(document.getElementById('veiculoCliente').value);

  const dieselCliente =
    Number(document.getElementById('dieselCliente').value);

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

  document.getElementById('freteMotorista').innerText =
    moeda(motorista.frete);

  document.getElementById('custoMotorista').innerText =
    moeda(motorista.custoDiesel);

  document.getElementById('litrosMotorista').innerText =
    motorista.litros.toFixed(1) + ' L';

  document.getElementById('percentualMotorista').innerText =
    motorista.percentual.toFixed(1) + '%';

  document.getElementById('freteCliente').innerText =
    moeda(cliente.frete);

  document.getElementById('custoCliente').innerText =
    moeda(cliente.custoDiesel);

  document.getElementById('litrosCliente').innerText =
    cliente.litros.toFixed(1) + ' L';

  document.getElementById('percentualCliente').innerText =
    cliente.percentual.toFixed(1) + '%';

  const comissao =
    cliente.frete - motorista.frete;

  document.getElementById('comissaoEmpresa').innerText =
    moeda(comissao);

}

function limparCampos(){

  document.querySelectorAll('input').forEach(input=>{
    input.value='';
  });

  calcularTudo();

}

function whatsappMotorista(){

  const texto =
`🚚 FRETE MOTORISTA

KM: ${document.getElementById('kmMotorista').value}

Valor: ${document.getElementById('freteMotorista').innerText}`;

  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`,
    '_blank'
  );

}

function whatsappCliente(){

  const texto =
`💰 COTAÇÃO FRETE

KM: ${document.getElementById('kmCliente').value}

Valor: ${document.getElementById('freteCliente').innerText}`;

  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`,
    '_blank'
  );

}

window.onload = function(){

  const campos =
    document.querySelectorAll('input, select');

  campos.forEach(campo=>{

    campo.addEventListener('input',()=>{

      document.getElementById('kmCliente').value =
        document.getElementById('kmMotorista').value;

      document.getElementById('veiculoCliente').selectedIndex =
        document.getElementById('veiculoMotorista').selectedIndex;

      calcularTudo();

    });

  });

  calcularTudo();

}
