const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const chat = sequelize.define(process.env.DB_CHAT, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: Sequelize.STRING
    }
});

module.exports = chat;