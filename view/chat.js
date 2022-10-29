
function chat() {
    const msg = document.getElementById('chat-text').value;
    showChat(msg);
}

function showChat(msg) {
    const parent = document.getElementById('chat-ul');
    const name = localStorage.getItem("name");

    const child = document.createElement('li');

    
    child.innerHTML = name +": "+msg;

    parent.append(child);
}

window.addEventListener('DOMContentLoaded', () => {
    const parent = document.getElementById('chat-ul');
    const name = localStorage.getItem("name");

    const child = document.createElement('li');
    child.innerHTML = name + " has joined";

    parent.append(child);
})