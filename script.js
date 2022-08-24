let userName = prompt("Qual é o seu nome ?");
const chat = document.querySelector("main");
let msg = "";
let num = 0;
let objName;

//let input = "";
let local = "Todos"
function initRoom(){
    objName = {name: `${userName}`};
    const requisicao =  axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants `,objName)

    requisicao.then(postName);
    requisicao.catch(initErro);
}
function postName(answer){
    setInterval(sendConnection,5000);
    //console.log(answer);
}
function enviou(x){
    console.log("enviou")
    
}
function sendConnection(){
    
    const requisicao =  axios.post(`https://mock-api.driven.com.br/api/v6/uol/status `,objName)
    requisicao.then(enviou);
    requisicao.catch(erroConnection);
}
function initErro(erro){
    alert("Ja existe alguém com esse nome.")
    userName = prompt("Qual é o seu nome ?");
    initRoom();
}
function sendMessage(){
   
    const  input =  document.querySelector("footer input");

    getMessage(input);
    console.log(msg);

    const objMsg = {
        from:  userName,
	    to: `Todos`,
	    text:  msg,
	    type: "message" 
        };

    const requisicao =  axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`,objMsg)

    input.placeholder = "Escreva aqui...";
    input.value = "";

    requisicao.then(msgEnviada);
    requisicao.catch(erroEnvio);
    getServerMsg();

}
function getMessage(element){
    msg= element.value;
} 
function getServerMsg(){
    const requisicao =  axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages `)
    //console.log (requisicao.data);
    requisicao.then(updateMsg);
    requisicao.catch(initErro);

}
function updateMsg(requisicao){

    const dataArray = requisicao.data
    for (let index = 0; index < dataArray.length; index++) {

        const remetente = dataArray[index].from;
        const destinatario = dataArray[index].to;
        const texto = dataArray[index].text;
        const tipo = dataArray[index].type;
        const tempo = dataArray[index].time;
        let backGround = "";

        if (tipo === "status") {
            backGround = "backGrey";
        }else if (tipo === "message"){
            backGround = "backWhite";
        }else {
            backGround = "backPink";
        }

        const msgModelo = `<div class="boxMsg  ${backGround}">
        <p> <time>(${tempo})</time><strong>${remetente}</strong> para  <strong>${destinatario}</strong>:${texto} </p>
        </div>`;

        chat.innerHTML = chat.innerHTML + msgModelo;
        

    }
    const mensagem = chat.lastChild;
    mensagem.scrollIntoView();
    
}
function msgEnviada(answer){
console.log("Foi");
}
function erroEnvio (erro){
    console.log("erro");
    //alert(erro);
}
function erroConnection(erro){
    console.log("erro na conexão!")
    console.log(erro)
}


initRoom();
getServerMsg();
setInterval(getServerMsg,3000);
