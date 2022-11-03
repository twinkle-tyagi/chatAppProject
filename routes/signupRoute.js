const express = require('express');

const signupController = require('../controller/signup');
const chatController = require('../controller/chat');

const userAuth = require('../middleware/authenticate');

const router = express.Router();

router.get('/userbyid', signupController.getUserById);

router.get('/user', signupController.getUser);

router.post('/signup', signupController.postUser);

router.post('/login', signupController.login);

router.post('/chat/:groupId', userAuth.authenticate, chatController.postChat);

router.get('/chat/:groupId', userAuth.authenticate, chatController.getChat);

router.get('/chatuser/:id', chatController.getUserName);

router.get('/getAllGroups', chatController.getAllGroups);

router.get('/usersRegistered/:groupId', chatController.usersRegistered);

router.get('/joingroup/:groupId', userAuth.authenticate, chatController.joinGroup);

router.get('/getGroups', userAuth.authenticate, chatController.getGroups);

router.post('/creategroup', userAuth.authenticate, chatController.createGroup);

router.post('/addtogroup', chatController.addToGroup);

router.delete('/deleteuser/:userId/', chatController.removeGroupUser);

router.put('/makeAdmin/:userId/', chatController.makeAdmin);


module.exports = router; 