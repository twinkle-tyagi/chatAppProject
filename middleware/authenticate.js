const jwt = require('jsonwebtoken');

const User = require('../model/signup');

exports.authenticate = async (req, res, next) => {
    try {

        //console.log("////////////", req.body);
        const token = req.header('Authorization');

        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log(".....................", userData);

        const user = await User.findByPk(userData.id);
        req.user = user;
        req.user.msg = req.body.msg;
        next();
    }
    catch(err) {
        console.log(err);
    }
}