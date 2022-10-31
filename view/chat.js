//const { default: axios } = require("axios");

//const { Json } = require("sequelize/types/utils");


const token = localStorage.getItem('token');

var chatsArray = [];

async function chat() {
    try {
        const msg = document.getElementById('chat-text').value;
        const result = await axios.post(`http://localhost:3000/chat`, {msg: msg}, {headers: {Authorization: token}});
        console.log(result);
        const name = localStorage.getItem("name");
        
        const obj = {
            id: result.data.id,
            msg: msg,
            name: name
        }

        saveToLocal(obj);
        
        document.getElementById('chat-text').value ="";
    }
    catch(err) {
        console.log(err);
    }
}

function saveToLocal(arr) {

    console.log("instore arr", arr);
    const store = JSON.parse(localStorage.getItem('chat'));

    if(store == undefined || store.length == 0) {
        chatsArray = chatsArray.concat(arr);
        console.log("chatsarr",chatsArray)
    }
    else {
        console.log("store", store);
        
        /*
        for(var i =0; i<store.length; i++) {
            console.log("now it store", store[i]);
            chatsArray.push(store[i]);
        }
        */
        chatsArray.concat(store);
        chatsArray.concat(arr);
    }
    localStorage.setItem('chat', JSON.stringify(chatsArray));
    showChat();
}

function showChat() {

    var parent = document.getElementById('chat-ul');
    parent.innerHTML = "";
    //const name = localStorage.getItem("name");
    const child = document.createElement('li');

    const data = JSON.parse(localStorage.getItem('chat'));
    console.log(data);

    for(var i =0; i< data.length; i++) {
        var node = `${data[i].name} : ${data[i].msg}`;

        //console.log("here in show", node);
        child.innerHTML = child.innerHTML + node + "<br>";
        //parent.append(child);
    }
    //child.innerHTML = obj.name +": "+ obj.msg;

    parent.append(child);
}

window.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
    try {
        const messages = JSON.parse(localStorage.getItem('chat'));
        var lastId;
        console.log(messages);

        if(messages == undefined || messages.length == 0) {
            lastId = 0;
        }
        else {
            lastId = +messages[messages.length-1].id;
        }

        getChats(lastId);

    }
    catch(err) {
        console.log(err);
    }
}, 1000);
});

async function getChats(lastId) {
    try {
        const chats = await axios.get(`http://localhost:3000/chat/?msg=${lastId}`, {headers: {Authorization: token}});
        const arr = [];

        for(let i =0; i< chats.data.length; i++) {
            //console.log("id are", chats.data[i].usersignupId);

            const name = await getUser(chats.data[i].usersignupId);
            const msg = chats.data[i].message;
            const id = chats.data[i].id;

            const obj = {
                id: id,
                msg: msg,
                name: name
            }
            arr.push(obj);
        }
        //console.log("this is arr ", arr)
        saveToLocal(arr)
    }
    catch(err) {
        console.log(err);
    }
}


/*
window.addEventListener('DOMContentLoaded', async () => {
    
//setInterval(async () => {
    try {

        const messages = JSON.parse(localStorage.getItem('chat'));
        var lastId;
        //console.log(lastId);

        if(messages == undefined) {
            lastId = 0;
        }
        else {
            lastId = +messages[messages.length-1].id;
        }

        const chats = await axios.get(`http://localhost:3000/chat/?msg=${lastId}`, {headers: {Authorization: token}});
        //console.log(chats);

        //document.getElementById('chat-ul').innerHTML = "";
        for(let i =0; i< chats.data.length; i++) {
            //console.log("id are", chats.data[i].usersignupId);

            const name = await getUser(chats.data[i].usersignupId);
            const msg = chats.data[i].message;
            const id = chats.data[i].id;

            const obj = {
                id: id,
                msg: msg,
                name: name
            }
            //saveToLocal(obj);
            //chatsArray.push(obj);
        }
        //localStorage.setItem('chat', JSON.stringify(chatsArray));
        showChat();
    }
    catch(err) {
        console.log(err);
    }
//}, 1000);
});
*/

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