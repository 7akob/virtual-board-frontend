const token = localStorage.getItem('authToken');
const ws = new WebSocket(`wss://pastebin-websocket.onrender.com?token=${token}`);

ws.onopen = function (event) {
    console.log('Connected to WebSocket server!');
};

ws.onmessage = function (event) {
    console.log('Recived message: ', event.data);
    const data = JSON.parse(event.data);

    if (data.status == 0) {
        document.querySelector('#out').innerHTML = data.msg;
        document.querySelector('#err').innerHTML = '';
    } else {
        document.querySelector('#err').innerHTML = data.msg;
    }
}

ws.onclose = function (event) {
    console.log('Connection closed!');
};

document.querySelector('#sendButton').addEventListener('click', () => {
    const message = document.querySelector('#messageInput').value;
    if (message) {
        ws.send(message);
        document.querySelector('#messageInput').value = '';
    }
})