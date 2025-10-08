// User Options Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    // API Key Form Handler
    document.getElementById('apiKeyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const apiKey = document.getElementById('apiKey').value.trim();
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey);
            alert('API Key saved successfully!');
            document.getElementById('apiKey').value = '';
        } else {
            alert('Please enter a valid API key.');
        }
    });

    // Load saved API key on page load
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
        document.getElementById('apiKey').placeholder = 'Current: ' + savedApiKey.substring(0, 8) + '...';
    }

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
