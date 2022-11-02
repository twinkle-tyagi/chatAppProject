const Chat = require('../model/chat');
const User = require('../model/signup');
const Groups = require('../model/group'); 
const ChatGroup = require('../model/chatgroup');

exports.getChat = async (req, res, next) => {
    try {
        const offset = +req.query.msg;
        //console.log("/////////////",offset)
        const groupId = +req.params.groupId;
        
        const chats = await Chat.findAll({where: {groupId: groupId}},{offset: offset});
        //console.log(">>>>>>>>>>>>>>>............",chats);
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

        const groupId = +req.params.groupId;
        //console.log(groupId);
        
        const result = await Chat.create({
            message: req.user.msg,
            usersignupId: req.user.id,
            groupId: groupId
        });

        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result)
        res.status(200).json(result);

    }
    catch(err) {
        console.log(err);
    }
}

exports.getAllGroups = async (req, res, next) => {
    try {
        const allGroups = await Groups.findAll();
        res.status(200).json(allGroups); 
    }
    catch(err) {
        console.log(err);
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const groups = await req.user.getGroups();
        //console.log(groups);
        res.status(200).json(groups);
    }
    catch(err) {
        console.log(err);
    }
}

exports.createGroup = async (req, res, next) => {
    try {
        const gName = req.body.gName;
        //console.log(gName);
        //console.log(req.user);
        const group = await req.user.createGroup({
            groupName: gName
        });
        res.status(200).json(group);
    }
    catch(err) {
        console.log(err);
    }
}

exports.joinGroup = async (req, res, next) => {
    try {
        const groupId = +req.params.groupId;
        //console.log("..............",groupId);
        
        const group = await req.user.getGroups({where: {id: groupId}});
        //console.log(">>>>>>>>>>>>>>>>>",group);
        if(group != undefined || group != []) {
            const chats = await Chat.findAll({where: {groupId: groupId}});
            //console.log("??????????????????????????",chats);

        }
        else {
            const user = await ChatGroup.create({
                usersignupId: req.user.id,
                groupId: groupId
            })
            //console.log("-----------------",user);
            res.status(200).json({message: "successfully joined"});
        }
    }
    catch(err) {
        console.log(err);
    }
}