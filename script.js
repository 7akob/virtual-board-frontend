// User Options Dropdown Functionality
document.addEventListener('DOMContentLoaded', function () {


    //Connection status:
    const statusEl = document.getElementById('connectionStatus');

    function setStatus(status) {
        statusEl.textContent = status;

        statusEl.classList.remove('badge-success', 'badge-danger', 'badge-warning');

        switch (status) {
            case 'Connected':
                statusEl.classList.add('badge-success');
                break;
            case 'Disconnected':
                statusEl.classList.add('badge-danger');
                break;
            case 'Reconnecting':
                statusEl.classList.add('badge-warning');
                break;
        }
    }
    // Reconnect Button
    document.getElementById('reconnectBtn').addEventListener('click', async function () {
        const refreshToken = localStorage.getItem('refreshToken');
        const token = localStorage.getItem('authToken');

        if (!refreshToken) {
            window.location.href = 'login.html';
            return;
        }

        if (!token) {
            try {
                const response = await fetch('https://viritual-board-login.onrender.com/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: refreshToken })
                });

                if (!response.ok) throw new Error('Refresh failed');
                const data = await response.json();
                localStorage.setItem('authToken', data.accessToken);
            } catch (err) {
                console.error('Recconect failed: ', err);
                localStorage.clear();
                window.location.href = 'login.html';
                return;
            }
        }
        connectWebSocket();
    });

    // Logout Button
    document.getElementById('logoutBtn').addEventListener('click', async function () {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                await fetch('https://viritual-board-login.onrender.com/refresh', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken })
                });
            } catch (err) {
                console.error('Error during logout: ', err);
            }
        }

        localStorage.clear();
        window.location.href = 'login.html';
    });

    //web socket funktion för att kolla status
    function connectWebSocket() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setStatus('Disconnected');
            return;
        }

        const ws = new WebSocket(`wss://pastebin-websocket.onrender.com?token=${token}`);

        ws.addEventListener('open', () => {
            setStatus('Connected'); // ← ändrat från Disconnected
        });

        ws.addEventListener('close', () => {
            setStatus('Disconnected'); // ← ändrat
            setTimeout(() => {
                setStatus('Reconnecting');
                connectWebSocket(); // försök reconnect
            }, 3000);
        });

        ws.addEventListener('error', () => ws.close());
    }

    connectWebSocket();
});


