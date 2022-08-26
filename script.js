let userName = prompt("Qual é o seu nome ?");
const chat = document.querySelector("main");
let msg = "";
let num = 0;
let objName;
let data;
let t = 0 ;

//let input = "";
let local = "Todos"

function initRoom(){
    objName = {name: `${userName}`};
    const requisicao =  axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants `,objName)

    requisicao.then(postName);
    requisicao.catch(initErro);
}

function postName(answer){
console.log(answer.status)
    if(answer.status == 400){
        alert("Ja existe alguém com esse nome.")
        userName = prompt("Qual é o seu nome ?");
        initRoom();
    }else{
        setInterval(tempo,1000);
        setInterval(sendConnection,5000);
    }
        
    
    
    //console.log(answer);
}
function tempo() {
    t++
    console.log(t)
}
function sentConnection(x){
    console.log("enviou: " + x );
    
}
function sendConnection(){
    objName = {name: `${userName}`};
    const requisicao =  axios.post(`https://mock-api.driven.com.br/api/v6/uol/status `,objName)
    requisicao.then(sentConnection);
    requisicao.catch(erroConnection);
}

function erroConnection(erro){
    console.log("erro na conexão!")
    //window.location.reload();
    console.log(erro.response.status)
}
function initErro(erro){
    console.log(erro);
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
/*function simpleUpdate(requisicao){
    const dataArray = requisicao.data
}*/
function updateMsg(requisicao){


    const dataArray = requisicao.data;
    chat.innerHTML = "";
    for (let index = 0; index < dataArray.length; index++) {

        const remetente = dataArray[index].from;
        const destinatario = dataArray[index].to;
        const texto = dataArray[index].text;
        const tipo = dataArray[index].type;
        const tempo = dataArray[index].time;
        let backGround = "";

        

        if (tipo === "status") {
            backGround = "backGrey";
            const msgModelo = `<div class="boxMsg  ${backGround}">
            <p> <time>(${tempo})</time><strong>${remetente}</strong> para  <strong>${destinatario}</strong>:${texto} </p>
            </div>`;
            chat.innerHTML = chat.innerHTML + msgModelo;
            
        }else if (tipo === "message"){
            backGround = "backWhite";
            const msgModelo = `<div class="boxMsg  ${backGround}">
            <p> <time>(${tempo})</time><strong>${remetente}</strong> para  <strong>${destinatario}</strong>:${texto} </p>
            </div>`;    
            chat.innerHTML = chat.innerHTML + msgModelo;
            
        }else  if (tipo === "private_message" &&  destinatario === userName){
            backGround = "backPink";
            const msgModelo = `<div class="boxMsg  ${backGround}">
            <p> <time>(${tempo})</time><strong>${remetente}</strong>  reservadamente para  <strong>${destinatario}</strong>:${texto} </p>
            </div>`;
            chat.innerHTML = chat.innerHTML + msgModelo;
        }
        
        
        

        
        

    }
    
    
    const mensagem = chat.lastChild;
    mensagem.scrollIntoView();
    
}
function msgEnviada(answer){
    console.log("Foi");
    getServerMsg();
    
}
function erroEnvio (erro){
    console.log(erro.response);
    window.location.reload();
    
    //alert(erro);
}


document.addEventListener("keypress", function(x) {
    if(x.key === 'Enter') {
    
        const sendBtn = document.querySelector("#send");
      
        sendBtn.click();
    
    }
  });


initRoom();
getServerMsg();
setInterval(getServerMsg,3000);
