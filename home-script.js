//relógio digital
const relogio = document.querySelector(".relogio");

function padZero(num) {
    return String(num).padStart(2, "0");
}

function mostrarHora (){
    const data = new Date();
    const hora = padZero(data.getHours());
    const minuto = padZero(data.getMinutes());
    const segundo = padZero(data.getSeconds());   
    relogio.innerHTML = hora + ":" + minuto + ":" + segundo;
}

mostrarHora();
setInterval(() => {
    mostrarHora();
}, 1000)


function pesquisar() {
    alert("Função de pesquisa chamada!");
}

function registrarNovoHorario() {
    const registroDiv = document.getElementById("registro-atual");    
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR");

    registroDiv.innerText = `Último registro: ${dataFormatada} às ${horaFormatada}`;

    console.log(`Novo registro feito: ${dataFormatada} às ${horaFormatada}`);
}

function logout() {
    console.log("Logout efetuado.");
    alert("Você foi deslogado.");
    window.location.href = "/login.html";
}