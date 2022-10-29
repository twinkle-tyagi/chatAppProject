
async function signup() {

    try {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const obj = {
            name,
            phone,
            email,
            password
        };

        console.log(obj);

        var result = await axios.post('http://localhost:3000/user/signup', obj);
        //console.log(result);

        if(result.status == 200) {
            alert("Successfuly signed up")
        }
        else {
            alert("User already exists, Please Login");
        }
    }
    catch(err) {
        console.log(err);
    }
}

function reset() {
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}