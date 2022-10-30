//const { default: axios } = require("axios");


const token = localStorage.getItem('token');

async function chat() {
    try {
        const msg = document.getElementById('chat-text').value;
        const result = await axios.post('http://localhost:3000/chat', {msg: msg}, {headers: {Authorization: token}});
        console.log(result);
        
        const obj = {
            msg: msg,
            name: localStorage.getItem("name")
        }
        showChat(msg);
    }
    catch(err) {
        console.log(err);
    }
    
}

function showChat(msg) {
    const parent = document.getElementById('chat-ul');
    const name = localStorage.getItem("name");

    const child = document.createElement('li');

    
    child.innerHTML = name +": "+msg;

    parent.append(child);
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const chats = await axios.get('http://localhost:3000/chat', {headers: {Authorization: token}});
        console.log(chats);
        for(var i =0; i< chats.data.length; i++) {
            getUser(chats.data[i].usersignupId);
        }
    }
    catch(err) {
        console.log(err);
    }
});

async function getUser(id) {
    try {
        const user = await axios.get(`http://localhost:3000/chatuser/${id}`);
        console.log(user);
    }
    catch(err) {
        console.log(err);
    }
}