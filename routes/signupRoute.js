const express = require('express');

const signupController = require('../controller/signup');
const chatController = require('../controller/chat');

const userAuth = require('../middleware/authenticate');

const router = express.Router();

router.get('/users', );

router.post('/signup', signupController.postUser);

router.post('/login', signupController.login);

router.post('/chat', userAuth.authenticate, chatController.postChat);

router.get('/chat', userAuth.authenticate, chatController.getChat);

router.get('/chatuser/:id', chatController.getUserName);

module.exports = router; 