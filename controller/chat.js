const Chat = require('../model/chat');
const User = require('../model/signup');
const Groups = require('../model/group'); 
const ChatGroup = require('../model/chatgroup');
const  Sequelize = require('sequelize');


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

exports.usersRegistered = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const group = await ChatGroup.findAll({where: {groupId: groupId}});
        
        var user = {};

        //console.log(group);
/*
        for(var i=0; i<group.length; i++) {
            const obj = await User.findByPk(group[i].usersignupId);
            //user = JSON.stringify(user).concat(JSON.stringify(obj));
            //console.log("..................", user)

        }

        //const u1=JSON.parse(user);
        console.log("??????????????//", user);
 */
        res.status(200).json(group);
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
        console.log(req.user);
        const group = await req.user.createGroup({
            groupName: gName,
            isAdmin: req.body.isAdmin
        });

        const result = await ChatGroup.update({
            isAdmin: req.body.isAdmin
        },
        { where: Sequelize.and(
            {groupId: group.id},
            {usersignupId: req.user.id}
            )}
        );
    
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

exports.addToGroup = async (req, res) => {
    try {
        
        const userId = req.body.userId;
        const groupId = req.body.groupId;
        //console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", userId, groupId)
        
        const result = await ChatGroup.create({
            usersignupId: userId,
            groupId: groupId,
            isAdmin: false
        });
        res.status(200).json(result);
        
    }
    catch(err) {
        console.log(err);
    }
}

exports.removeGroupUser = async (req, res) => {
    try {
        const userId = +req.params.userId;
        const groupId = +req.query.groupId;
        console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,', userId, groupId);
        const res = await ChatGroup.destroy({where: Sequelize.and(
            {groupId: groupId},
            {usersignupId: userId}
            )});
            res.status(200).json({message: "deleted"});
    }
    catch(err) {
        console.log(err);
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const userId = +req.params.userId;
        const groupId = +req.query.groupId;

        const user = await ChatGroup.findAll({where: Sequelize.and(
            {groupId: groupId},
            {usersignupId: userId}
            )});

        console.log("this is user ----",user[0].usersignupId);

        if(user[0].isAdmin == false || user[0].isAdmin == null) {
            const res = await ChatGroup.update(
                {isAdmin: true},
                {where: Sequelize.and(
                    {groupId: groupId},
                    {usersignupId: user[0].usersignupId}
                    )});
        }

    }
    catch(err) {

    }
}