//const { default: axios } = require("axios");


const token = localStorage.getItem('token');

async function chat() {
    try {
        const msg = document.getElementById('chat-text').value;
        const result = await axios.post(`http://localhost:3000/chat`, {msg: msg}, {headers: {Authorization: token}});
        //console.log(result);
        const name = localStorage.getItem("name");
        
        const obj = {
            msg: msg,
            name: name
        }
        showChat(obj);
        document.getElementById('chat-text').value ="";
    }
    catch(err) {
        console.log(err);
    }
    
}

function showChat(obj) {

    const parent = document.getElementById('chat-ul');
    //const name = localStorage.getItem("name");
    const child = document.createElement('li');

    
    child.innerHTML = obj.name +": "+ obj.msg;

    parent.append(child);
}



window.addEventListener('DOMContentLoaded', async () => {
    
setInterval(async () => {
    try {
        const chats = await axios.get(`http://localhost:3000/chat`, {headers: {Authorization: token}});
        //console.log(chats);

        document.getElementById('chat-ul').innerHTML = "";
        for(let i =0; i< chats.data.length; i++) {
            //console.log("id are", chats.data[i].usersignupId);
            const name = await getUser(chats.data[i].usersignupId);
            const msg = chats.data[i].message;

            const obj = {
                msg: msg,
                name: name
            }
            showChat(obj);
        }
    }
    catch(err) {
        console.log(err);
    }
}, 1000);
});


async function getUser(id) {
    try {
        const name = await axios.get(`http://localhost:3000/chatuser/${id}`);
        //console.log(name.data);
        return name.data;
    }
    catch(err) {
        console.log(err);
    }
}