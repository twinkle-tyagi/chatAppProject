const bcrypt = require('bcrypt');

const User = require('../model/signup');

exports.postUser = async (req, res, next) => {
    try {
        // check if user exists
        const user = User.findAll({where: {email: req.body.email}});

        if(user[0]) {
            return res.status(500).json({message: "user already exists"});
        }

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
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