const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./util/database');

const signupRoute = require('./routes/signup');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(signupRoute);


sequelize.sync()
.then(res => {
    app.listen(3000);
})
.catch(err => console.log(err));
