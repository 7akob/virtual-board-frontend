// dropdown
document.addEventListener('DOMContentLoaded', function() {

    // Reconnect Button
    document.getElementById('reconnectBtn').addEventListener('click', function() {
        window.location.reload();
    });

    // Logout Button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'login.html';
    });
});
