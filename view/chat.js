//const { default: axios } = require("axios");

//const { IGNORE } = require("sequelize/types/index-hints");

//const { default: axios } = require("axios");

//const { default: axios } = require("axios");

const token = localStorage.getItem('token');

var chatsArray = [];
var groupChat = [];

async function chat() {
    try {
        const groupId = localStorage.getItem('groupId');
        const msg = document.getElementById('chat-text').value;
        const result = await axios.post(`http://localhost:3000/chat/${groupId}`, {msg: msg}, {headers: {Authorization: token}});
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
        //chatsArray = chatsArray.concat(store);
        chatsArray = store.concat(arr);
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

/*
setInterval(() => {
    location.reload();
}, 7000);
*/


window.addEventListener('DOMContentLoaded', () => {
    try {
        const groupId = localStorage.getItem('groupId');
        chatsArray = [];
        localStorage.removeItem('chat')
        getChats(groupId);
        const gParent = document.getElementById('group-div');
        grouping(gParent);
    }
    catch(err) {
        console.log(err);
    }
});

async function getChats(groupId) {
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

        let arr = [];
        const chats = await axios.get(`http://localhost:3000/chat/${groupId}/?msg=${lastId}`, {headers: {Authorization: token}});
        
        console.log(chats, lastId);

        if(chats.data == []) {
            arr = localStorage.getItem('chat');
            saveToLocal(arr);
        }
        else {

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
    }
    catch(err) {
        console.log(err);
    }
}

async function grouping(gParent) {
    try {
        // const 
        const groups = await axios.get('http://localhost:3000/getAllGroups');

        appendGroup(groups, gParent);
    }
    catch(err) {
        console.log(err);
    }
}

function appendGroup(groups, gParent) {
    for(var i =0; i< groups.data.length; i++) {
        //console.log(groups.data[i]);

        const gChild = document.createElement('button');
        gChild.setAttribute('id', groups.data[i].id)
        gChild.innerHTML = groups.data[i].groupName;
        gParent.append(gChild);
    }

    gParent.addEventListener('click', (e) => {
        const groupId = e.target.id;

        localStorage.setItem('groupId', groupId);

        console.log("id is", groupId);
        joinGroup(groupId);
    })
}

async function joinedGroups() {
    try {
        var groups = axios.get(`http://localhost:3000/getGroups`, {headers: {Authorization: token}});
        console.log(groups);
       
        const gParent = document.getElementById('user-group-div');
        gParent.innerHTML = "";

        localStorage.removeItem('chat');
        grouping(gParent);
        appendGroup(groups, gParent);
    }
    catch(err) {
        console.log(err);
    }
}

async function joinGroup(groupId) {
    try {
        var group = axios.get(`http://localhost:3000/joingroup/${groupId}`, {headers: {Authorization: token}});
        
        joinedGroups();
        //console.log("/////////////////////////////")
        localStorage.removeItem('chat');
        chatsArray = [];
        getChats(groupId);
    }
    catch(err) {
        console.log(err);
    }
}


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

function logout() {
    localStorage.clear();
    window.location.href = './login.html';
}


async function createGroup() {
    try {
        var gName = document.getElementById('group-name').value;
        console.log(gName);
         var obj = {
            gName: gName,
            isAdmin: true
         }
        var group = await axios.post('http://localhost:3000/creategroup', obj, {headers: {Authorization: token}});
    }
    catch(err) {
        console.log(err);
    }

}