const express = require('express');
const signupController = require('../controller/signup');

const router = express.Router();

router.get('/users', );

router.post('/user/signup', signupController.postUser);

module.exports = router; 