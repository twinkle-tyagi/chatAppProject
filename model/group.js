const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const groups = sequelize.define(process.env.DB_GROUP, {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    groupName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //isAdmin: Sequelize.BOOLEAN
});

module.exports = groups;