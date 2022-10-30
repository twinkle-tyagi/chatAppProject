const Chat = require('../model/chat');

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
        const id = req.params.id;
        const user = req.user.findAll({where: {usersignupId: id}});
        console.log(user);
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