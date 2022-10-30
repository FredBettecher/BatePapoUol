let inputName;
let from;
let to;
let text;
let type;
let time;
let lastMessage;
let messageInput = document.querySelector('.paper-plane-icon');

// função que pergunta o nome do usuário
function requestName(){
    inputName = prompt("Informe o seu nome");
    const userName = {
            name: inputName
        };
        
    const checkName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    checkName.then(checkNameSuccessful);
    checkName.catch(checkNameError);
}

// função que retorna sucesso se o nome não está cadastrado no sistema
function checkNameSuccessful(response){
    const statusName = response.status;
    console.log(statusName);
    }

// função que retorna erro se o nome já está cadastrado no sistema
function checkNameError(error){
    const statusName = error.response.status;
    console.log(statusName);
    alert("Nome já cadastrado. Por favor, insira outro nome.")
    requestName();
    }

// função que informa ao servidor que o usuário continua online
function userStatusOnline(){
    const userName = {
        name: inputName
    };

    const stillOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);

    setInterval(stillOnline, 5000);
}

// função que busca mensagens
function searchMessages(){
    let update;
    let messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    messages.then(responseMessages);

    if(update < messages[messages.lenght-1].time){
        responseMessages(messages);
    }

    update = messages[messages.lenght-1].time;
}

function responseMessages(response){
    chat = document.querySelector('.chat');
    content.innerHTML = '';
    response = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    for(let i = 0; i < response.data.lenght; i++){
        from = response[i].data.from;
		to = response[i].data.to;
		text = response[i].data.text;
		type = response[i].data.type;
		time = response[i].data.time;
    }

    if(type === 'status'){
        content.innerHTML += `<div class='status'>
        <span class = 'time'>(${time})</span> <strong>${inputName}</strong> ${text}
        </div>`
    } else if(type === 'message'){
        content.innerHTML += `<div class='chat'>
        <span class = 'time'>(${time})</span> <strong>${inputName}</strong> ${text}
        </div>`
    }

    lastMessage = document.querySelectorAll('chat').lastElementChild;
    lastMessage.scrollIntoView();
}

// função que envia as messagens
function sendMessage(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {
            from: inputName,
            to: "Todos",
            text: messageInput.value,
            type: 'message'
    });
    
    messageInput.value = '';
}

requestName();
userStatusOnline();
searchMessages();