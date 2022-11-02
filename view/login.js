
async function login(e) {
    e.preventDefault();
    try {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const obj = {
            email,
            password
        };

        //console.log(obj);

        const result = await axios.post(`http://localhost:3000/login`, obj);
        console.log(result);
        if(result.status == 200) {

            localStorage.setItem("name", result.data.name);
            localStorage.setItem('token', result.data.token);

            alert(result.data.message);
            
            localStorage.setItem('groupId', 0);
            window.location.href = "./chatWindow.html";
        }
        else {
            alert(result);
        }
    }
    catch(err) {
        console.log(err);
    }
}