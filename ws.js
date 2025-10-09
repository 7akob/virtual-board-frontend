const token = localStorage.getItem('authToken');
const ws = new WebSocket(`wss://pastebin-websocket.onrender.com?token=${token}`);

const OutEl = document.querySelector('#out');
const errEl = document.querySelector('#err');
const inputEl = document.querySelector('#messageInput');
const sendBtn = document.querySelector('#sendButton');

ws.onopen = function (event) {
    console.log('Connected to WebSocket server!');
};

ws.onmessage = function (event) {
    console.log('Recived message: ', event.data);
    
    let data;
    try {
        data = JSON.parse(event.data);
    } catch (err) {
        console.error('Invalid JSON: ', err);
        return;
    }

    switch (data.type) {
        case 'init':
            OutEl.textContent = data.text || '';
            errEl.textContent = '';
            break;
        
        case 'update':
            OutEl.textContent = data.text || '';
            errEl.textContent = '';
            break;     
            
        case 'error':
            errEl.textContent = data.message;
            break;

        default:
            console.warn('Unknown message type: ', data.type);
    }
};

ws.onclose = function (event) {
    console.log('Connection closed!');
};

sendBtn.addEventListener('click', () => {
    const message = inputEl.value.trim();
    if(message && ws.readyState == WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'update',
            text: message
        }));
        inputEl.value = '';
    }
})