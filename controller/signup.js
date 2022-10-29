const bcrypt = require('bcrypt');

const User = require('../model/signup');
const { use } = require('../routes/signup');

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