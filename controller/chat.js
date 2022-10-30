const Chat = require('../model/chat');
const User = require('../model/signup');

exports.getChat = async (req, res, next) => {
    try {
        const chats = await Chat.findAll();
        //console.log(">>>>>>>>>>>>>>>.",chats);
        res.status(200).json(chats);
    }
    catch(err) {
        console.log(err);
    }
}

exports.getUserName = async (req, res, next) => {
    try {
        const id = +req.params.id;
        //console.log("id is ",req.params);
        const user = await User.findByPk(id);
        //console.log("name is ", user.name);
        res.json(user.name);
    }
    catch(err) {
        console.log(err);
    }
}

exports.postChat = async (req, res, next) => {
    try {
        //console.log("''''''''''''''''''''''''''''''''",req.user);
        //console.log('----------', req.user.msg);
        
        const result = await Chat.create({
            message: req.user.msg,
            usersignupId: req.user.id
        });
        res.status(200).json({message: "successful"});

    }
    catch(err) {
        console.log(err);
    }
}