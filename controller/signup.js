const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/signup');

function generateAccessToken(id) {
    return jwt.sign({id: id}, process.env.JWT_SECRET_KEY);
}

exports.postUser = async (req, res, next) => {
    try {
        const email = req.body.email;

        // check if user exists
        const user = await User.findAll({where: {email: req.body.email}});

        if(user[0] && (user[0].email == email)) {
            return res.status(403).json({message: "user already exists"});
        }

        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if(err) {
                return res.status(400).json({message: "failed password"});
            }
            await User.create({
                name,
                phone,
                email,
                password: hash
            });
            res.status(200).json({message: "signup successful"});
        })
    }
    catch(err) {
        console.log(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findAll({where: {email: email}});
        console.log("name is",user[0].name);

        if(user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err) {
                    throw new Error("something went wrong");
                }
                if(result === true) {
                    res.status(200).json({message: "login successful", token: generateAccessToken(user[0].id)});
                }
                else {
                    return res.status(404).json({message: "password does not match"});
                }
            })
        }
        else {
            return res.status(404).json({message: "email not found"});
        }
    }
    catch(err) {
        console.log(err);
    }
}