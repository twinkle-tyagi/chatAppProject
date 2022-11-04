const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const chatgroup = sequelize.define(process.env.DB_CHAT_GROUP, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    isAdmin: Sequelize.BOOLEAN
});

module.exports = chatgroup;