let userName = prompt("Qual é o seu nome ?");
const chat = document.querySelector("main");
let msg = "";
let num = 0;
let objName;
let data;
let backGround = "";
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
        //setInterval(tempo,1000);
        setInterval(getServerMsg,3000);
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
    
    requisicao.then(updateMsg);
    requisicao.catch(initErro);

}
/*function simpleUpdate(requisicao){
    const dataArray = requisicao.data
}*/
function updateMsg(requisicao){

    console.log ("foi server ");
    const dataArray = requisicao.data;
    chat.innerHTML = "";
    let remetente;
    let destinatario;
    let texto;
    let tipo ;
    let tempo;
    for (let index = 0; index < dataArray.length; index++) {

         remetente = dataArray[index].from;
         destinatario = dataArray[index].to;
         texto = dataArray[index].text;
         tipo = dataArray[index].type;
         tempo = dataArray[index].time;
       

        

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
    
    
    const mensagem = chat.lastElementChild;
    mensagem.scrollIntoView();
    console.log ("outra parada");
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

