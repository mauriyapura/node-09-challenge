const { Sequelize } = require('sequelize');
const config = require("../../config");

//const uri = `mysql://${config.database.username}:${config.database.password}@${config.database.host}:3306/${config.database.name}`;

//const sequelize = new Sequelize(uri);

const sequelize = new Sequelize(
    config.database.name, 
    config.database.username, 
    config.database.password, {
    host: config.database.host,
    dialect: 'mysql'
    }
);


module.exports = sequelize;

