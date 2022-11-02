const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const chatgroup = sequelize.define('chatgroup', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

module.exports = chatgroup;