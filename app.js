const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./util/database');
const User = require('./model/signup');
const Chat = require('./model/chat');
const Group = require('./model/group');
const ChatGroup = require('./model/chatgroup');

const signupRoute = require('./routes/signupRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(signupRoute);

Chat.belongsTo(User);
User.hasMany(Chat);

Chat.belongsTo(Group);
Group.hasMany(Chat);

User.belongsToMany(Group, {through: ChatGroup});
Group.belongsToMany(User, {through: ChatGroup});



sequelize.sync()
.then(res => {
    app.listen(3000);
})
.catch(err => console.log(err));
