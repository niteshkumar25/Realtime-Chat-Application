const socket = io();

let textarea = document.querySelector('#textarea')
let name; 

let messageArea = document.querySelector('.message__area')
do {
   name =  prompt("Please enter your name")
} while (!name);



textarea.addEventListener('keyup', (e)=>{
    if(e.key ==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim(),

    }

    //Append
    appendMessage(msg, 'outgoing');

    textarea.value = '';
    ScrollToBottom()

    //Server 

    socket.emit('message', msg)
}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'message');

    let marup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `

    mainDiv.innerHTML = marup;

    messageArea.appendChild(mainDiv)

}



//recieve message


socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming');
    ScrollToBottom()

});



function ScrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}