const Sequelize = require('sequelize');

const connectDB={};

let sequelize = new Sequelize('groupamania', 'root', 'MySqlMOPxA!1', {
    host: 'localhost',
    dialect:'mysql',
    logging: false,
});





connectDB.sequelize = sequelize;

module.exports =  connectDB;