//const { default: axios } = require("axios");

//const { default: axios } = require("axios");

const groupId = localStorage.getItem('groupId');

async function searchUser() {
    try {
        const username = document.getElementById('search-user').value;
        const user = await axios.get(`http://52.199.32.164:3000/user/?user=${username}`);

        if(user == undefined || user == []) {
            alert("user not found");
        }
        else {
            const parent = document.getElementById('group-users');
            showUser(user, parent);
        }
    }
    catch(err) {
        console.log(err);
    }
}

function showUser(user, parent) {
    
    console.log(user);

    for(var i=0; i< user.data.length; i++) {
        const child = document.createElement('li');
        child.setAttribute('id', user.data[i].id);
        child.innerHTML = `${user.data[i].name} <button onclick="makeAdmin(${user.data[i].id})">Add and make admin </button> <button type="button" onclick = "addToGroup(${user.data[i].id})" > add user to group </button> <button onclick="removeUser(${user.data[i].id})"> remove from group </button><br>`
        parent.append(child);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
       
    try {
        const groupId = localStorage.getItem('groupId');
        const usersRegistered = await axios.get(`http://52.199.32.164:3000/usersRegistered/${groupId}`);
        const parent = document.getElementById('user-registered');
        
        const arr = [];
        
        for(var i =0; i<usersRegistered.data.length; i++) {

            arr.push(usersRegistered.data[i].usersignupId);

            const user = await axios.get(`http://52.199.32.164:3000/userbyid/?user=${usersRegistered.data[i].usersignupId}`);
            showUser(user, parent);
        }
        localStorage.setItem('registered-users', arr);
    }
    catch(err) {
        console.log(err);
    }
});

async function makeAdmin(id) {
    try {
        const arr = localStorage.getItem('registered-users');
        
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == id) {
                const res = await axios.put(`http://52.199.32.164:3000/makeAdmin/${id}/?groupId=${groupId}`)
            }
        }
    }
    catch(err) {
        console.log(err);
    }
}

async function addToGroup(id) {
    try {
        const arr = localStorage.getItem('registered-users');

        for(var i=0; i<arr.length; i++) {
            if(arr[i] == id) {
                alert("already added to group");
                return;
            }
        }
        const obj = {
            userId: id,
            groupId: groupId
        }
        //console.log(obj);
        const result = await axios.post('http://52.199.32.164:3000/addtogroup', obj);
        location.reload();
        //console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}

async function removeUser(id) {
    try {
        const result = axios.delete(`http://52.199.32.164:3000/deleteuser/${id}/?groupId=${groupId}`);
        location.reload()
    }
    catch(err) {
        console.log(err);
    }
}