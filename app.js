const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./util/database');
const User = require('./model/signup');
const Chat = require('./model/chat');

const signupRoute = require('./routes/signupRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(signupRoute);

Chat.belongsTo(User);
User.hasMany(Chat);

sequelize.sync()
.then(res => {
    app.listen(3000);
})
.catch(err => console.log(err));
