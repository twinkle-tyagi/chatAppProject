const express = require('express');
const signupController = require('../controller/signup');

const router = express.Router();

router.get('/users', );

router.post('/signup', signupController.postUser);

router.post('/login', signupController.login);

module.exports = router; 